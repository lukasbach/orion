import * as React from 'react';
import cxs from 'cxs';
import { useTutorial } from './useTutorial';

const styles = {
  container: cxs({
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    margin: '-20px 0',
    flexDirection: 'column',
    height: '200px',
    overflow: 'auto',
  }),
  inner: cxs({
    transition: '.2s all ease',
    width: '880px',
    fontSize: '16px',
    color: '#d0d0d0'
  })
};

export const Tutorial: React.FC<{}> = props => {
  const tutorial = useTutorial();

  if (!tutorial) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        { tutorial?.messages?.map(tut => <p key={tut}>{tut}</p>) }
      </div>
    </div>
  );
};
