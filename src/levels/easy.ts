import { BankAction, BankSetup, GameLevel, LevelCategory } from '../types';
import { levelHelpers } from './helpers';

const { _, X, A, B, C, D, E, F} = levelHelpers;

const bankSetup: BankSetup = {
  banks: [
    { tiles: 1, action: BankAction.Recolor },
    { tiles: 2, action: BankAction.PlaceInRow, placementRow: 1 },
    { tiles: 3, action: BankAction.PlaceInRow, placementRow: 2 },
    { tiles: 2, action: BankAction.PlaceInRow, placementRow: 3 },
    { tiles: 1, action: BankAction.Move },
  ]
};

const bridgeBankSetup: BankSetup = {
  banks: [
    { tiles: 5, action: BankAction.Recolor },
    { tiles: 4, action: BankAction.Move },
    { tiles: 3, action: BankAction.Move },
    { tiles: 2, action: BankAction.Move },
    { tiles: 1, action: BankAction.PlaceInRow, placementRow: 4 },
  ]
};

const category: LevelCategory = LevelCategory.Easy;
const points = 10;
const colors = [0, 1, 2] as any;
const bagCount = 2;
const bagSize = 3;

export const EasyLevels: GameLevel[] = [
  {
    name: 'Level 1',
    bankSetup, points, colors,
    bagCount, bagSize, category,
    boardSetup: {
      tiles: [
        [_, C, _, _,],
        [B, _, _, B,],
        [_, A, A, _,],
        [B, _, _, B,],
        [_, C, _, _,],
      ],
      rightOffset: 1,
    },
  },
  {
    name: 'Level 2',
    bankSetup, points, colors,
    bagCount, bagSize, category,
    boardSetup: {
      tiles: [
        [C, _, A, _, _,],
        [_, A, C, _, _,],
        [_, C, _, B, _,],
        [_, _, B, A, _,],
        [_, _, A, _, C,],
      ],
      rightOffset: 0,
    },
  },
  {
    name: 'Level 3',
    bankSetup, points, colors,
    bagCount, bagSize, category,
    boardSetup: {
      tiles: [
        [_, _, _,],
        [A, B, A,],
        [B, C, B,],
        [C, A, C,],
        [_, _, _,],
      ],
      rightOffset: 1,
    },
  },
  {
    name: 'Level 4',
    bankSetup, points, colors,
    bagCount, bagSize, category,
    boardSetup: {
      tiles: [
        [_, C, _, C, _,],
        [_, A, _, A, _,],
        [A, B, C, B, A,],
        [_, A, _, A, _,],
        [_, C, _, C, _,],
      ],
      rightOffset: 1,
    },
  },
  {
    name: 'Level 5',
    bankSetup: bridgeBankSetup,
    colors: [0, 1, 2, 3],
    points, bagSize, category,
    bagCount: 3,
    boardSetup: {
      tiles: [
        [_, _, _,],
        [D, _, A,],
        [C, _, B,],
        [B, _, C,],
        [A, _, D,],
      ],
      rightOffset: 1,
    },
  },
  {
    name: 'Level 6',
    bankSetup: bridgeBankSetup,
    colors: [0, 1, 2, 3],
    points, bagSize, category,
    bagCount: 3,
    boardSetup: {
      tiles: [
        [_, D, D, _,],
        [C, _, _, _,],
        [_, C, B, _,],
        [_, _, _, B,],
        [_, A, A, _,],
      ],
      rightOffset: 0,
    },
  },
  {
    name: 'Level 7',
    bankSetup: bridgeBankSetup,
    colors: [0, 1, 2, 3],
    points, bagSize, category,
    bagCount: 3,
    boardSetup: {
      tiles: [
        [_, _, _, _,],
        [_, _, _, _,],
        [A, D, C, _,],
        [_, _, _, B,],
        [A, A, A, _,],
      ],
      rightOffset: 0,
    },
  },
];

