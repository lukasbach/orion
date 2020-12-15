import * as React from 'react';
import { BagState, CurrentAction } from './types';
import { useGame } from './GameContainer';
import { Tile } from './Tile';
import { CustomTile } from './CustomTile';
import { dummyTileColor } from './tileColors';

export const BagUi: React.FC<{
  bag: BagState,
  bagId: number,
}> = props => {
  const { game, state } = useGame();
  const bag = props.bag;

  return (
    <div>
      {
        bag.tiles.map(tile => (
          tile !== null ? (
            <Tile
              color={tile}
              clickable={(
                (
                  state.currentBag === props.bagId ||
                  state.currentBag === 'remainings'
                ) &&
                state.currentAction === CurrentAction.ChoosingFromBag &&
                game.bags.isColorAValidPick(tile)
              )}
              onClick={() => game.actChooseFromBag(tile)}
            />
            ) : (
              <CustomTile
                color={dummyTileColor}
              />
            )
        ))
      }
    </div>
  );
};
