import React from 'react';
import { Story, Meta } from '@storybook/react';
import { CustomTile } from '../../components/CustomTile';
import { StoryContainer } from './StoryContainer';
import { AllTiles } from './AllTiles';
import { TileMatrix as TileMatrixComp } from '../../components/TileMatrix';

(window as any).noTelemetry = true;

export default {
  title: 'General UI/Tile Matrix',
  component: TileMatrixComp,
} as Meta;


export const TileMatrix: React.FC = () => (
  <StoryContainer provideContext={true}>
    <TileMatrixComp />
  </StoryContainer>
)