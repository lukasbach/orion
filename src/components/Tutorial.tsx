import * as React from 'react';
import cxs from 'cxs';
import { useGame } from './GameContainer';
import { useEffect, useState } from 'react';

const styles = {
  container: cxs({
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    margin: '-20px 0',
    flexDirection: 'column',
    // height: '160px',
    // overflow: 'auto',
  }),
  inner: cxs({
    transition: '.2s all ease',
    width: '880px',
    fontSize: '16px',
    color: '#d0d0d0'
  })
};

export const Tutorial: React.FC<{}> = props => {
  const {game, state} = useGame();
  const [tutorial, setTutorial] = useState<undefined | string[]>();

  useEffect(() => {
    const tut = game.getTutorial();
    if (tut) {
      setTutorial(tut);
    }
  }, [game, state]);

  if (!tutorial) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        { tutorial?.map(tut => <p key={tut}>{tut}</p>) }
      </div>
    </div>
  );
};
