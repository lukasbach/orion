import { BoardSetup, BoardTileSetup } from './types';

const _ = null;
const X: BoardTileSetup = {};
const A: BoardTileSetup = { requiredColor: 0 };
const B: BoardTileSetup = { requiredColor: 1 };
const C: BoardTileSetup = { requiredColor: 2 };
const D: BoardTileSetup = { requiredColor: 3 };
const E: BoardTileSetup = { requiredColor: 4 };
const F: BoardTileSetup = { requiredColor: 5 };

export const boardSetups: BoardSetup[] = [
  {
    tiles: [
      [_, _, _, D, _, _, _,],
      [_, _, C, A, C, _, _,],
      [_, C, B, _, B, C, _,],
      [D, A, _, _, _, A, D,],
      [_, C, B, _, B, C, _,],
      [_, _, C, A, C, _, _,],
      [_, _, _, D, _, _, _,],
    ],
    rightOffset: 0,
  }
]