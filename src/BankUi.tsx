import * as React from 'react';
import { useGame } from './GameContainer';
import { CustomTile } from './CustomTile';
import cxs from 'cxs';
import { CurrentAction } from './types';
import { Mutations } from './Mutations';
import { Tile } from './Tile';

const styles = {
  rowContainer: cxs({
    display: 'flex',
    justifyContent: 'flex-end'
  })
}

export const BankUi: React.FC<{}> = props => {
  const game = useGame();
  const { banks: bankSetup } = game.state.bankSetup;
  const { banks: bankState } = game.state.bankState;

  return (
    <div>
      { bankSetup.map((bank, bankId) => (
        <div className={styles.rowContainer}>
          { '_'.repeat(bank.tiles).split('').map((_, tileId) => {
            if (tileId >= bankState[bankId].count) {
              if (
                game.state.currentAction === CurrentAction.PickingBank &&
                bankSetup[bankId].tiles - bankState[bankId].count >= game.state.tilesPickedFromBag!.count &&
                (bankState[bankId].count === 0 || bankState[bankId].color === game.state.tilesPickedFromBag!.color)
              ) {
                return (
                  <CustomTile
                    children=""
                    color={'#c9d4de'}
                    noContent={true}
                    border={true}
                    clickable={true}
                    onClick={() => game.perform(Mutations.chooseBank(bankId))}
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
              game.state.currentAction === CurrentAction.ChoosingBankToApply
              && game.state.bankSetup.banks[bankId].tiles === game.state.bankState.banks[bankId].count
              && (
                <button onClick={() => game.perform(Mutations.chooseAction(bankId))}>
                  Apply action
                </button>
              )
            }
          </div>
        </div>
      )) }
    </div>
  );
};
