import { BoardSetup, BoardState, BoardTileSetup, BoardTileState, GameState, TileColor } from '../types';
import { Game } from './Game';

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
    if (this.setup[row][col]) {
      return {
        requiredColor: this.setup[row][col]?.requiredColor,
        color: this.state[row][col]?.color
      };
    }
    return null;
  }

  public setAt(row: number, col: number, color: TileColor | undefined) {
    if (this.setup[row][col] === undefined) {
      throw Error(`No tile at ${row},${col}`);
    }
    this.state[row][col]!.color = color;
  }

  public notEmpty(row: number, col: number) {
    return (this.getAt(row, col)?.color ?? undefined) !== undefined;
  }

  public canPlaceInRow(row: number) {
    return this.state[row].filter(tile => tile?.color === undefined).length > 0;
  }

  public canRecolorInRow(row: number) {
    return this.state[row].filter(tile => tile?.color !== undefined).length > 0;
  }

  public canMoveInRow(row: number) {
    return this.state[row].filter((tile, col) => this.canMove(row, col)).length > 0;
  }

  public canMove(row: number, col: number) {
    return (
      this.state[row][col]?.color !== undefined && (
        this.state[row][col - 1]?.color === undefined ||
        this.state[row][col + 1]?.color === undefined ||
        this.state[row - 1][col - 1]?.color === undefined ||
        this.state[row - 1][col + 1]?.color === undefined ||
        this.state[row + 1][col - 1]?.color === undefined ||
        this.state[row + 1][col + 1]?.color === undefined
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
}