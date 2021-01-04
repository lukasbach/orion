import { useGame } from './GameContainer';
import { useEffect, useState } from 'react';
import { TutorialRenderData } from '../types';

export const useTutorial = () => {
  const {game, state} = useGame();
  const [tutorial, setTutorial] = useState<undefined | TutorialRenderData>();

  useEffect(() => {
    const tut = game.getTutorial();
    if (tut) {
      setTutorial(tut);
    }
  }, [game, state]);

  return tutorial;
}