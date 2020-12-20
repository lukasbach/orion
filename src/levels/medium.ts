import { BankAction, BankSetup, GameLevel, LevelCategory } from '../types';
import { levelHelpers } from './helpers';

const { _, X, A, B, C, D, E, F} = levelHelpers;

const bankSetup: BankSetup = {
  banks: [
    { tiles: 3, action: BankAction.PlaceInRow, placementRow: 0 },
    { tiles: 2, action: BankAction.Move },
    { tiles: 1, action: BankAction.Recolor },
    { tiles: 2, action: BankAction.Move },
    { tiles: 3, action: BankAction.PlaceInRow, placementRow: 4 },
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

const category: LevelCategory = LevelCategory.Medium;
const points = 10;
const colors = [0, 1, 2] as any;
const bagCount = 3;
const bagSize = 3;

export const MediumLevels: GameLevel[] = [
  {
    name: 'Level 1',
    bankSetup: bridgeBankSetup, points, colors,
    bagCount, bagSize, category,
    boardSetup: {
      tiles: [
        [_, B, C, D,],
        [A, _, _, _,],
        [_, D, C, _,],
        [_, _, _, B,],
        [A, A, A, _,],
      ],
      rightOffset: 1,
    },
  },
  {
    name: 'Level 2',
    category,
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
    name: 'Diag',
    category,
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
  {
    name: 'Level 15',
    boardSetup: {
      tiles: [
        [_, A, A, A, _,],
        [_, C, _, C, _,],
        [B, B, _, B, B,],
        [_, C, _, C, _,],
        [_, A, A, A, _,],
      ],
      rightOffset: 0,
    },
    bankSetup,
    category, points, colors,
    bagCount, bagSize,
  },
  {
    name: 'Level 16',
    boardSetup: {
      tiles: [
        [_, B, B, B, _,],
        [_, _, _, C, C,],
        [_, _, _, _, _,],
        [D, D, _, _, _,],
        [_, A, A, A, _,],
      ],
      rightOffset: 1,
    },
    bankSetup,
    category, points, colors: [0, 1, 2, 3],
    bagCount, bagSize,
  },
  {
    name: 'Level 17',
    boardSetup: {
      tiles: [
        [_, _, A, A, A,],
        [C, _, _, _, B,],
        [C, _, _, _, C,],
        [B, _, _, _, C,],
        [A, A, A, _, _,],
      ],
      rightOffset: 1,
    },
    bankSetup,
    category, points, colors,
    bagCount, bagSize,
  },
  {
    name: 'Level 18',
    boardSetup: {
      tiles: [
        [_, _, A, A, A,],
        [B, _, _, _, B,],
        [A, _, _, _, A,],
        [B, _, _, _, B,],
        [A, A, A, _, _,],
      ],
      rightOffset: 1,
    },
    bankSetup,
    category, points, colors,
    bagCount, bagSize,
  },
  {
    name: 'Level 18',
    boardSetup: {
      tiles: [
        [_, B, _, _, _,],
        [A, _, C, _, _,],
        [C, _, _, A, _,],
        [B, _, _, _, B,],
        [A, A, A, _, _,],
      ],
      rightOffset: -2,
    },
    bankSetup: bridgeBankSetup,
    category, points, colors,
    bagCount, bagSize,
  },
];

