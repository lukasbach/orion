import * as React from 'react';
import { GameStateContext } from './GameContainer';

export const DummyGameContainer: React.FC<{
  small?: boolean,
}> = props => {

  return (
    <GameStateContext.Provider value={{
      state: null as any,
      small: !!props.small,
      game: null as any,
    }}>
      { props.children }
    </GameStateContext.Provider>
  );
};
