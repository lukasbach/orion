import * as React from 'react';
import { TileColor } from './types';
import { CustomTile } from './CustomTile';
import { tileNames } from './tileNames';
import { tileColors } from './tileColors';

export const Tile: React.FC<{
  color: TileColor,
  borderColor?: TileColor,
  active?: boolean,
  border?: boolean,
  noContent?: boolean,
  clickable?: boolean,
  onClick?: () => void,
}> = props => {

  return (
    <CustomTile
      { ...props }
      color={tileColors[props.color]}
      borderColor={props.borderColor !== undefined ? tileColors[props.borderColor] : undefined}
    >
      { tileNames[props.color] }
    </CustomTile>
  );
};
