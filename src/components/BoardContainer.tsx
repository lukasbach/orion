import * as React from 'react';
import { BoardUi } from './BoardUi';
import { BankUi } from './BankUi';
import { BagsUi } from './BagsUi';
import cxs from 'cxs';
import { Tutorial } from './Tutorial';

const styles = {
  container: cxs({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%'
  }),
  boardAndBankContainer: cxs({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  })
}

export const BoardContainer: React.FC<{}> = props => {
  return (
    <div className={styles.container}>
      <div className={styles.boardAndBankContainer}>
        <BoardUi />
        <BankUi />
      </div>
      <BagsUi />
      <Tutorial />
    </div>
  );
};
