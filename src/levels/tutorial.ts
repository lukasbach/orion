import { BankAction, BankSetup, CurrentAction, GameLevel, LevelCategory } from '../types';
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

const category: LevelCategory = LevelCategory.Tutorial;
const points = 10;
const colors = [0, 1, 2] as any;
const bagCount = 2;
const bagSize = 2;

export const TutorialLevels: GameLevel[] = [
  {
    name: 'Tutorial 1',
    points, bagCount, bagSize, category,
    colors: [0, 1],
    bankSetup: {
      banks: [
        { tiles: 2, action: BankAction.PlaceInRow, placementRow: 0 },
        { tiles: 2, action: BankAction.PlaceInRow, placementRow: 1 },
      ]
    },
    boardSetup: {
      tiles: [
        [A, _,],
        [_, B,],
      ],
      rightOffset: 0,
    },
    bagPresets: [
      [[0, 1], [0, 1]],
      [[1, 1], [0, 0]],
    ],
    tutorialRenderer: state => {
      if (state.roundNumber === 0) {
        if (state.currentBag === 0 && state.currentAction === CurrentAction.ChoosingFromBag) {
          return [
            'The goal of the game is to fill up the board above with tiles corresponding to the field colors. Fill ' +
            'a "Place a tile"-bank to the top right ' +
            'with one color to place a tile of the same color in the corresponding row.',
            'You start by picking a color from the first bag below. Start by picking the green tile.',
            'All tiles with the same color within the current will be picked at once and have to be deposited in one ' +
            'bank at a time.'
          ];
        } else if (state.currentBag === 1 && state.currentAction === CurrentAction.PickingBank) {
          return [
            'Place the tile in the first bank (top right) by clicking on one free space in the bank.'
          ];
        } else if (state.currentBag === 1 && state.currentAction === CurrentAction.ChoosingFromBag) {
          return [
            'Now you choose a color from the second bag. Again pick the green tile.'
          ];
        } else if (state.currentBag === 'remainings' && state.currentAction === CurrentAction.PickingBank) {
          return [
            'You can now fill the bank completely.'
          ];
        } else if (state.currentBag === 'remainings' && state.currentAction === CurrentAction.ChoosingFromBag) {
          return [
            'After you\'ve picked from every bag, you must pick the remaining tiles. Now, you pick from all bags ' +
            'at once, so in future levels you should make sure that you can fit in the remaining tiles.',
            'If you cannot fit in all remaining colors, the game doesn\'t end, but you will loose one point for every ' +
            'tile that did not fit into any bank. If your point count goes below zero, you loose.',
            'Choose the remaining red tiles to continue.'
          ]
        } else if (state.currentAction === CurrentAction.ChoosingBankToApply) {
          return [
            'You can now apply the banks. You get two points for every tile placed on its final color, but none' +
            ' for tiles placed on incorrect colors.'
          ]
        } else if (state.currentAction === CurrentAction.PlacingTile) {
          return [
            'You can only place the tile in the row of the chosen bank. Place the tile on the board now.'
          ]
        }
      }
      if (state.currentAction === CurrentAction.Animation) {
        return ['Great Job!'];
      }
      return ['You can revert to an earlier game state by clicking on "revert" to the top right, or restart' +
      ' the level via the game\'s menu.'];
    }
  },
  {
    name: 'Tutorial 2',
    points, bagCount, bagSize, category,
    colors: [0, 1],
    bankSetup: {
      banks: [
        { tiles: 2, action: BankAction.PlaceInRow, placementRow: 0 },
        { tiles: 2, action: BankAction.Move },
      ]
    },
    boardSetup: {
      tiles: [
        [A, _,],
        [_, B,],
      ],
      rightOffset: 0,
    },
    bagPresets: [
      [[1, 1], [1, 1]],
      [[0, 1], [1, 0]],
    ],
    tutorialRenderer: state => {
      if (state.roundNumber === 0 && (state.currentAction === CurrentAction.ChoosingBankToApply || state.currentAction === CurrentAction.PlacingTile)) {
        return [
          'You\'ll see that placing a tile on an incorrect color yields no points. You still get the full 2 points for ' +
          'moving it to its final destination.',
          'After it reached a field with a matching color, it can no longer be moved.',
          'After you placed a tile in the upper row, move it by clicking on "move tile" in the second bank, clicking the tile' +
          ' you want to move and then clicking on the field you want it to move to.'
        ];
      }
      if (state.roundNumber === 0 && (state.currentAction === CurrentAction.ChoosingFromBag || state.currentAction === CurrentAction.PickingBank)) {
        return [
          'This time, only the upper bank can place tiles. This means you cannot directly place any tiles on the' +
          'second row.',
          'However, if you fill the second bank, you can move any tile that is not on its final color.',
          'Start by placing a red tile in the first row, then moving it downwards.'
        ];
      }
      return [
        'Continue by completing the level.'
      ];
    }
  },
  {
    name: 'Tutorial 3',
    points, bagCount, bagSize, category,
    colors: [0, 1],
    bankSetup: {
      banks: [
        { tiles: 2, action: BankAction.Recolor },
        { tiles: 2, action: BankAction.PlaceInRow, placementRow: 0 },
        { tiles: 2, action: BankAction.Recolor },
      ]
    },
    boardSetup: {
      tiles: [
        [A, B, A, B],
      ],
      rightOffset: 0,
    },
    bagPresets: [
      [[0, 1], [1, 1]],
      [[1, 1], [1, 0]],
      [[0, 0], [0, 0]],
      [[1, 0], [1, 1]],
    ],
    tutorialRenderer: state => {
      return [
        'This time, you have to recoloring-banks. Fill them up, and you can recolor a tile that is not on its final' +
        ' field to the color that you\'ve filled up the bank with.',
        'Again, you\'ll get the full two points after recoloring a tile to its final color.',
        'Continue by completing the level.'
      ];
    }
  },
  {
    name: 'Tutorial 4',
    points, bagCount, bagSize, category,
    colors: [0, 1, 2],
    bankSetup: {
      banks: [
        { tiles: 2, action: BankAction.PlaceInRow, placementRow: 0 },
        { tiles: 2, action: BankAction.Move },
        { tiles: 2, action: BankAction.Move },
        { tiles: 2, action: BankAction.Recolor },
      ]
    },
    boardSetup: {
      tiles: [
        [A, A, A, A,],
        [_, B, _, _,],
        [_, _, C, _,],
        [_, _, _, A,],
      ],
      rightOffset: 0,
    },
    tutorialRenderer: state => {
      return [
        'Let\'s see how well you can apply what you\'ve learned. Good luck!'
      ];
    }
  },
];

