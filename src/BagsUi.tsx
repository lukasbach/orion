import * as React from 'react';
import { useGame } from './GameContainer';
import { BagUi } from './BagUi';

export const BagsUi: React.FC<{}> = props => {
  const game = useGame();
  const bags = game.state.bags;

  return (
    <div>
      { bags.map((bag, idx) => <BagUi bag={bag} key={idx} bagId={idx} />) }
    </div>
  );
};
