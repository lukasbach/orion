import { GameStateSerializer } from './GameStateSerializer';
import { BankAction, CurrentAction, GameState, TileColor } from '../types';
import { GameBoard } from './GameBoard';
import { BankSet } from './BankSet';
import { BagSet } from './BagSet';
import { POINTS_FOR_TILE_FINALIZATION } from '../constants';

export class Game {
  public gameStateSerializer: GameStateSerializer;
  public board!: GameBoard;
  public banks!: BankSet;
  public bags!: BagSet;
  public colors!: TileColor[];
  public roundNumber!: number;
  public points!: number;
  public currentAction!: CurrentAction;
  public actioningBankId?: number;
  public movingTileSourcePosition?: [number, number];
  public end?: 'won' | 'lost';

  constructor(
    private stateHasUpdated: (state: GameState) => void,
    public initialState: GameState,
    private onPushRevertableState?: (state: GameState) => void,
  ) {
    this.gameStateSerializer = new GameStateSerializer(this);
    this.forceUpdateState(initialState);
    this.prepareNextBagPick().then(() => this.updateState()); // TODO doesnt work
    this.updateState();
    console.log("Init", this);

    (window as any).game = this;
  }

  public forceUpdateState(state: GameState) {
    this.board = new GameBoard(this, state);
    this.banks = new BankSet(this, state);
    this.bags = new BagSet(this, state);
    this.colors = state.colors;
    this.roundNumber = state.roundNumber;
    this.points = state.points;
    this.currentAction = state.currentAction;
    this.actioningBankId = state.actioningBankId;
    this.movingTileSourcePosition = state.movingTileSourcePosition;
  }

  public getSerializedState() {
    return this.gameStateSerializer.serializeState();
  }

  public async actChooseFromBag(color: TileColor) {
    this.pushRevertableState();
    this.currentAction = CurrentAction.PickingBank;
    this.bags.takeFromBag(color);
    this.updateState();
  }

  public getTutorial() {
    return this.initialState.tutorialRenderer?.(this.getSerializedState());
  }

  public async actChooseAction(bankId: number) {
    this.pushRevertableState();
    const bank = this.banks.getBank(bankId);
    this.actioningBankId = bankId;
    switch (bank.action) {
      case BankAction.Move:
        this.currentAction = CurrentAction.MovingTilePickingTile;
        break;
      case BankAction.Recolor:
        this.currentAction = CurrentAction.RecoloringPickingTile;
        break;
      case BankAction.PlaceInRow:
        this.currentAction = CurrentAction.PlacingTile;
        break;
    }
    this.updateState();
  }

  public async actChooseBank(bankId: number) {
    // this.pushRevertableState();
    const picked = this.bags.getPickedTiles();

    if (!picked) {
      throw Error('Nothing picked, cannot choose bank');
    }

    this.banks.addToBank(bankId, picked.color, picked.count);

    await this.prepareNextBagPick();
    this.updateState();
    await this.checkEnd();
  }

  private async prepareNextBagPick() {
    console.log("PREPARE NEXT BAG", this.bags.noValidPicksLeft(), this.banks.areActionsAvailable())
    if (/*this.bags.currentBag === 'remainings' && */this.bags.noValidPicksLeft()) {
      if (this.banks.areActionsAvailable()) {
        this.currentAction = CurrentAction.ChoosingBankToApply;
      } else {
        const penalty = this.bags.countUnpickedTiles();
        await this.addPoints(-penalty, undefined, () => this.bags.removeUnpickedTile());
        if (this.points < 0) {
          return;
        }
        if (this.bags.currentBag === 'remainings') {
          await this.prepareNextRound();
        } else {
          this.bags.bumpBagNumber();
          await this.prepareNextBagPick();
        }
      }
    } else {
      this.currentAction = CurrentAction.ChoosingFromBag;
    }
  }

  public canClickBoardTile(row: number, col: number, action?: CurrentAction) {
    action = action ?? this.currentAction;
    switch (action) {
      case CurrentAction.PlacingTile:
        return (
          !this.board.notEmpty(row, col) &&
          this.actioningBankId !== undefined &&
          row === this.banks.getBank(this.actioningBankId).placementRow
        );
      case CurrentAction.MovingTilePickingTile:
        return (
          this.board.notEmpty(row, col) &&
          this.board.canMove(row, col) &&
          !this.board.isFinalized(row, col)
        );
      case CurrentAction.MovingTileMoving:
        return (
          !!this.movingTileSourcePosition &&
          !this.board.notEmpty(row, col) &&
          this.board.isAdjacent([row, col], this.movingTileSourcePosition)
        );
      case CurrentAction.RecoloringPickingTile:
        return (
          this.board.notEmpty(row, col) &&
          !this.board.isFinalized(row, col)
        );
      default:
        return false;
    }
  }

  public async actClickBoardTile(row: number, col: number) {
    // this.pushRevertableState();
    switch (this.currentAction) {
      case CurrentAction.PlacingTile:
        await this.actPlaceTile(row, col);
        break;
      case CurrentAction.MovingTilePickingTile:
        await this.actStartMovingTile(row, col);
        break;
      case CurrentAction.MovingTileMoving:
        await this.actCompleteMovingTile(row, col);
        break;
      case CurrentAction.RecoloringPickingTile:
        await this.actRecolorTile(row, col);
        break;
    }
  }

  public async actPlaceTile(row: number, col: number) {
    if (this.actioningBankId === undefined) {
      throw Error('Cannot place tile, no actioning bank');
    }
    this.board.setAt(row, col, this.banks.getBank(this.actioningBankId).color);
    this.banks.resetBank(this.actioningBankId);
    await this.maybeAddPointsForTileFinalization(row, col);
    await this.afterBankAction();
    this.updateState();
    await this.checkEnd();
  }

  public async actRecolorTile(row: number, col: number) {
    if (this.actioningBankId === undefined) {
      throw Error('Cannot place tile, no actioning bank');
    }
    const bank = this.banks.getBank(this.actioningBankId);
    const tile = this.board.getAt(row, col);

    if (tile?.color === undefined) {
      throw Error(`Cannot recolor at ${row},${col}, no tile there`);
    }

    // this.board.setAt(row, col,
    //   this.initialState.colors[this.initialState.colors.indexOf(tile.color) + 1]
    //   ?? this.initialState.colors[0]);
    this.board.setAt(row, col, bank.color);
    this.banks.resetBank(this.actioningBankId);
    await this.maybeAddPointsForTileFinalization(row, col);
    await this.afterBankAction();
    this.updateState();
    await this.checkEnd();
  }

  public async actStartMovingTile(row: number, col: number) {
    if (this.actioningBankId === undefined) {
      throw Error('Cannot move tile, no actioning bank');
    }
    this.currentAction = CurrentAction.MovingTileMoving;
    this.movingTileSourcePosition = [row, col];
    this.banks.resetBank(this.actioningBankId);
    this.updateState();
  }

  public async actCompleteMovingTile(row: number, col: number) {
    if (this.movingTileSourcePosition === undefined) {
      throw Error('Cannot move tile, no source pos');
    }
    this.board.setAt(row, col, this.board.getAt(...this.movingTileSourcePosition)?.color);
    this.board.setAt(...this.movingTileSourcePosition, undefined);
    await this.maybeAddPointsForTileFinalization(row, col);
    await this.afterBankAction();
    this.updateState();
    await this.checkEnd();
  }

  private async checkEnd() {
    if (this.points < 0) {
      await this.wait();
      this.end = 'lost';
      this.currentAction = CurrentAction.Finished;
      this.updateState();
    } else if (this.board.isFinished()) {
      await this.wait();
      this.end = 'won';
      this.currentAction = CurrentAction.Finished;
      this.updateState();
    }
  }

  private async wait(time = 500) {
    const action = this.currentAction;
    this.currentAction = CurrentAction.Animation;
    this.updateState();
    await new Promise(res => setTimeout(res, time));
    this.currentAction = action;
    this.updateState();
  }

  private async maybeAddPointsForTileFinalization(row: number, col: number) {
    if (this.board.isFinalized(row, col)) {
      await this.addPoints(POINTS_FOR_TILE_FINALIZATION);
    }
  }

  private async addPoints(points: number, time?: number, forEveryPoint?: () => Promise<void>) {
    for (let i = 0; i < Math.abs(points); i++) {
      await this.wait(time);
      this.points += (points < 0 ? -1 : 1);
      await forEveryPoint?.();
      this.updateState();
      if (this.points < 0) {
        await this.checkEnd();
        return;
      }
    }
  }

  private async afterBankAction() {
    if (this.actioningBankId === undefined) {
      throw Error('Cannot clean bank action, no actioning bank');
    }
    this.actioningBankId = undefined;

    if (!this.banks.areActionsAvailable()) {
      await this.prepareNextRound();
    } else {
      this.currentAction = CurrentAction.ChoosingBankToApply;
    }
  }

  private async prepareNextRound() {
    this.bags.reshuffle();
    this.roundNumber++;
    await this.prepareNextBagPick();
    // await this.addPoints(-1);
  }

  private updateState() {
    this.stateHasUpdated(this.getSerializedState());
  }

  private pushRevertableState() {
    console.log("!!!!!!!!!!!!!!PUSH", JSON.stringify(this.getSerializedState(), null ,2))
    this.onPushRevertableState?.(this.getSerializedState());
  }
}