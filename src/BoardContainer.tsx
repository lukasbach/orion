import * as React from 'react';
import { BoardUi } from './BoardUi';
import { BankUi } from './BankUi';
import { BagsUi } from './BagsUi';
import cxs from 'cxs';

const styles = {
  boardAndBankContainer: cxs({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  })
}

export const BoardContainer: React.FC<{}> = props => {

  return (
    <div>
      <div className={styles.boardAndBankContainer}>
        <BoardUi />
        <BankUi />
      </div>
      <BagsUi />
    </div>
  );
};
