import * as React from 'react';
import { useGame } from './GameContainer';
import cxs from 'cxs';
import { CustomTile } from './CustomTile';
import { Tile } from './Tile';
import { dummyTileColor, tileColors } from './tileColors';
import { CurrentAction } from './types';
import { Mutations } from './Mutations';

const styles = {
  rowContainer: cxs({
    display: 'flex',
  })
}

export const BoardUi: React.FC<{}> = props => {
  const game = useGame();
  const { boardSetup, boardState } = game.state;

  return (
    <div>
      { boardSetup.tiles.map((row, rowId) => (
        <div key={rowId} className={styles.rowContainer}>
          { row.map((tile, tileId) => {
            if (tile === null) {
              return <CustomTile color={dummyTileColor} noContent={true} />
            } else {
              const tileState = boardState.tiles[rowId][tileId];
              const tileSetup = boardSetup.tiles[rowId][tileId];

              if (tileState?.color !== undefined) {
                if (
                  game.state.currentAction === CurrentAction.RecoloringPickingTile
                ) {
                  return (
                    <Tile
                      color={tileState.color}
                      clickable={true}
                      onClick={() => game.perform(Mutations.recolorTile(rowId, tileId))}
                      border={true}
                      borderColor={tileSetup?.requiredColor}
                    />
                  );
                } else if (
                  game.state.currentAction === CurrentAction.MovingTilePickingTile
                  // TODO check free tiles
                ) {
                  return (
                    <Tile
                      color={tileState.color}
                      clickable={true}
                      onClick={() => game.perform(Mutations.startMovingTile(rowId, tileId))}
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
                  game.state.currentAction === CurrentAction.PlacingTile &&
                  game.state.actioningBankId !== undefined &&
                  game.state.bankSetup.banks[game.state.actioningBankId].placementRow === rowId
                ) {
                  return (
                    <CustomTile
                      color={dummyTileColor}
                      noContent={true}
                      border={true}
                      clickable={true}
                      onClick={() => game.perform(Mutations.placeTile(rowId, tileId))}
                      borderColor={tileSetup?.requiredColor !== undefined ? tileColors[tileSetup.requiredColor] : undefined}
                    />
                  );
                } else if (
                  game.state.currentAction === CurrentAction.MovingTileMoving &&
                  (
                    Math.abs(game.state.movingTileSourcePosition![0] - rowId) <= 1 &&
                    Math.abs(game.state.movingTileSourcePosition![1] - tileId) <= 1
                  )
                ) {
                  return (
                    <CustomTile
                      color={dummyTileColor}
                      noContent={true}
                      border={true}
                      clickable={true}
                      onClick={() => game.perform(Mutations.completeMovingTile(rowId, tileId))}
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
              }
            }
          }) }
        </div>
      )) }
    </div>
  );
};
