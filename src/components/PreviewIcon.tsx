import * as React from 'react';
import { LevelPreview } from '../types';
import cxs from 'cxs';
import cx from 'classnames';
import { dummyTileColor, tileColors } from '../tileColors';

const styles = {
  container: cxs({
    width: '160px',
    height: '100px',
    minHeight: '100px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center'
  }),
  board: cxs({
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  }),
  boardRow: cxs({
    display: 'flex',
  }),
  boardTile: cxs({
    width: '10px',
    height: '10px',
    margin: '1px',
    borderRadius: '2px',
  }),
  banks: cxs({
    width: 'max-content',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  }),
  bank: cxs({
    display: 'flex',
    justifyContent: 'flex-end',
  })
}

export const PreviewIcon: React.FC<{
  level: LevelPreview
}> = props => {

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {
          props.level.bd.map((row, rowId) => (
            <div key={rowId} className={styles.boardRow}>
              {
                row.map((tile, colId) => (
                  <div
                    key={colId}
                    className={cx(
                      styles.boardTile,
                      cxs({
                        backgroundColor: tile === 9 ? 'transparent' : tileColors[tile]
                      })
                    )}
                  />
                ))
              }
            </div>
          ))
        }
      </div>
      <div className={styles.banks}>
        {
          props.level.bk.map((bankSize, rowId) => (
            <div key={rowId} className={styles.bank}>
              {
                '_'.repeat(bankSize).split('').map((_, colId) => (
                  <div
                    key={colId}
                    className={cx(
                      styles.boardTile,
                      cxs({
                        backgroundColor: dummyTileColor
                      })
                    )}
                  />
                ))
              }
            </div>
          ))
        }
      </div>
    </div>
  );
};
