import * as React from 'react';
import { CustomTile, CustomTileProps } from '../../components/CustomTile';
import { dummyTileColor, tileColors } from '../../tileColors';
import { tileNames } from '../../tileNames';
import { StoryContainer } from './StoryContainer';

const Helper: React.FC<Omit<CustomTileProps, 'color'>> = props => (
  <div>
    <CustomTile
      color={dummyTileColor}
      children=""
      {...props}
    />
    {tileColors.map((color, idx) => (
      <CustomTile
        key={color}
        color={color}
        children={tileNames[idx]}
        {...props}
      />
    ))}
  </div>
);
export const AllTiles: React.FC<{}> = props => {
  return (
    <>
      <Helper
        border={true}
        clickable={true}
      />
      <Helper
        border={true}
        clickable={true}
        borderColor={dummyTileColor}
      />
      <Helper
        border={true}
        active={true}
      />
      <Helper
        border={true}
        clickable={true}
        noContent={true}
      />
    </>
  );
};
