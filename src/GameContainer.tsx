import * as React from 'react';
import { useCallback, useContext, useRef, useState } from 'react';
import { BankAction, CurrentAction, GameState, GameStateContextValue } from './types';
import { boardSetups } from './boardSetups';
import { getBags, getInitialBoardState } from './utils';
import { Game } from './game/Game';

export const GameStateContext = React.createContext<GameStateContextValue>(null as any);

export const useGame = () => useContext(GameStateContext);

const initialGame: GameState = {
  boardSetup: boardSetups[0],
  boardState: getInitialBoardState(boardSetups[0]),
  bankSetup: {
    banks: [
      { tiles: 5, action: BankAction.Move },
      { tiles: 4, action: BankAction.PlaceInRow, placementRow: 2 },
      { tiles: 3, action: BankAction.PlaceInRow, placementRow: 3 },
      { tiles: 4, action: BankAction.PlaceInRow, placementRow: 4 },
      { tiles: 5, action: BankAction.Recolor },
    ]
  },
  bankState: {
    banks: [ { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, { count: 0 }, ]
  },
  colors: [0, 1, 2, 3],
  bags: getBags([0, 1, 2, 3]),
  currentAction: CurrentAction.ChoosingFromBag,
  currentBag: 0,
  points: 10,
  roundNumber: 0
};

const gameAfterBagChoosing = JSON.parse('{"boardSetup":{"tiles":[[null,null,null,{},null,null,null],[null,null,{},{},{},null,null],[null,{},{},{},{},{},null],[{},{},{},{},{},{},{}],[null,{},{},{},{},{},null],[null,null,{},{},{},null,null],[null,null,null,{},null,null,null]],"rightOffset":0},"boardState":{"tiles":[[{},{},{},{},{},{},{}],[{},{},{},{},{},{},{}],[{},{},{},{},{},{},{}],[{},{},{},{},{},{},{}],[{},{},{},{},{},{},{}],[{},{},{},{},{},{},{}],[{},{},{},{},{},{},{}]]},"bankSetup":{"banks":[{"tiles":4,"action":"move"},{"tiles":3,"action":"place_in_row","placementRow":2},{"tiles":2,"action":"place_in_row","placementRow":3},{"tiles":3,"action":"place_in_row","placementRow":4},{"tiles":4,"action":"recolor"}]},"bankState":{"banks":[{"color":2,"count":4},{"color":1,"count":1},{"color":3,"count":2},{"color":0,"count":1},{"color":3,"count":4}]},"colors":[0,1,2,3],"bags":[{"tiles":[null,null,null,null]},{"tiles":[null,null,null,null]},{"tiles":[null,null,null,null]}],"currentAction":6,"currentBag":0,"points":0,"roundNumber":0}');

export const GameContainer: React.FC<{}> = props => {
  const [state, setState] = useState<GameState>(initialGame);
  const game = useRef(new Game(setState, state));

  console.log(state)

  const updateState = useCallback((changed: Partial<GameState>) => {
    setState({ ...state, ...changed });
  }, [state]);

  return (
    <GameStateContext.Provider value={{
      state,
      updateState,
      game: game.current,
      perform: action => {
        setState(action(state))
      }
    }}>
      { props.children }
    </GameStateContext.Provider>
  );
};
