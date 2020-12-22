import React from 'react';
import { Meta } from '@storybook/react';
import { StartPage as StartPageComp } from '../../components/StartPage';

(window as any).noTelemetry = true;

export default {
  title: 'Pages/Start Page',
  component: StartPageComp,
  parameters: { layout: 'fullscreen' }
} as Meta;


export const StartPage: React.FC = () => (
  <StartPageComp>

  </StartPageComp>
)