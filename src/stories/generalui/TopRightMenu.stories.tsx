import React from 'react';
import { Meta } from '@storybook/react';
import { StoryContainer } from './StoryContainer';
import { TopRightMenu as TopRightMenuComp } from '../../components/TopRightMenu';
import { faBars } from '@fortawesome/free-solid-svg-icons';

(window as any).noTelemetry = true;

export default {
  title: 'General UI/Top Right Menu',
  component: TopRightMenuComp,
} as Meta;

export const TopRightMenu: React.FC = () => (
  <StoryContainer provideContext={true}>
    <TopRightMenuComp
      actions={[
        { text: 'Action' },
        { text: 'Action', icon: faBars },
        { icon: faBars },
      ]}
    />
  </StoryContainer>
)