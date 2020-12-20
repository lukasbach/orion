import { Game } from './Game';
import {
  BankAction,
  BankSetup,
  BankState,
  GameState,
  IndividualBankSetup,
  IndividualBankState, TileColor,
} from '../types';

export class BankSet {
  private setup: IndividualBankSetup[];
  private state: IndividualBankState[];

  constructor(
    private game: Game,
    private initialState: GameState
  ) {
    this.setup = initialState.bankSetup.banks;
    this.state = initialState.bankState.banks;
  }

  public addToBank(bankId: number, color: TileColor, count: number) {
    const state = this.state[bankId];

    if (state.color !== undefined && state.color !== color) {
      throw Error(`Unmatched color when adding to bank, ${state.color} != ${color}`);
    }

    this.state[bankId] = { color, count: state.count + count };
  }

  public resetBank(bankId: number) {
    this.state[bankId] = { color: undefined, count: 0 };
  }

  public getBank(bankId: number) {
    const setup = this.setup[bankId];
    const state = this.state[bankId];
    return {
      tiles: setup.tiles,
      action: setup.action,
      placementRow: setup.placementRow,
      color: state.color,
      count: state.count,
    };
  }

  public getBanks() {
    return this.setup.map((_, bid) => this.getBank(bid));
  }

  public isActionAvailableInBank(bankId: number) {
    const bank = this.getBank(bankId);

    if (bank.tiles === 0) {
      return false;
    }

    if (bank.count < bank.tiles) {
      return false;
    }

    switch (bank.action) {
      case BankAction.Move:
        return this.game.board.canMoveAnything();
      case BankAction.Recolor:
        return this.game.board.canRecolor();
      case BankAction.PlaceInRow:
        return this.game.board.canPlaceInRow(bank.placementRow!);
    }

    return true;
  }

  public areActionsAvailable() {
    return this.getBanks()
      .filter((bank, bankId) => {
        return this.isActionAvailableInBank(bankId);
      })
      .length > 0;
  }

  public areTilesAddableToBank(bankId: number, color: TileColor, count: number) {
    const bank = this.getBank(bankId);
    return !!bank && (bank.color === color || bank.color === undefined) && bank.tiles - bank.count >= count;
  }

  public areTilesAddable(color: TileColor, count: number) {
    return this.getBanks()
      .filter(bank => (bank.color === color || bank.color === undefined) && bank.tiles - bank.count >= count)
      .length > 0;
  }

  public serialize() {
    const bankSetup: BankSetup = {
      banks: this.setup
    };

    const bankState: BankState = {
      banks: this.state,
    };

    return { bankSetup, bankState };
  }
}