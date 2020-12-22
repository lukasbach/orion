import * as React from 'react';
import { useGame } from './GameContainer';
import { BagUi } from './BagUi';
import cxs from 'cxs';
import { CurrentAction } from '../types';

const styles = {
  container: cxs({
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: '0px'
  })
}

export const BagsUi: React.FC<{}> = props => {
  const game = useGame();
  const bags = game.state.bags;

  return (
    <div className={styles.container}>
      { bags.map((bag, idx) => <BagUi bag={bag} key={idx} bagId={idx} />) }
      { game.state.currentAction === CurrentAction.ChoosingBankToApply && (
        <button onClick={() => game.game.forceNextRound()}>
          Next round
        </button>
      ) }
    </div>
  );
};
