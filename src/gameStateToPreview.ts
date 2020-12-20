import { GameState, LevelPreview } from './types';

export const gameStateToPreview = (state: GameState): LevelPreview => {
  return {
    bd: state.boardSetup.tiles.map(row => row.map(tile => tile?.requiredColor !== undefined ? tile.requiredColor : 9)),
    bk: state.bankSetup.banks.map(bank => bank.tiles),
    nm: state.name ?? 'Unnamed level',
  };
};
