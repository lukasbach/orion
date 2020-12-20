import { BankAction, BoardTileSetup, GameLevel, LevelCategory } from './types';
import { TutorialLevels } from './levels/tutorial';
import { EasyLevels } from './levels/easy';
import { MediumLevels } from './levels/medium';
import { HardLevels } from './levels/hard';
import { ExperimentalLevels } from './levels/experiments';

const _ = null;
const X: BoardTileSetup = {};
const A: BoardTileSetup = { requiredColor: 0 };
const B: BoardTileSetup = { requiredColor: 1 };
const C: BoardTileSetup = { requiredColor: 2 };
const D: BoardTileSetup = { requiredColor: 3 };
const E: BoardTileSetup = { requiredColor: 4 };
const F: BoardTileSetup = { requiredColor: 5 };

export const Levels: GameLevel[] = [
  ...TutorialLevels,
  ...EasyLevels,
  ...MediumLevels,
  ...HardLevels,
  ...ExperimentalLevels,
  /*
  {
    name: 'Level 1',
    category: LevelCategory.Medium,
    boardSetup: {
      tiles: [
        [C, _, C, _,],
        [_, B, _, _,],
        [A, A, A, A,],
        [_, B, _, _,],
        [C, _, C, _,],
      ],
      rightOffset: 0,
    },
    bankSetup: {
      banks: [
        { tiles: 1, action: BankAction.Recolor },
        { tiles: 3, action: BankAction.Move },
        { tiles: 2, action: BankAction.PlaceInRow, placementRow: 2 },
        { tiles: 3, action: BankAction.Move },
        { tiles: 1, action: BankAction.Recolor },
      ]
    },
    points: 10,
    colors: [0, 1, 2],
    bagCount: 2,
    bagSize: 3,
  },
  {
    name: 'Level 2',
    category: LevelCategory.Medium,
    boardSetup: {
      tiles: [
        [C, _, C, _,],
        [_, B, _, _,],
        [A, A, A, A,],
        [_, B, _, _,],
        [C, _, C, _,],
      ],
      rightOffset: 1,
    },
    bankSetup: {
      banks: [
        { tiles: 3, action: BankAction.Move },
        { tiles: 2, action: BankAction.PlaceInRow, placementRow: 2 },
        { tiles: 3, action: BankAction.Move },
      ]
    },
    points: 10,
    colors: [0, 1, 2],
    bagCount: 2,
    bagSize: 3,
  },
  {
    name: 'Level 3',
    category: LevelCategory.Medium,
    boardSetup: {
      tiles: [
        [A, A, _, C, _, _,],
        [_, D, D, C, B, _,],
        [_, _, _, _, B, A,],
        [_, D, D, C, B, _,],
        [A, A, _, C, _, _,],
      ],
      rightOffset: -1,
    },
    bankSetup: {
      banks: [
        { tiles: 5, action: BankAction.Move },
        { tiles: 4, action: BankAction.PlaceInRow, placementRow: 1 },
        { tiles: 3, action: BankAction.Recolor, placementRow: 2 },
        { tiles: 4, action: BankAction.PlaceInRow, placementRow: 3 },
        { tiles: 5, action: BankAction.Move },
      ]
    },
    points: 10,
    colors: [0, 1, 2, 3],
    bagCount: 4,
    bagSize: 4,
  },
  {
    name: 'Level 4',
    category: LevelCategory.Medium,
    boardSetup: {
      tiles: [
        [_, _, _, D, _, _, _,],
        [_, _, C, A, C, _, _,],
        [_, C, B, _, B, C, _,],
        [D, A, _, _, _, A, D,],
        [_, C, B, _, B, C, _,],
        [_, _, C, A, C, _, _,],
        [_, _, _, D, _, _, _,],
      ],
      rightOffset: -1,
    },
    bankSetup: {
      banks: [
        { tiles: 5, action: BankAction.Move },
        { tiles: 4, action: BankAction.PlaceInRow, placementRow: 2 },
        { tiles: 3, action: BankAction.Recolor },
        { tiles: 4, action: BankAction.PlaceInRow, placementRow: 4 },
        { tiles: 5, action: BankAction.Move },
      ]
    },
    points: 10,
    colors: [0, 1, 2, 3],
    bagCount: 4,
    bagSize: 4,
  },
  {
    name: 'Level 5',
    category: LevelCategory.Medium,
    boardSetup: {
      tiles: [
        [A, B, C, D,],
        [B, C, D, A,],
        [C, D, A, B,],
        [D, A, B, C,],
      ],
      rightOffset: 1,
    },
    bankSetup: {
      banks: [
        { tiles: 2, action: BankAction.Recolor },
        { tiles: 4, action: BankAction.PlaceInRow, placementRow: 0 },
        { tiles: 3, action: BankAction.Move },
        { tiles: 3, action: BankAction.Move },
        { tiles: 4, action: BankAction.PlaceInRow, placementRow: 3 },
        { tiles: 2, action: BankAction.Recolor },
      ]
    },
    points: 10,
    colors: [0, 1, 2, 3],
    bagCount: 4,
    bagSize: 4,
  },
  {
    name: 'Diag',
    category: LevelCategory.Medium,
    boardSetup: {
      tiles: [
        [A, B, C, D,],
        [B, C, D, _,],
        [C, D, _, _,],
        [D, _, _, _,],
      ],
      rightOffset: -3,
    },
    bankSetup: {
      banks: [
        { tiles: 0, action: BankAction.Recolor, },
        { tiles: 1, action: BankAction.PlaceInRow, placementRow: 0 },
        { tiles: 2, action: BankAction.PlaceInRow, placementRow: 1 },
        { tiles: 3, action: BankAction.PlaceInRow, placementRow: 2 },
        { tiles: 4, action: BankAction.PlaceInRow, placementRow: 3 },
        { tiles: 5, action: BankAction.Recolor, },
      ]
    },
    points: 10,
    colors: [0, 1, 2, 3],
    bagCount: 3,
    bagSize: 3,
  },
  */
];
