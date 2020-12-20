import React from 'react';
import { Meta } from '@storybook/react';
import { StoryContainer } from './StoryContainer';
import { gameStateToPreview } from '../../gameStateToPreview';
import { Levels } from '../../level';
import { gameLevelToGameState } from '../../gameLevelToGameState';
import { LevelButton as LevelButtonComp } from '../../components/LevelButton';

export default {
  title: 'General UI/Level Button',
  component: LevelButtonComp,
} as Meta;

export const LevelButton: React.FC = () => (
  <StoryContainer provideContext={true}>
    <LevelButtonComp
      level={gameStateToPreview(gameLevelToGameState(Levels[0]))}
    />
    <LevelButtonComp
      level={gameStateToPreview(gameLevelToGameState(Levels[1]))}
      completed={{ points: 2, round: 4 }}
    />
    <LevelButtonComp
      level={gameStateToPreview(gameLevelToGameState(Levels[2]))}
    />
    <LevelButtonComp
      level={gameStateToPreview(gameLevelToGameState(Levels[3]))}
    />
    <LevelButtonComp
      level={gameStateToPreview(gameLevelToGameState(Levels[4]))}
    />
  </StoryContainer>
)