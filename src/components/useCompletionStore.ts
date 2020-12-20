import { useEffect, useState } from 'react';

export interface CompletionStore {
  [levelName: string]: undefined | { points: number, round: number };
}

const LOCALSTORAGE_KEY = '__LEVELS';

export const useCompletionStore = () => {
  const [finishedLevels, setFinishedLevels] = useState<CompletionStore>({});

  useEffect(() => {
    const str = localStorage.getItem(LOCALSTORAGE_KEY);
    if (!!str) {
      setFinishedLevels(JSON.parse(str));
    }
  }, []);

  return {
    finishedLevels,
    updateLevelCompletion: (levelName: string, points: number, round: number) => {
      if (!finishedLevels[levelName] || (finishedLevels[levelName]?.points ?? 0) < points) {
        console.log("Save won")
        const newVal = {
          ...finishedLevels,
          [levelName]: { points, round }
        };
        setFinishedLevels(newVal);
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(newVal));
      }
    },
    resetStore: () => {
      localStorage.clear();
    }
  }
};
