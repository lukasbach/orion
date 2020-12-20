import { BankAction, BankSetup, GameLevel, LevelCategory } from '../types';
import { levelHelpers } from './helpers';

const { _, X, A, B, C, D, E, F} = levelHelpers;

const bankSetup: BankSetup = {
  banks: [
    { tiles: 1, action: BankAction.Recolor },
    { tiles: 3, action: BankAction.Move },
    { tiles: 2, action: BankAction.PlaceInRow, placementRow: 2 },
    { tiles: 3, action: BankAction.Move },
    { tiles: 1, action: BankAction.Recolor },
  ]
};

const category: LevelCategory = LevelCategory.Unfinished;
const points = 10;
const colors = [0, 1, 2] as any;
const bagCount = 2;
const bagSize = 3;

export const ExperimentalLevels: GameLevel[] = [
  {
    name: 'Level 1',
    bankSetup, points, colors,
    bagCount, bagSize, category,
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
  },
];

