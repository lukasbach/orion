import * as React from 'react';
import { useGame } from './GameContainer';
import cxs from 'cxs';
import { CustomTile } from './CustomTile';
import { Tile } from './Tile';
import { dummyTileColor } from '../tileColors';
import { useTutorial } from './useTutorial';

const styles = {
  rowContainer: cxs({
    display: 'flex',
  })
}

export const BoardUi: React.FC<{}> = props => {
  const { game, state } = useGame();
  const { boardSetup, boardState } = state;
  const tutorial = useTutorial();

  return (
    <div className={cxs({
      marginRight: `${state.boardSetup.rightOffset * 70}px`
    })}>
      { boardSetup.tiles.map((row, rowId) => (
        <div key={rowId} className={styles.rowContainer}>
          { row.map((tile, tileId) => {
            if (tile === null) {
              return <CustomTile color={dummyTileColor} noContent={true} />
            } else {
              const tileState = boardState.tiles[rowId][tileId];
              const tileSetup = boardSetup.tiles[rowId][tileId];
              const clickable = game.canClickBoardTile(rowId, tileId);

              return (
                <Tile
                  color={tileState?.color}
                  clickable={clickable}
                  onClick={() => game.actClickBoardTile(rowId, tileId)}
                  border={true}
                  borderColor={tileSetup?.requiredColor ?? undefined}
                  glowing={clickable && tutorial?.highlightBoardTiles?.[rowId]?.includes(tileId)}
                />
              );
            }
          }) }
        </div>
      )) }
    </div>
  );
};
