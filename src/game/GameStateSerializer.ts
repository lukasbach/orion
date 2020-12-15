import { Game } from './Game';
import { GameState } from '../types';

export class GameStateSerializer {
  constructor(private game: Game) {
  }

  public serializeState(): GameState {
    return {
      ...this.game.board.serialize(),
      ...this.game.banks.serialize(),
      ...this.game.bags.serialize(),
      colors: this.game.colors,
      roundNumber: this.game.roundNumber,
      points: this.game.points,
      currentAction: this.game.currentAction,
      actioningBankId: this.game.actioningBankId,
      movingTileSourcePosition: this.game.movingTileSourcePosition,
    };
  }
}