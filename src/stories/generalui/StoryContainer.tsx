import * as React from 'react';
import cxs from 'cxs';
import '../../index.css';
import { GameContainer } from '../../components/GameContainer';
import { GameState } from '../../types';

export const StoryContainer: React.FC<{
  provideContext?: boolean,
  initialState?: GameState,
  small?: boolean,
}> = props => {
  return (
    <div className={cxs({
      backgroundColor: '#282c34',
      padding: '30px',
      height: '100%'
    })}>

      {
        props.provideContext ? (
          <GameContainer {...props}>
            { props.children }
          </GameContainer>
        ) : props.children }
    </div>
  );
};
