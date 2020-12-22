import React from 'react';
import { Story, Meta, storiesOf } from '@storybook/react';
import { GameContainer } from '../../components/GameContainer';
import { BoardContainer } from '../../components/BoardContainer';
import { gameLevelToGameState } from '../../gameLevelToGameState';
import { Levels } from '../../level';
import { LevelCategory } from '../../types';
import { TileMatrix as TileMatrixComp } from '../../components/TileMatrix';

(window as any).noTelemetry = true;

export default {
  title: 'Levels',
} as Meta;

const categories: { [cat in LevelCategory]: string } = {
  [LevelCategory.Tutorial]: 'Tutorial Levels',
  [LevelCategory.Easy]: 'Easy Levels',
  [LevelCategory.Medium]: 'Medium Levels',
  [LevelCategory.Hard]: 'Hard Levels',
  [LevelCategory.Unfinished]: 'Unfinished Levels',
  [LevelCategory.TooHard]: 'Levels deemed too hard to be fun',
  [LevelCategory.Undoable]: 'Levels deemed undoable without luck',
  [LevelCategory.NotEntertaining]: 'Levels deemed not entertaining',
  [LevelCategory.Uncategorized]: 'Uncategorized Levels',
};

for (const [cat, catName] of Object.entries(categories)) {
  for (const level of Levels.filter(l => l.category === parseInt(cat))) {
    const stories = storiesOf(`Levels/${catName}`, module);
    stories.add(level.name, () => (
      <GameContainer initialState={gameLevelToGameState(level)}>
        <BoardContainer />
      </GameContainer>
    ));
  }
}
