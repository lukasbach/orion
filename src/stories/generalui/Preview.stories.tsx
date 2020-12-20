import React from 'react';
import { Story, Meta } from '@storybook/react';
import { CustomTile } from '../../components/CustomTile';
import { StoryContainer } from './StoryContainer';
import { AllTiles } from './AllTiles';
import { PreviewIcon } from '../../components/PreviewIcon';
import { gameStateToPreview } from '../../gameStateToPreview';
import { Levels } from '../../level';
import { gameLevelToGameState } from '../../gameLevelToGameState';

export default {
  title: 'General UI/Level Preview',
  component: PreviewIcon,
} as Meta;


export const LevelPreview: React.FC = () => (
  <StoryContainer provideContext={true}>
    <PreviewIcon
      level={gameStateToPreview(gameLevelToGameState(Levels[0]))}
    />
    <PreviewIcon
      level={gameStateToPreview(gameLevelToGameState(Levels[1]))}
    />
    <PreviewIcon
      level={gameStateToPreview(gameLevelToGameState(Levels[2]))}
    />
  </StoryContainer>
)