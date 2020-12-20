import * as React from 'react';
import cxs from 'cxs';
import { LevelButton as LevelButtonComp } from './LevelButton';
import { gameStateToPreview } from '../gameStateToPreview';
import { gameLevelToGameState } from '../gameLevelToGameState';
import { Levels } from '../level';
import { StoryContainer } from '../stories/generalui/StoryContainer';
import { TopRightMenu } from './TopRightMenu';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { CATEGORIES } from '../constants';
import { GameLevel, LevelCategory } from '../types';
import { useCompletionStore } from './useCompletionStore';

const styles = {
  container: cxs({
    padding: '40px 40px',
    ' h1': {
      // fontFamily: '"Nanum Pen Script", cursive',
      textTransform: 'uppercase',
      letterSpacing: '8px',
      fontWeight: 'bold',
      fontSize: '18px',
      margin: '40px 0 0 30px',
      color: 'rgba(255, 255, 255, .8)',
    },
    ' p': {
      margin: '10px 0 30px 0',
      color: 'white',
    }
  }),
  levelList: cxs({
    display: 'flex',
    flexWrap: 'wrap'
  })
};

export const LevelSelectionPage: React.FC<{
  onBack?: () => void,
  onSelect?: (level: GameLevel) => void,
}> = props => {
  const store = useCompletionStore();
  return (
    <div className={styles.container}>
      { CATEGORIES.map(category => (
        <div key={category}>
          <h1>
            {(() => {
              switch (category) {
                case LevelCategory.Tutorial:
                  return 'Tutorial';
                case LevelCategory.Easy:
                  return 'Easy levels';
                case LevelCategory.Medium:
                  return 'Medium levels';
                case LevelCategory.Hard:
                  return 'Hard levels';
                default:
                  return 'Other levels';
              }
            })()}
          </h1>
          <div className={styles.levelList}>
            { Levels.filter(level => level.category === category).map(level => {
              const completed = store.finishedLevels[level.name];
              return (
                <LevelButtonComp
                  level={gameStateToPreview(gameLevelToGameState(level))}
                  completed={completed}
                  onClick={() => props.onSelect?.(level)}
                />
              );
            }) }
            { Levels.filter(level => level.category === category).length === 0 && (
              <p>
                No levels available in this category :/
              </p>
            ) }
          </div>
        </div>
      )) }

      <TopRightMenu
        actions={[
          { icon: faLongArrowAltLeft, text: 'Back', onClick: props.onBack }
        ]}
      />
    </div>
  );
};
