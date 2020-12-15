import * as React from 'react';
import { useGame } from './GameContainer';
import { CustomTile } from './CustomTile';
import cxs from 'cxs';
import { CurrentAction } from './types';
import { Tile } from './Tile';
import { GameStats } from './GameStats';

const styles = {
  rowContainer: cxs({
    display: 'flex',
    justifyContent: 'flex-end'
  }),
  statContainer: cxs({
    height: '65px',
  })
}

export const BankUi: React.FC<{}> = props => {
  const { game, state } = useGame();
  const { banks: bankSetup } = state.bankSetup;
  const { banks: bankState } = state.bankState;

  return (
    <div>
      <div className={styles.statContainer}>
        <GameStats />
      </div>
      { bankSetup.map((bank, bankId) => (
        <div className={styles.rowContainer}>
          { '_'.repeat(bank.tiles).split('').map((_, tileId) => {
            if (tileId >= bankState[bankId].count) {
              if (game.bags.arePickedAddableToBank(bankId)) {
                return (
                  <CustomTile
                    children=""
                    color={'#c9d4de'}
                    noContent={true}
                    border={true}
                    clickable={true}
                    // onClick={() => game.perform(Mutations.chooseBank(bankId))}
                    onClick={() => game.actChooseBank(bankId)}
                  />
                );
              } else {
                return (
                  <CustomTile children="" color={'#c9d4de'} noContent={true} border={true} />
                );
              }
            } else {
              return (
                <Tile color={bankState[bankId].color!} />
              );
            }
          }) }
          <div style={{ width: '100px '}}>
            { bank.action }<br />
            {
              state.currentAction === CurrentAction.ChoosingBankToApply
              && state.bankSetup.banks[bankId].tiles === state.bankState.banks[bankId].count
              && (
                <button
                  onClick={() => game.actChooseAction(bankId)}
                  disabled={!game.banks.isActionAvailableInBank(bankId)}
                >
                  Apply action
                </button>
              )
            }
          </div>
        </div>
      )) }
      <div className={styles.statContainer} />
    </div>
  );
};
