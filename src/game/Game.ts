import { GameStateSerializer } from './GameStateSerializer';
import { BankAction, CurrentAction, GameState, TileColor } from '../types';
import { GameBoard } from './GameBoard';
import { BankSet } from './BankSet';
import { BagSet } from './BagSet';

export class Game {
  public gameStateSerializer: GameStateSerializer;
  public board: GameBoard;
  public banks: BankSet;
  public bags: BagSet;
  public colors: TileColor[];
  public roundNumber: number;
  public points: number;
  public currentAction: CurrentAction;
  public actioningBankId?: number;
  public movingTileSourcePosition?: [number, number];

  constructor(
    private stateHasUpdated: (state: GameState) => void,
    private initialState: GameState
  ) {
    this.gameStateSerializer = new GameStateSerializer(this);
    this.board = new GameBoard(this, initialState);
    this.banks = new BankSet(this, initialState);
    this.bags = new BagSet(this, initialState);
    this.colors = initialState.colors;
    this.roundNumber = initialState.roundNumber;
    this.points = initialState.points;
    this.currentAction = initialState.currentAction;
    this.actioningBankId = initialState.actioningBankId;
    this.movingTileSourcePosition = initialState.movingTileSourcePosition;

    (window as any).game = this;
  }

  public getSerializedState() {
    return this.gameStateSerializer.serializeState();
  }

  public actChooseFromBag(color: TileColor) {
    this.currentAction = CurrentAction.PickingBank;
    this.bags.takeFromBag(color);
    this.updateState();
  }

  public actChooseAction(bankId: number) {
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

  public actChooseBank(bankId: number) {
    const picked = this.bags.getPickedTiles();

    if (!picked) {
      throw Error('Nothing picked, cannot choose bank');
    }

    this.banks.addToBank(bankId, picked.color, picked.count);

    if (this.bags.noValidPicksLeft()) {
      // TODO penalty, empty bags
      if (this.banks.areActionsAvailable()) {
        this.currentAction = CurrentAction.ChoosingBankToApply;
      } else {
        this.prepareNextRound();
      }
    } else {
      this.currentAction = CurrentAction.ChoosingFromBag;
    }
    this.updateState();
  }

  public canClickBoardTile(row: number, col: number) {
    switch (this.currentAction) {
      case CurrentAction.PlacingTile:
        return (
          !this.board.notEmpty(row, col) &&
          this.actioningBankId !== undefined
          && row === this.banks.getBank(this.actioningBankId).placementRow
        );
      case CurrentAction.MovingTilePickingTile:
        return this.board.notEmpty(row, col) && this.board.canMove(row, col);
      case CurrentAction.MovingTileMoving:
        return (
          !!this.movingTileSourcePosition &&
          !this.board.notEmpty(row, col) &&
          this.board.isAdjacent([row, col], this.movingTileSourcePosition)
        );
      case CurrentAction.RecoloringPickingTile:
        return this.board.notEmpty(row, col);
      default:
        return false;
    }
  }

  public actClickBoardTile(row: number, col: number) {
    switch (this.currentAction) {
      case CurrentAction.PlacingTile:
        this.actPlaceTile(row, col);
        break;
      case CurrentAction.MovingTilePickingTile:
        this.actStartMovingTile(row, col);
        break;
      case CurrentAction.MovingTileMoving:
        this.actCompleteMovingTile(row, col);
        break;
      case CurrentAction.RecoloringPickingTile:
        this.actRecolorTile(row, col);
        break;
    }
  }

  public actPlaceTile(row: number, col: number) {
    if (this.actioningBankId === undefined) {
      throw Error('Cannot place tile, no actioning bank');
    }
    this.board.setAt(row, col, this.banks.getBank(this.actioningBankId).color);
    this.banks.resetBank(this.actioningBankId);
    this.afterBankAction();
    this.updateState();
  }

  public actRecolorTile(row: number, col: number) {
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
    this.afterBankAction();
    this.updateState();
  }

  public actStartMovingTile(row: number, col: number) {
    if (this.actioningBankId === undefined) {
      throw Error('Cannot move tile, no actioning bank');
    }
    this.currentAction = CurrentAction.MovingTileMoving;
    this.movingTileSourcePosition = [row, col];
    this.banks.resetBank(this.actioningBankId);
    this.updateState();
  }

  public actCompleteMovingTile(row: number, col: number) {
    if (this.movingTileSourcePosition === undefined) {
      throw Error('Cannot move tile, no source pos');
    }
    this.board.setAt(row, col, this.board.getAt(...this.movingTileSourcePosition)?.color);
    this.board.setAt(...this.movingTileSourcePosition, undefined);
    this.afterBankAction();
    this.updateState();
  }

  private addPoints(points: number) {
    this.points += points;
  }

  private afterBankAction() {
    if (this.actioningBankId === undefined) {
      throw Error('Cannot clean bank action, no actioning bank');
    }
    this.actioningBankId = undefined;

    if (!this.banks.areActionsAvailable()) {
      this.prepareNextRound();
    } else {
      this.currentAction = CurrentAction.ChoosingBankToApply;
    }
  }

  private prepareNextRound() {
    this.bags.reshuffle();
    this.currentAction = CurrentAction.ChoosingFromBag;
    this.roundNumber++;
    this.addPoints(-1);
  }

  private updateState() {
    this.stateHasUpdated(this.getSerializedState());
  }
}