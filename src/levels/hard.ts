import { BankAction, BankSetup, GameLevel, LevelCategory, TileColor } from '../types';
import { levelHelpers } from './helpers';

const { _, X, A, B, C, D, E, F} = levelHelpers;

const bankSetup: BankSetup = {
  banks: [
    { tiles: 5, action: BankAction.PlaceInRow, placementRow: 1 },
    { tiles: 4, action: BankAction.Move },
    { tiles: 3, action: BankAction.Recolor },
    { tiles: 4, action: BankAction.Move },
    { tiles: 5, action: BankAction.PlaceInRow, placementRow: 5 },
  ]
};

const category: LevelCategory = LevelCategory.Hard;
const points = 30;
const colors: TileColor[] = [0, 1, 2, 3];
const bagCount = 3;
const bagSize = 4;

export const HardLevels: GameLevel[] = [
  {
    name: 'Pegasus',
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
    category, points, colors,
    bagCount, bagSize,
  },
  {
    name: 'Triangulum',
    boardSetup: {
      tiles: [
        [_, _, A, _, _, _,],
        [A, _, _, B, _, _,],
        [_, B, _, _, C, _,],
        [_, C, A, C, _, _,],
        [C, _, _, B, _, _,],
        [_, B, _, _, A, _,],
        [_, _, A, _, _, _,],
      ],
      rightOffset: 1,
    },
    bankSetup,
    category, points, colors,
    bagCount, bagSize,
  },
  {
    name: 'Serpens',
    boardSetup: {
      tiles: [
        [_, A, _, B, _, C, _, _,],
        [_, _, A, _, B, _, C, _,],
        [_, B, _, A, _, B, _, C,],
        [_, _, B, _, A, _, B, _,],
        [_, C, _, B, _, A, _, B,],
        [_, _, C, _, B, _, A, _,],
        [_, _, _, C, _, B, _, A,],
      ],
      rightOffset: 1,
    },
    bankSetup,
    category, points, colors,
    bagCount, bagSize,
  },
  {
    name: 'Corvus',
    boardSetup: {
      tiles: [
        [_, C, _, _, _, B, _,],
        [B, _, D, _, A, _, C,],
        [A, _, A, _, D, _, D,],
        [D, _, B, _, C, _, A,],
        [C, _, C, _, B, _, B,],
        [B, _, D, _, A, _, C,],
        [A, _, _, _, _, _, D,],
      ],
      rightOffset: 1,
    },
    bankSetup: {
      banks: [
        { tiles: 5, action: BankAction.Recolor },
        { tiles: 4, action: BankAction.Move },
        { tiles: 3, action: BankAction.Move },
        { tiles: 2, action: BankAction.Move },
        { tiles: 3, action: BankAction.Move },
        { tiles: 4, action: BankAction.Move },
        { tiles: 5, action: BankAction.PlaceInRow, placementRow: 6 },
      ]
    },
    category, points, colors,
    bagCount, bagSize,
  },
  {
    name: 'Cetus',
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
        { tiles: 5, action: BankAction.PlaceInRow, placementRow: 0 },
        { tiles: 4, action: BankAction.Move },
        { tiles: 3, action: BankAction.Recolor },
        { tiles: 4, action: BankAction.Move },
        { tiles: 5, action: BankAction.PlaceInRow, placementRow: 4 },
      ]
    },
    category, points, colors,
    bagCount, bagSize,
  },
  {
    name: 'Crux',
    boardSetup: {
      tiles: [
        [_, _, C, D, C, _, _,],
        [_, _, _, C, _, _, _,],
        [C, _, _, B, _, _, C,],
        [D, C, B, B, B, C, D,],
        [C, _, _, B, _, _, C,],
        [_, _, _, A, _, _, _,],
        [_, _, A, D, A, _, _,],
      ],
      rightOffset: 1,
    },
    bankSetup: {
      banks: [
        { tiles: 5, action: BankAction.Move },
        { tiles: 4, action: BankAction.Move },
        { tiles: 3, action: BankAction.Move },
        { tiles: 2, action: BankAction.Move },
        { tiles: 3, action: BankAction.Move },
        { tiles: 4, action: BankAction.Move },
        { tiles: 5, action: BankAction.PlaceInRow, placementRow: 6 },
      ]
    },
    category, points, colors,
    bagCount, bagSize,
  },
  {
    name: 'Delphinus',
    boardSetup: {
      tiles: [
        [_, _, _, A, _, _, _,],
        [_, _, B, A, B, _, _,],
        [_, C, _, A, _, C, _,],
        [D, _, _, A, _, _, D,],
        [_, C, _, A, _, C, _,],
        [_, _, B, A, B, _, _,],
        [_, _, _, A, _, _, _,],
      ],
      rightOffset: -1,
    },
    bankSetup,
    category, points, colors,
    bagCount, bagSize,
  },
  {
    name: 'Aquarius',
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
    bankSetup,
    category, points, colors,
    bagCount, bagSize,
  },
  {
    name: 'Orion',
    boardSetup: {
      tiles: [
        [A, B, C, D, C, B, A,],
        [B, C, D, C, B, A, B,],
        [C, D, C, B, A, B, C,],
        [D, C, B, A, B, C, D,],
        [C, B, A, B, C, D, C,],
        [B, A, B, C, D, C, B,],
        [A, B, C, D, C, B, A,],
      ],
      rightOffset: 1,
    },
    bankSetup,
    category, points, colors,
    bagCount, bagSize,
  },
];

