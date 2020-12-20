import React from 'react';
import { Story, Meta } from '@storybook/react';
import { CustomTile } from '../../components/CustomTile';
import { StoryContainer } from './StoryContainer';
import { AllTiles } from './AllTiles';

export default {
  title: 'General UI/Custom Tiles/Small',
  component: CustomTile,
} as Meta;


export const Small: React.FC = () => (
  <StoryContainer provideContext={true} small={true}>
    <AllTiles />
  </StoryContainer>
)