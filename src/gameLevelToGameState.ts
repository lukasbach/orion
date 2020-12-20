import { BagState, CurrentAction, GameLevel, GameState, TileColor } from './types';

const randomItem = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

const getBag = (colors: TileColor[], bagSize: number): BagState => ({
  tiles: '_'.repeat(bagSize).split('').map(_ => randomItem(colors)),
});

const getBags = (colors: TileColor[], bagCount: number, bagSize: number): BagState[] => (
  '_'.repeat(bagCount).split('').map(_ => getBag(colors, bagSize))
);

export const gameLevelToGameState = (level: GameLevel): GameState => {
  return {
    name: level.name,
    boardSetup: level.boardSetup,
    boardState: { tiles: level.boardSetup.tiles.map(row => row.map(tile => ({}))) },
    bankSetup: level.bankSetup,
    bankState: {
      banks: level.bankSetup.banks.map(bank => ({ count: 0 })),
    },
    colors: level.colors,
    bags: getBags(level.colors, level.bagCount, level.bagSize),
    currentAction: CurrentAction.ChoosingFromBag,
    currentBag: 0,
    points: level.points,
    roundNumber: 0,
    bagPresets: level.bagPresets,
    tutorialRenderer: level.tutorialRenderer
  }
};
