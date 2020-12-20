import * as React from 'react';
import { LevelPreview } from '../types';
import cxs from 'cxs';
import { PreviewIcon } from './PreviewIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const styles = {
  outer: cxs({
    display: 'inline-block',
  }),
  container: cxs({
    position: 'relative',
    width: '180px',
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '10px',
    borderRadius: '8px',
    border: `1px solid rgba(255, 255, 255, .1)`,
    cursor: 'pointer',
    fontFamily: '"Nanum Pen Script", cursive',
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, .7)',
    padding: '16px 10px',
    '> :first-child': {
      height: '140px',
      overflow: 'hidden',
    },
    ' h2': {
      margin: '0',
      fontSize: '28px',
    },
    ':hover': {
      color: 'rgba(255, 255, 255, .9)',
      border: `1px solid rgba(255, 255, 255, .3)`,
    }
  }),
  completedInfo: cxs({
    position: 'absolute',
    bottom: '0px',
    right: '10px',
    color: '#3fa529',
    fontSize: '16px',
    fontWeight: 'lighter'
  })
}

export const LevelButton: React.FC<{
  level: LevelPreview,
  completed?: { round: number, points: number },
  onClick?: () => void,
}> = props => {

  return (
    <div className={styles.outer}>
      <div className={styles.container} onClick={props.onClick}>
        <PreviewIcon level={props.level} />
        <h2>{ props.level.nm }</h2>
        { props.completed && (
          <div className={styles.completedInfo}>
            Completed with {props.completed.points} points&nbsp;
            <FontAwesomeIcon icon={faCheck} />
          </div>
        ) }
      </div>
    </div>
  );
};
