import * as React from 'react';
import cxs from 'cxs';
import { TileMatrix } from './TileMatrix';
import { GameContainer } from './GameContainer';
import { DummyGameContainer } from './DummyGameContainer';
import { useLayoutEffect } from 'react';
import { useCachedLevelStore } from './useCachedLevelStore';

const LEFT_WIDTH = 500;

const styles = {
  container: cxs({
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
  }),
  bgContainer: cxs({
    height: '100%',
    display: 'flex',
    '> :first-child': {
      width: `${LEFT_WIDTH - 200}px`
    },
    '> :nth-child(2)': {
      flexGrow: 1
    }
  }),
  leftBg: cxs({
    position: 'absolute',
    top: '-10%',
    left: '-200px',
    transform: 'rotate(7deg)',
    height: '120%',
    width: `${LEFT_WIDTH + 200}px`,
    backgroundColor: '#212329',
    borderRight: `8px solid ${'#18191d'}`,
  }),
  leftContainer: cxs({
    color: '#fff',
    fontFamily: '"Nanum Pen Script", cursive',
    textTransform: 'uppercase',
    position: 'absolute',
    top: '0px',
    left: '0px',
    bottom: '0px',
    width: LEFT_WIDTH,
    padding: '60px 40px',
    ' h1': {
      fontWeight: 'bold',
      fontSize: '200px',
      margin: '8px 0 40px 0',
    },
    ' a': {
      textDecoration: 'none !important',
    },
    ' button': {
      display: 'block',
      width: `${LEFT_WIDTH}px`,
      textAlign: 'left',
      backgroundColor: 'transparent',
      border: 'none',
      outline: 'none',
      color: 'rgba(255, 255, 255, .6)',
      fontFamily: '"Nanum Pen Script", cursive',
      fontSize: '48px',
      cursor: 'pointer',
      padding: '10px 100px 10px 80px',
      marginLeft: '-40px',
      ':hover': {
        color: 'rgba(255, 255, 255, .8)',
        background: 'linear-gradient(270deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.07) 100%)'
      },
      ':active': {
        color: 'rgba(255, 255, 255, 1)',
        background: 'linear-gradient(270deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.12) 100%)'
      }
    },
    ' .revert': {
      textTransform: 'none',
      fontFamily: 'sans-serif',
    }
  }),
  metainfo: cxs({
    position: 'absolute',
    bottom: '10px',
    left: '40px',
    width: '450px',
    ' p': {
      color: 'rgb(120, 120, 120) !important',
      textTransform: 'none',
      fontFamily: 'sans-serif',
      fontSize: '12px',
      ' a': {
        color: 'rgb(160, 160, 160) !important',
        textDecoration: 'underline !important',
      }
    },
    ' > span': {
      marginRight: '10px'
    }
  })
};

export const StartPage: React.FC<{
  onContinue?: () => void,
  onPlay?: () => void,
  onAbout?: () => void,
}> = props => {
  const lastLevel = useCachedLevelStore(undefined);
  return (
    <div className={styles.container}>
      <div className={styles.bgContainer}>
        <div />
        <DummyGameContainer small={false}>
          <TileMatrix />
        </DummyGameContainer>
      </div>
      <div className={styles.leftBg} />
      <div className={styles.leftContainer}>
        <h1>Voc</h1>
        { lastLevel && (
          <button onClick={props.onContinue}>Continue</button>
        )}
        <button onClick={props.onPlay}>Play Game</button>
        <a href="https://github.com/lukasbach/voc" target="_blank">
          <button>GitHub</button>
        </a>
        <button onClick={props.onAbout}>About</button>
      </div>
      <div className={styles.metainfo}>
        <a className="github-button" href="https://github.com/lukasbach" data-color-scheme="no-preference: dark; light: dark; dark: dark;" data-size="large" aria-label="Follow @lukasbach on GitHub">Follow @lukasbach</a>
        <a className="github-button" href="https://github.com/lukasbach/voc/issues" data-color-scheme="no-preference: dark; light: dark; dark: dark;" data-icon="octicon-issue-opened" data-size="large" aria-label="Issue ntkme/github-buttons on GitHub">Issue</a>
        <a className="github-button" href="https://github.com/lukasbach/voc" data-color-scheme="no-preference: dark; light: dark; dark: dark;" data-icon="octicon-star" data-size="large" aria-label="Star lukasbach/voc on GitHub">Star</a>
        <p>
          &copy; 2020 by <a href="https://lukasbach.com" target="_blank">Lukas Bach</a>.
          <a href="https://lukasbach.com/impress" target="_blank">Impress and Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};
