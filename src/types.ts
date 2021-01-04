import { Game } from './game/Game';

export type TileColor = 0 | 1 | 2 | 3 | 4 | 5;
export const Colors: TileColor[] = [0, 1, 2, 3, 4, 5];

export interface IndividualBankState {
  color?: TileColor;
  count: number;
}

export interface BankState {
  banks: IndividualBankState[];
}

export enum BankAction {
  Move = 'move',
  Recolor = 'recolor',
  PlaceInRow = 'place_in_row',
}

export interface IndividualBankSetup {
  tiles: number;
  action: BankAction;
  placementRow?: number;
}

export interface BankSetup {
  banks: IndividualBankSetup[];
}

export interface BoardTileSetup {
  requiredColor?: TileColor;
}

export interface BoardSetup {
  tiles: Array<Array<BoardTileSetup | null>>;
  rightOffset: number;
}

export interface BoardTileState {
  color?: TileColor;
}

export interface BoardState {
  tiles: Array<Array<BoardTileState | null>>;
}

export interface BagState {
  tiles: Array<TileColor | null>;
}

export enum CurrentAction {
  ChoosingFromBag,
  PickingBank,
  PlacingTile,
  MovingTilePickingTile,
  MovingTileMoving,
  RecoloringPickingTile,
  ChoosingBankToApply,
  Animation,
  Finished
}

export type BagNumber = number | 'remainings';

export type TutorialRenderData = {
  messages: string[];
  highlightBags?: number[][];
  highlightBoardTiles?: number[][];
  highlightBanks?: number[][];
  highlightBankActions?: number[];
}

export type TutorialRenderer = undefined | ((state: GameState) => TutorialRenderData | undefined);

export interface GameState {
  name?: string;
  boardSetup: BoardSetup;
  boardState: BoardState;
  bankSetup: BankSetup;
  bankState: BankState;
  bags: BagState[];
  colors: TileColor[];
  currentBag: BagNumber;
  roundNumber: number;
  points: number;
  currentAction: CurrentAction;
  tilesPickedFromBag?: { // TODO remove
    color: TileColor;
    count: number;
  };
  movingTileSourcePosition?: [number, number];
  actioningBankId?: number;
  placingTileColor?: TileColor;
  end?: 'won' | 'lost';
  bagPresets?: TileColor[][][];
  bagPresetCounter?: number;
  tutorialRenderer?: TutorialRenderer;
}

export enum LevelCategory {
  Tutorial,
  Easy,
  Medium,
  Hard,
  Unfinished,
  TooHard,
  Undoable,
  NotEntertaining,
  Uncategorized
}

export type GameLevel = Pick<GameState, 'boardSetup' | 'bankSetup' | 'points' | 'colors'> & {
  bagCount: number,
  bagSize: number,
  name: string,
  category?: LevelCategory,
  bagPresets?: TileColor[][][],
  tutorialRenderer?: TutorialRenderer,
};

export interface LevelPreview {
  bd: Array<Array<TileColor | 9>>,
  bk: Array<number>,
  nm: string,
}

//export type Mutation = (...params: any[]) => InitiatedUpdateAction;
export type InitiatedUpdateAction = (oldState: GameState) => GameState;

export interface GameStateContextValue {
  state: Readonly<GameState>,
  game: Game,
  small: boolean,
}