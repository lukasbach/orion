import { Game } from './Game';
import { BagNumber, BagState, Colors, GameState, TileColor } from '../types';

export class BagSet {
  private bags: BagState[];
  public currentBag: BagNumber;
  private picked?: {
    color: TileColor;
    count: number;
  };
  private randomItem = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
  private bagPresetCounter;

  constructor(
    private game: Game,
    private initialState: GameState,
  ) {
    this.bags = initialState.bags;
    this.currentBag = initialState.currentBag;
    this.bagPresetCounter = initialState.bagPresetCounter ?? 0;
    if (initialState.bagPresets) {
      this.bags = initialState.bagPresets[0].map(tiles => ({ tiles }));
    }
  }

  public countUnpickedTiles() {
    return (this.currentBag === 'remainings' ? this.bags : [this.bags[this.currentBag]])
      .map(bag => bag.tiles.filter(tile => tile !== null))
      .reduce((a, b) => [...a, ...b], [])
      .length;
  }

  public async removeUnpickedTile() {
    if (this.currentBag === 'remainings') {
      for (const bag of this.bags) {
        for (let i = 0; i < bag.tiles.length; i++) {
          if (bag.tiles[i] !== null) {
            bag.tiles[i] = null;
            return;
          }
        }
      }
    } else {
      for (let i = 0; i < this.bags[this.currentBag].tiles.length; i++) {
        if (this.bags[this.currentBag].tiles[i] !== null) {
          this.bags[this.currentBag].tiles[i] = null;
          return;
        }
      }
    }
  }

  private getPotentialBagPicks(): Array<{ color: TileColor, count: number }> {
    if (this.currentBag === 'remainings') {
      const aggregated: BagState = {
        tiles: this.bags.reduce<Array<TileColor | null>>((aggr, bag2) => [...aggr, ...bag2.tiles], [])
      };
      return Colors
        .map(color => ({
          count: aggregated.tiles.filter(tile => tile === color).length,
          color
        }))
        .filter(pick => pick.count > 0);
    } else {
      return Colors
        .map(color => ({
          count: this.bags[this.currentBag as number].tiles.filter(tile => tile === color).length,
          color
        }))
        .filter(pick => pick.count > 0);
    }
  }

  public isColorAValidPick(color: TileColor) {
    const pick = this.getPotentialBagPicks().find(pick => pick.color === color);

    if (!pick) {
      return false;
    }

    return this.game.banks.areTilesAddable(color, pick.count);
  }

  public arePickedAddableToBank(bankId: number) {
    if (!this.picked) {
      return false;
    }
    return this.game.banks.areTilesAddableToBank(bankId, this.picked.color, this.picked.count);
  }

  public noValidPicksLeft() {
    const pickSupportedByBanks = this.getPotentialBagPicks()
      .filter(pick => this.game.banks.areTilesAddable(pick.color, pick.count))
      .length > 0;

    return !pickSupportedByBanks;
  }

  public reshuffle() {
    if (this.initialState.bagPresets) {
      this.bags = this.initialState.bagPresets[(++this.bagPresetCounter) % this.initialState.bagPresets.length].map(tiles => ({ tiles }));
    } else {
      this.bags = this.bags.map(bag => ({ tiles: bag.tiles.map(tile => this.randomItem(this.initialState.colors)) }));
    }
    this.currentBag = 0;
  }

  public takeFromBag(color: TileColor) {
    let count = 0;
    if (this.currentBag === 'remainings') {
      this.bags = this.bags
        .map(bag => ({
          tiles: bag.tiles.map(tile => {
            if (tile === color) {
              count++;
              return null;
            } else {
              return tile;
            }
          })
        }));
    } else {
      this.bags[this.currentBag].tiles = this.bags[this.currentBag].tiles
        .map(tile => {
          if (tile === color) {
            count++;
            return null;
          } else {
            return tile;
          }
        });
    }
    this.bumpBagNumber();
    this.picked = {
      count,
      color
    };
  }

  public getPickedTiles() {
    return this.picked;
  }

  public bumpBagNumber() {
    if (this.currentBag === 'remainings') {
      return;
    }
    this.currentBag = this.currentBag + 1;
    if (this.currentBag >= this.bags.length) {
      this.currentBag = 'remainings';
    }
  }

  public serialize() {
    return {
      bags: this.bags,
      currentBag: this.currentBag,
      tilesPickedFromBag: this.picked,
      bagPresetCounter: this.bagPresetCounter
    };
  }
}