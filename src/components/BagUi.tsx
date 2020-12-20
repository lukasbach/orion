import * as React from 'react';
import { BagState, CurrentAction } from '../types';
import { useGame } from './GameContainer';
import { Tile } from './Tile';
import { CustomTile } from './CustomTile';
import { dummyTileColor } from '../tileColors';
import cxs from 'cxs';
import cx from 'classnames';

const styles = {
  container: cxs({
    position: 'relative',
    width: '240px',
    minWidth: '240px',
    height: '240px',
    minHeight: '240px'
  }),
  inner: cxs({
    position: 'absolute',
    left: '0',
    top: '0',
    padding: '20px 20px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '170px',
  }),
  svg: cxs({
    position: 'absolute',
    top: '0',
    left: '0',
    ' path': {
      fill: 'rgba(0, 0, 0, .1)',
      transition: '.2s fill ease'
    }
  }),
  svgActive: cxs({
    ' path': {
      fill: 'rgba(0, 0, 0, .4)'
    }
  })
}

export const BagUi: React.FC<{
  bag: BagState,
  bagId: number,
}> = props => {
  const { game, state } = useGame();
  const bag = props.bag;

  return (
    <div className={styles.container}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 600 600"
        className={cx(
          styles.svg,
          (props.bagId === state.currentBag || state.currentBag === 'remainings' )
          && state.currentAction === CurrentAction.ChoosingFromBag && styles.svgActive
        )}
      >
        <title />
        <path
          className="cls-1"
          d={
            'M249.5,0C111.7,0,0,111.7,0,249.5S111.7,499,249.5,499,499,387.3,499,249.5,387.3,0,' +
            '249.5,0ZM271,436C160,436,70,346,70,235S160,34,271,34s201,90,201,201S382,436,271,436Z'
          }
        />
      </svg>
      <div className={styles.inner}>
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
    </div>
  );
};
