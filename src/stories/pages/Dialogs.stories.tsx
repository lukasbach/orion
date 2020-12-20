import React from 'react';
import { Meta } from '@storybook/react';
import { Dialog as DialogComp } from '../../components/Dialog';
import { GameContainer } from '../../components/GameContainer';
import { BoardContainer } from '../../components/BoardContainer';
import { DialogButton } from '../../components/DialogButton';
import { StoryContainer } from '../generalui/StoryContainer';
import { gameLevelToGameState } from '../../gameLevelToGameState';
import { Levels } from '../../level';

export default {
  title: 'Pages/Dialogs',
  component: DialogComp,
} as Meta;


export const WinDialog: React.FC = () => (
  <StoryContainer
    provideContext={true}
    initialState={{
      ...gameLevelToGameState(Levels[0]),
      end: 'won'
    }}
  >
    <GameContainer>
      <BoardContainer />
    </GameContainer>
  </StoryContainer>
);

export const LostDialog: React.FC = () => (
  <StoryContainer
    provideContext={true}
    initialState={{
      ...gameLevelToGameState(Levels[0]),
      end: 'lost'
    }}
  >
    <GameContainer>
      <BoardContainer />
    </GameContainer>
  </StoryContainer>
);