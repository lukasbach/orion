import * as React from 'react';
import { BagState, CurrentAction } from './types';
import { useGame } from './GameContainer';
import { Tile } from './Tile';
import { CustomTile } from './CustomTile';
import { dummyTileColor } from './tileColors';
import { Mutations } from './Mutations';

export const BagUi: React.FC<{
  bag: BagState,
  bagId: number,
}> = props => {
  const game = useGame();
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
                    game.state.currentBag === props.bagId ||
                      game.state.currentBag === 'remainings'
                  ) &&
                  game.state.currentAction === CurrentAction.ChoosingFromBag
                )}
                onClick={() => game.perform(Mutations.chooseFromBag(tile))}
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
