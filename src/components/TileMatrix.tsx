import * as React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import cxs from 'cxs';
import { CustomTile } from './CustomTile';
import { randomItem } from '../utils';
import { Tile } from './Tile';
// @ts-ignore
import ResizeSensor from "resize-sensor";

const styles = {
  container: cxs({
    height: '100%',
    overflow: 'hidden',
  }),
  matrixRow: cxs({
    position: 'absolute',
    left: '0px',
    display: 'flex',
    overflow: 'hidden',
  })
};

const TILE_SIZE = 78;

const TileMatrixRow: React.FC<{
  width: number,
  offset: number
}> = props => {
  const tileIds = useRef(
    '_'.repeat(100).split('').map((_) => randomItem([null, null, null, 0, 1, 2, 3]))
  );

  return (
    <div
      className={styles.matrixRow}
      style={{ top: (props.offset - 100) + 'px' }}
    >
      {
        '_'.repeat(props.width).split('').map((tile, id) => {
          const tileId = tileIds.current[id];
          if (tileId === null) {
            return (
              <CustomTile color={'transparent'} noContent={true} />
            );
          } else {
            return (
              <Tile
                color={tileId as any}
                border={true}
              />
            )
          }
        })
      }
    </div>
  );
}

export const TileMatrix: React.FC<{}> = props => {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [offset, setOffset] = useState(0);
  const divRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      const refreshSizes = () => {
        console.log("Resize", node.getBoundingClientRect().height, node.getBoundingClientRect().width)
        setHeight(node.getBoundingClientRect().height);
        setWidth(node.getBoundingClientRect().width);
      };
      new ResizeSensor(node, refreshSizes);
      refreshSizes();
      // node.addEventListener('resize', refreshSizes);
      // return () => node.removeEventListener('resize', refreshSizes);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset(o => o + 1);
    }, 50);
    return () => clearInterval(interval);
  }, [])

  const tilesWide = Math.ceil(width / TILE_SIZE);
  const tilesTall = Math.ceil(height / TILE_SIZE) + 1;

  return (
    <div ref={divRef} className={styles.container}>
      {
        '_'.repeat(tilesTall).split('').map((_, rowId) => (
          <TileMatrixRow
            key={rowId}
            width={tilesWide}
            offset={(rowId * TILE_SIZE + offset) % ((Math.ceil(height / TILE_SIZE) + 1) * TILE_SIZE)}
          />
        ))
      }
    </div>
  );
};
