import React from 'react';
import { Story, Meta } from '@storybook/react';
import { CustomTile } from '../../components/CustomTile';
import { StoryContainer } from './StoryContainer';
import { AllTiles } from './AllTiles';

export default {
  title: 'General UI/Custom Tiles/Regular',
  component: CustomTile,
} as Meta;


export const Regular: React.FC = () => (
  <StoryContainer provideContext={true}>
    <AllTiles />
  </StoryContainer>
)