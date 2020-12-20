import React from 'react';
import { Meta } from '@storybook/react';
import { GameContainer } from '../../components/GameContainer';
import { BoardContainer } from '../../components/BoardContainer';
import { BankAction, CurrentAction } from '../../types';
import { levelHelpers } from '../../levels/helpers';

export default {
  title: 'Game/Test states',
} as Meta;

const { _, X, A, B, C, D, E, F} = levelHelpers;

export const CannotMoveTile: React.FC = () => (
  <GameContainer initialState={{
    points: 10, colors: [0, 1, 2], bags: [],
    currentBag: 0, roundNumber: 0,
    currentAction: CurrentAction.ChoosingBankToApply,
    boardSetup: {
      tiles: [
        [C, C, C,],
        [B, B, B,],
        [A, A, A,],
      ], rightOffset: 0,
    },
    bankSetup: {
      banks: [
        { tiles: 2, action: BankAction.Recolor },
        { tiles: 2, action: BankAction.Move },
        { tiles: 2, action: BankAction.PlaceInRow, placementRow: 2 },
      ]
    },
    boardState: {
      tiles: [
        [{color: 2}, {color: 1}, {color: 2}, ],
        [{color: 1}, {color: 1}, {color: 1}, ],
        [{color: 0}, {color: 0}, {color: 0}, ],
      ]
    },
    bankState: {
      banks: [
        { count: 2, color: 0 },
        { count: 2, color: 0 },
        { count: 2, color: 0 },
      ]
    },
  }}>
    <BoardContainer />
  </GameContainer>
);

export const CanMoveTile: React.FC = () => (
  <GameContainer initialState={{
    points: 10, colors: [0, 1, 2], bags: [],
    currentBag: 0, roundNumber: 0,
    currentAction: CurrentAction.ChoosingBankToApply,
    boardSetup: {
      tiles: [
        [C, C, C,],
        [B, B, B,],
        [A, A, A,],
      ], rightOffset: 0,
    },
    bankSetup: {
      banks: [
        { tiles: 2, action: BankAction.Recolor },
        { tiles: 2, action: BankAction.Move },
        { tiles: 2, action: BankAction.PlaceInRow, placementRow: 2 },
      ]
    },
    boardState: {
      tiles: [
        [{color: 2}, {color: 1}, {}, ],
        [{color: 1}, {color: 1}, {color: 1}, ],
        [{color: 0}, {color: 0}, {color: 0}, ],
      ]
    },
    bankState: {
      banks: [
        { count: 2, color: 0 },
        { count: 2, color: 0 },
        { count: 2, color: 0 },
      ]
    },
  }}>
    <BoardContainer />
  </GameContainer>
);

export const CannotMoveOrRecolorFinalizedTile: React.FC = () => (
  <GameContainer initialState={{
    points: 10, colors: [0, 1, 2], bags: [],
    currentBag: 0, roundNumber: 0,
    currentAction: CurrentAction.ChoosingBankToApply,
    boardSetup: {
      tiles: [
        [C, C, C,],
        [B, B, B,],
        [A, A, A,],
      ], rightOffset: 0,
    },
    bankSetup: {
      banks: [
        { tiles: 2, action: BankAction.Recolor },
        { tiles: 2, action: BankAction.Move },
        { tiles: 2, action: BankAction.PlaceInRow, placementRow: 2 },
      ]
    },
    boardState: {
      tiles: [
        [{}, {}, {}, ],
        [{}, {color: 1}, {}, ],
        [{}, {}, {}, ],
      ]
    },
    bankState: {
      banks: [
        { count: 2, color: 0 },
        { count: 2, color: 0 },
        { count: 2, color: 0 },
      ]
    },
  }}>
    <BoardContainer />
  </GameContainer>
);

export const CannotUseSecondBag: React.FC = () => (
  <GameContainer initialState={{
    points: 10, colors: [0, 1, 2],
    currentBag: 0, roundNumber: 0,
    currentAction: CurrentAction.ChoosingFromBag,
    bags: [
      { tiles: [0, 1] },
      { tiles: [0, 0] },
      { tiles: [0, 1] },
    ],
    boardSetup: {
      tiles: [
        [C, C, C,],
        [B, B, B,],
        [A, A, A,],
      ], rightOffset: 0,
    },
    bankSetup: {
      banks: [
        { tiles: 2, action: BankAction.Recolor },
        { tiles: 2, action: BankAction.Move },
        { tiles: 2, action: BankAction.PlaceInRow, placementRow: 2 },
      ]
    },
    boardState: {
      tiles: [
        [{}, {}, {}, ],
        [{}, {}, {}, ],
        [{color: 0}, {color: 0}, {color: 0}, ],
      ]
    },
    bankState: {
      banks: [
        { count: 1, color: 0 },
        { count: 1, color: 0 },
        { count: 2, color: 0 },
      ]
    },
  }}>
    <BoardContainer />
  </GameContainer>
);