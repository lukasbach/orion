import React from 'react';
import { Meta } from '@storybook/react';
import { LevelSelectionPage as LevelSelectionPageComp } from '../../components/LevelSelectionPage';

(window as any).noTelemetry = true;

export default {
  title: 'Pages/Level Selection Page',
  component: LevelSelectionPageComp,
  parameters: { layout: 'fullscreen' }
} as Meta;


export const LevelSelectionPage: React.FC = () => (
  <LevelSelectionPageComp>

  </LevelSelectionPageComp>
)