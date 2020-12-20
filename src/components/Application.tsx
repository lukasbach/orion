import * as React from 'react';
import { useState } from 'react';
import { GameLevel, GameState } from '../types';
import { StartPage } from './StartPage';
import { useCachedLevelStore } from './useCachedLevelStore';
import { LevelSelectionPage } from './LevelSelectionPage';
import { gameLevelToGameState } from '../gameLevelToGameState';
import { GameContainer } from './GameContainer';
import { BoardContainer } from './BoardContainer';
import { Dialog } from './Dialog';

enum Page {
  Home,
  LevelSelection,
  InGame,
}

export const Application: React.FC<{}> = props => {
  const [page, setPage] = useState(Page.Home);
  const [level, setLevel] = useState<GameState>();
  const [aboutOpen, setAboutOpen] = useState(false);
  const { lastLevel } = useCachedLevelStore(undefined);
  let component: React.ReactNode;

  switch (page) {
    case Page.Home:
      component = (
        <StartPage
          onPlay={() => setPage(Page.LevelSelection)}
          onContinue={() => {
            if (lastLevel) {
              setLevel(lastLevel);
              setPage(Page.InGame);
            }
          }}
          onAbout={() => setAboutOpen(true)}
        />
      );
      break;
    case Page.LevelSelection:
      component = (
        <LevelSelectionPage
          onBack={() => setPage(Page.Home)}
          onSelect={(level) => {
            setPage(Page.InGame);
            setLevel(gameLevelToGameState(level));
          }}
        />
      );
      break;
    case Page.InGame:
      component = (
        <GameContainer
          initialState={level}
          backToLevelSelection={() => setPage(Page.LevelSelection)}
          openAboutPage={() => setAboutOpen(true)}
          quit={() => setPage(Page.Home)}
        >
          <BoardContainer />
        </GameContainer>
      );
      break;
  }

  return (
    <>
      { component }
      <Dialog
        isOpen={aboutOpen}
        onClose={() => setAboutOpen(false)}
      >
        <p>
          Voc is a singleplayer board game inspired by the board game Azul. The goal is to fill the board
          with tiles in specific colors by cleverly choosing tiles from bags and arranging them in banks.
        </p>
        <p>
          The game was developed by <a href="https://lukasbach.com" target="_blank">Lukas Bach</a> as Open
          Source. The code is available at <a href="https://github.com/lukasbach/voc" target="_blank">GitHub</a>.
          If you enjoyed the game, I'd appreciate a star on the repo! You can also file any issues you've encountered
          there.
        </p>
        <p>
          You can also checkout my other projects at my <a href="https://github.com/lukasbach" target="_blank">GitHub</a>&nbsp;
          or <a href="https://lukasbach.com" target="_blank">personal page</a>, including
          the notebook app <a href="https://yana.js.org" target="_blank">Yana</a> and
          the collaborative IDE <a href="https://devsession.js.org" target="_blank">DevSession</a>.
        </p>
        <p>
          The icons used in Voc are provided by <a href="https://fontawesome.com" target="_blank">Fontawesome</a>&nbsp;
          (<a href="https://fontawesome.com/license" target="_blank">License</a>).
        </p>
        <p>
          Voc is &copy; 2020 by <a href="https://lukasbach.com" target="_blank">Lukas Bach</a>.
        </p>
      </Dialog>
    </>
  );
};
