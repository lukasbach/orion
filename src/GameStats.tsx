import * as React from 'react';
import cxs from 'cxs';
import { useGame } from './GameContainer';

const styles = {
  container: cxs({
    fontFamily: '"Nanum Pen Script", cursive',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: '200px',
    paddingRight: '10px',
    ' h3': {
      fontSize: '22px',
      textShadow: `0 -2px 0 rgba(0, 0, 0, .3)`,
      marginLeft: '20px',
      color: 'rgba(255, 255, 255, .55)',
    },
    ' span': {
      fontSize: '64px',
      textShadow: `0 -4px 0 rgba(0, 0, 0, .3)`,
      marginLeft: '4px',
      color: 'rgba(255, 255, 255, 1)',
    }
  })
}

export const GameStats: React.FC<{}> = props => {
  const { game, state } = useGame();

  return (
    <div className={styles.container}>
      <h3>round</h3> <span>{ state.roundNumber }</span>
      <h3>points</h3> <span>{ state.points }</span>
    </div>
  );
};
