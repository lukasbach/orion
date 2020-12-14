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
  tiles: [TileColor | null, TileColor | null, TileColor | null, TileColor | null];
}

export enum CurrentAction {
  ChoosingFromBag,
  PickingBank,
  PlacingTile,
  MovingTilePickingTile,
  MovingTileMoving,
  RecoloringPickingTile,
  ChoosingBankToApply,
}

export interface GameState {
  boardSetup: BoardSetup;
  boardState: BoardState;
  bankSetup: BankSetup;
  bankState: BankState;
  bags: [BagState, BagState, BagState];
  colors: TileColor[];
  currentBag: number | 'remainings';
  roundNumber: number;
  points: number;
  currentAction: CurrentAction;
  tilesPickedFromBag?: {
    color: TileColor;
    count: number;
  };
  movingTileSourcePosition?: [number, number];
  actioningBankId?: number;
  placingTileColor?: TileColor;
}

//export type Mutation = (...params: any[]) => InitiatedUpdateAction;
export type InitiatedUpdateAction = (oldState: GameState) => GameState;

export interface GameStateContextValue {
  state: Readonly<GameState>,
  updateState: (changed: Partial<GameState>) => void,
  perform: (action: InitiatedUpdateAction) => void,
}