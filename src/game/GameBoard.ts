import { BoardSetup, BoardState, BoardTileSetup, BoardTileState, GameState, TileColor } from '../types';
import { Game } from './Game';
import { POINTS_FOR_TILE_FINALIZATION } from '../constants';

export class GameBoard {
  private setup: Array<Array<BoardTileSetup | null>>;
  private state: Array<Array<BoardTileState | null>>;

  constructor(
    private game: Game,
    private initialState: GameState
  ) {
    this.setup = initialState.boardSetup.tiles;
    this.state = initialState.boardState.tiles;
  }

  public getAt(row: number, col: number) {
    if (this.exists(row, col)) {
      return {
        requiredColor: this.setup[row][col]?.requiredColor,
        color: this.state[row][col]?.color
      };
    }
    return null;
  }

  public setAt(row: number, col: number, color: TileColor | undefined) {
    if (!this.exists(row, col)) {
      throw Error(`No tile at ${row},${col}`);
    }
    this.state[row][col]!.color = color;
  }

  public notEmpty(row: number, col: number) {
    return (this.getAt(row, col)?.color ?? undefined) !== undefined;
  }

  public isFinalized(row: number, col: number) {
    const tile = this.getAt(row, col);
    return tile !== undefined && tile !== null && tile.color === tile.requiredColor;
  }

  public canPlaceInRow(row: number) {
    return this.state[row].filter((tile, col) => !!tile && this.exists(row, col) && tile.color === undefined).length > 0;
  }

  private exists(row: number, col: number) {
    return row >= 0 && col >= 0 && !!this.setup[row]?.[col];
  }

  public canRecolor() {
    return !!this.state.map((row, rowId) =>
      row.filter((tile, colId) =>
        tile?.color !== undefined && !this.isFinalized(rowId, colId)).length > 0)
      .find(x => x);
  }

  public canMoveAnything() {
    return this.state.filter((row, rowId) =>
      row.filter((tile, colId) => this.canMove(rowId, colId)).length > 0
    ).length > 0;
  }

  public canMove(row: number, col: number) {
    return (
      this.exists(row, col) && this.state[row][col]?.color !== undefined && !this.isFinalized(row, col) && (
        (this.exists(row + 0, col - 1) && this.state[row + 0][col - 1]?.color === undefined) ||
        (this.exists(row + 0, col + 0) && this.state[row + 0][col + 0]?.color === undefined) ||
        (this.exists(row + 0, col + 1) && this.state[row + 0][col + 1]?.color === undefined) ||
        (this.exists(row - 1, col - 1) && this.state[row - 1][col - 1]?.color === undefined) ||
        (this.exists(row - 1, col + 0) && this.state[row - 1][col + 0]?.color === undefined) ||
        (this.exists(row - 1, col + 1) && this.state[row - 1][col + 1]?.color === undefined) ||
        (this.exists(row + 1, col - 1) && this.state[row + 1][col - 1]?.color === undefined) ||
        (this.exists(row + 1, col + 0) && this.state[row + 1][col + 0]?.color === undefined) ||
        (this.exists(row + 1, col + 1) && this.state[row + 1][col + 1]?.color === undefined)
      )
    );
  }

  public isAdjacent(coords1: [number, number], coords2: [number, number]) {
    return (
      Math.abs(coords1[0] - coords2[0]) <= 1 &&
      Math.abs(coords1[1] - coords2[1]) <= 1
    );
  }

  public serialize() {
    const boardSetup: BoardSetup = {
      tiles: this.setup,
      rightOffset: this.initialState.boardSetup.rightOffset,
    };

    const boardState: BoardState = {
      tiles: this.state,
    };

    return { boardSetup, boardState };
  }

  public isFinished() {
    return this.state
      .map((row, rowId) => (
        row.map((tile, colId) => (
          !this.exists(rowId, colId) || this.isFinalized(rowId, colId)
        )).reduce((a, b) => a && b, true)
      )).reduce((a, b) => a && b, true);
  }
}