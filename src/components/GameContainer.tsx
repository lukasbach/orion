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
import { telemetryCall } from '../telemetry';
import { TelemetryCodes } from '../TelemetryCodes';

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
  const game = useRef<Game | null>(null);
  const [small, setSmall] = useState(props.small ?? false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasReportedEnd, setHasReportedEnd] = useState(false);
  useCachedLevelStore(gameStates.current[gameStates.current.length - 1], !!state.end);

  useEffect(() => {
    game.current = new Game(setState, state, s => gameStates.current.push(JSON.stringify(s)));
  }, [])

  useEffect(() => {
    console.log("Check win")
    if (state.end === 'won' && state.name) {
      console.log("WoN!!")
      store.updateLevelCompletion(state.name, state.points, state.roundNumber);
      if (!hasReportedEnd) {
        telemetryCall(TelemetryCodes.CompleteLevel);
        telemetryCall(TelemetryCodes.CompleteLevelPrefix + state.name);
        setHasReportedEnd(true);
      }
    } else if (state.end === 'lost' && state.name && !hasReportedEnd) {
      telemetryCall(TelemetryCodes.FailLevel);
      telemetryCall(TelemetryCodes.FailLevelPrefix + state.name);
      setHasReportedEnd(true);
    }
  }, [state.end, state.name, state.points, state.roundNumber, store, hasReportedEnd]);

  console.log(state)
  console.log(JSON.stringify(state))

  const retry = () => {
    if (gameStates.current[0]) {
      const state = JSON.parse(gameStates.current[0]);
      game.current?.forceUpdateState(state);
      setState(state);
      setIsMenuOpen(false);
      gameStates.current = [];
      telemetryCall(TelemetryCodes.RetryLevel);
      telemetryCall(TelemetryCodes.RetryLevelPrefix + state.name);
    }
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
      telemetryCall(TelemetryCodes.Revert);
    }
  }

  const quit = () => {
    props.quit?.();
    telemetryCall(TelemetryCodes.AbortLevel);
    telemetryCall(TelemetryCodes.AbortLevelPrefix + state.name);
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
          title="That didn't work out :/ Try again!"
          icon={faFrownOpen}
        />
        <DialogButton onClick={retry}>
          Retry
        </DialogButton>
        <DialogButton onClick={props.openAboutPage}>
          About
        </DialogButton>
        <DialogButton onClick={quit}>
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
        <DialogButton onClick={quit}>
          Quit
        </DialogButton>
      </Dialog>
    </GameStateContext.Provider>
  );
};
