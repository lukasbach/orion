import * as React from 'react';
import { useGame } from './GameContainer';
import { BagUi } from './BagUi';
import cxs from 'cxs';
import { CurrentAction } from '../types';
import cx from 'classnames';

const styles = {
  container: cxs({
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: '0px'
  }),
  nextRoundButton: cxs({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    fontFamily: '"Nanum Pen Script", cursive',
    fontWeight: 'bold',
    fontSize: '48px',
    border: 'none',
    backgroundColor: 'transparent',
    outline: 'none',
    color: 'rgba(255, 255, 255, .6)',
    transition: '.2s all ease',
    cursor: 'pointer',
    marginTop: '-30px',
    ':hover': {
      color: 'rgba(255, 255, 255, .9)',
      '> span': {
        color: 'rgba(255, 255, 255, .6)',
      }
    },
    '> span': {
      fontSize: '22px',
      color: 'rgba(255, 255, 255, .4)',
      transition: '.2s all ease',
      marginBottom: '-10px',
      marginLeft: '12px'
    },
  }),
  nextRoundButtonDisabled: cxs({
    color: 'rgba(255, 255, 255, .2) !important',
    cursor: 'not-allowed',
    ':hover': {
      color: 'rgba(255, 255, 255, .2) !important',
    },
    '> span': {
      color: 'rgba(255, 255, 255, .15) !important',
    }
  })
}

export const BagsUi: React.FC<{}> = props => {
  const game = useGame();
  const bags = game.state.bags;

  return (
    <div className={styles.container}>
      { bags.map((bag, idx) => <BagUi bag={bag} key={idx} bagId={idx} />) }
      <button
        onClick={() => game.game.forceNextRound()}
        className={cx(
          styles.nextRoundButton,
          game.state.currentAction !== CurrentAction.ChoosingBankToApply && styles.nextRoundButtonDisabled
        )}
        disabled={game.state.currentAction !== CurrentAction.ChoosingBankToApply}
      >
        <span>skip to</span>
        Next round
      </button>
    </div>
  );
};
