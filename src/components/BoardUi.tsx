import * as React from 'react';
import { useGame } from './GameContainer';
import cxs from 'cxs';
import { CustomTile } from './CustomTile';
import { Tile } from './Tile';
import { dummyTileColor, tileColors } from '../tileColors';
import { CurrentAction } from '../types';
import { Mutations } from '../Mutations';

const styles = {
  rowContainer: cxs({
    display: 'flex',
  })
}

export const BoardUi: React.FC<{}> = props => {
  const { game, state } = useGame();
  const { boardSetup, boardState } = state;

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

              return (
                <Tile
                  color={tileState?.color}
                  clickable={game.canClickBoardTile(rowId, tileId)}
                  onClick={() => game.actClickBoardTile(rowId, tileId)}
                  border={true}
                  borderColor={tileSetup?.requiredColor ?? undefined}
                />
              );

              /*if (tileState?.color !== undefined) {
                if (
                  state.currentAction === CurrentAction.RecoloringPickingTile
                ) {
                  return (
                    <Tile
                      color={tileState.color}
                      clickable={true}
                      onClick={() => game.actRecolorTile(rowId, tileId)}
                      border={true}
                      borderColor={tileSetup?.requiredColor}
                    />
                  );
                } else if (
                  state.currentAction === CurrentAction.MovingTilePickingTile
                  // TODO check free tiles
                ) {
                  return (
                    <Tile
                      color={tileState.color}
                      clickable={true}
                      onClick={() => game.actStartMovingTile(rowId, tileId)}
                      border={true}
                      borderColor={tileSetup?.requiredColor}
                    />
                  );
                } else {
                  return (
                    <Tile
                      color={tileState.color}
                      border={true}
                      borderColor={tileSetup?.requiredColor}
                    />
                  );
                }
              } else {
                if (
                  state.currentAction === CurrentAction.PlacingTile &&
                  state.actioningBankId !== undefined &&
                  state.bankSetup.banks[state.actioningBankId].placementRow === rowId
                ) {
                  return (
                    <CustomTile
                      color={dummyTileColor}
                      noContent={true}
                      border={true}
                      clickable={true}
                      onClick={() => game.actPlaceTile(rowId, tileId)}
                      borderColor={tileSetup?.requiredColor !== undefined ? tileColors[tileSetup.requiredColor] : undefined}
                    />
                  );
                } else if (
                  state.currentAction === CurrentAction.MovingTileMoving &&
                  (
                    Math.abs(state.movingTileSourcePosition![0] - rowId) <= 1 &&
                    Math.abs(state.movingTileSourcePosition![1] - tileId) <= 1
                  )
                ) {
                  return (
                    <CustomTile
                      color={dummyTileColor}
                      noContent={true}
                      border={true}
                      clickable={true}
                      onClick={() => game.actCompleteMovingTile(rowId, tileId)}
                      borderColor={tileSetup?.requiredColor !== undefined ? tileColors[tileSetup.requiredColor] : undefined}
                    />
                  );
                } else {
                  return (
                    <CustomTile
                      color={dummyTileColor}
                      borderColor={tileSetup?.requiredColor !== undefined ? tileColors[tileSetup.requiredColor] : undefined}
                      noContent={true}
                      border={true}
                    />
                  );
                }
              }*/
            }
          }) }
        </div>
      )) }
    </div>
  );
};
