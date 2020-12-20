import { useEffect, useState } from 'react';
import { GameState } from '../types';

const LOCALSTORAGE_KEY = '__LAST_LEVEL';

export const useCachedLevelStore = (state: string | undefined | null, isFinished?: boolean) => {
  const [lastLevel, setLastLevel] = useState<GameState>();

  useEffect(() => {
    if (isFinished) { // TODO
      localStorage.removeItem(LOCALSTORAGE_KEY);
    } else if (!!state) {
      localStorage.setItem(LOCALSTORAGE_KEY, state);
    }
  }, [state, isFinished]);

  useEffect(() => {
    const last = localStorage.getItem(LOCALSTORAGE_KEY);
    if (last) {
      setLastLevel(JSON.parse(last));
    }
  }, []);

  return {
    lastLevel
  };
};
