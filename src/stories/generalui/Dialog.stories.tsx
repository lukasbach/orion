import React from 'react';
import { Meta } from '@storybook/react';
import { StoryContainer } from './StoryContainer';
import { Dialog as DialogComp } from '../../components/Dialog';
import { GameContainer } from '../../components/GameContainer';
import { BoardContainer } from '../../components/BoardContainer';
import { DialogButton } from '../../components/DialogButton';

export default {
  title: 'General UI/Dialog',
  component: DialogComp,
} as Meta;


export const Dialog: React.FC = () => (
  <StoryContainer provideContext={true}>
    <GameContainer>
      <BoardContainer />
    </GameContainer>
    <DialogComp isOpen={true}>
      <DialogButton>Continue</DialogButton>
      <DialogButton>Restart</DialogButton>
      <DialogButton>About</DialogButton>
      <DialogButton>Quit</DialogButton>
    </DialogComp>
  </StoryContainer>
)