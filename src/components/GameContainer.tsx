import * as React from 'react';
import { useContext, useEffect, useRef, useState } from 'react';
import { CurrentAction, GameState, GameStateContextValue } from '../types';
import { Game } from '../game/Game';
import { gameLevelToGameState } from '../gameLevelToGameState';
import { Levels } from '../level';
import { Dialog } from './Dialog';
import { DialogHeader } from './DialogHeader';
import { faBars, faFrownOpen, faGrinTongueWink, faHistory } from '@fortawesome/free-solid-svg-icons';
import { DialogButton } from './DialogButton';
import { TopRightMenu } from './TopRightMenu';
import { useCompletionStore } from './useCompletionStore';
import { useCachedLevelStore } from './useCachedLevelStore';

export const GameStateContext = React.createContext<GameStateContextValue>(null as any);

export const useGame = () => useContext(GameStateContext);
export const useIsSmall = () => useContext(GameStateContext).small;

const initialGame: GameState = gameLevelToGameState(Levels[0]);

export const GameContainer: React.FC<{
  initialState?: GameState,
  small?: boolean,
  openAboutPage?: () => void,
  backToLevelSelection?: () => void,
  quit?: () => void,
}> = props => {
  const store = useCompletionStore();
  const gameStates = useRef<string[]>([]);
  const [state, setState] = useState<GameState>(props.initialState ?? initialGame);
  const [originalState, setOriginalState] = useState<GameState>(JSON.parse(JSON.stringify(state)));
  const game = useRef<Game | null>(null);
  const [small, setSmall] = useState(props.small ?? false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useCachedLevelStore(gameStates.current[gameStates.current.length - 1], !!state.end);

  useEffect(() => {
    game.current = new Game(setState, state, s => gameStates.current.push(JSON.stringify(s)));
  }, [])

  useEffect(() => props.initialState ? setOriginalState(JSON.parse(JSON.stringify(props.initialState))) : undefined, [props.initialState]);
  useEffect(() => {
    console.log("Check win")
    if (state.end === 'won' && state.name) {
      console.log("WoN!!")
      store.updateLevelCompletion(state.name, state.points, state.roundNumber);
    }
  }, [state.end, state.name, state.points, state.roundNumber, store]);

  console.log(state)
  console.log(JSON.stringify(state))

  const retry = () => {
    setState(originalState);
    game.current?.forceUpdateState(originalState);
    setIsMenuOpen(false);
    gameStates.current = [];
  }
  const revert = () => {
    if (state.currentAction === CurrentAction.Animation){
      return;
    }

    const latestState = gameStates.current.pop();
    if (latestState) {
      const parsed = JSON.parse(latestState);
      game.current?.forceUpdateState(parsed);
      setState(parsed);
    }
  }

  if (!game.current) {
    return null;
  }

  return (
    <GameStateContext.Provider value={{
      state, small,
      game: game.current,
    }}>
      { props.children }
      <TopRightMenu
        actions={[
          { text: 'Revert', icon: faHistory, onClick: revert },
          { icon: faBars, onClick: () => setIsMenuOpen(true) },
        ]}
      />

      <Dialog isOpen={state.end === 'won'} cantClose={true}>
        <DialogHeader
          title="Great job!"
          icon={faGrinTongueWink}
        />
        <DialogButton onClick={props.backToLevelSelection}>
          Back to level selection
        </DialogButton>
        <DialogButton onClick={props.openAboutPage}>
          About
        </DialogButton>
        <DialogButton onClick={props.quit}>
          Quit
        </DialogButton>
      </Dialog>

      <Dialog isOpen={state.end === 'lost'} cantClose={true}>
        <DialogHeader
          title="Welp :/"
          icon={faFrownOpen}
        />
        <DialogButton onClick={retry}>
          Retry
        </DialogButton>
        <DialogButton onClick={props.openAboutPage}>
          About
        </DialogButton>
        <DialogButton onClick={props.quit}>
          Quit
        </DialogButton>
      </Dialog>

      <Dialog isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
        <DialogButton onClick={() => setIsMenuOpen(false)}>
          Continue
        </DialogButton>
        <DialogButton onClick={retry}>
          Retry
        </DialogButton>
        <DialogButton onClick={props.openAboutPage}>
          About
        </DialogButton>
        <DialogButton onClick={props.quit}>
          Quit
        </DialogButton>
      </Dialog>
    </GameStateContext.Provider>
  );
};
