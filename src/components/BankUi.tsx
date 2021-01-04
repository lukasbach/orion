import * as React from 'react';
import { useGame } from './GameContainer';
import { CustomTile } from './CustomTile';
import cxs from 'cxs';
import { CurrentAction } from '../types';
import { Tile } from './Tile';
import { GameStats } from './GameStats';
import { BankActionButton } from './BankActionButton';
import { tileColors } from '../tileColors';
import { useTutorial } from './useTutorial';

const styles = {
  container: cxs({
    pointerEvents: 'none',
  }),
  rowContainer: cxs({
    display: 'flex',
    justifyContent: 'flex-end'
  }),
  statContainer: cxs({
    height: '65px',
  })
}

export const BankUi: React.FC<{}> = props => {
  const tutorial = useTutorial();
  const { game, state } = useGame();
  const { banks: bankSetup } = state.bankSetup;
  const { banks: bankState } = state.bankState;

  return (
    <div className={styles.container}>
      <div className={styles.statContainer}>
        <GameStats />
      </div>
      { bankSetup.map((bank, bankId) => {
        const isDummyBank = bank.tiles === 0;
        const bankColor = game.banks.getBank(bankId).color;
        const borderColor = bankColor !== undefined ? tileColors[bankColor] : undefined;
        return (
          <div className={styles.rowContainer}>
            { isDummyBank && (
              <CustomTile children="" noContent={true} color={'#fff'} />
            )}
            { '_'.repeat(bank.tiles).split('').map((_, tileId) => {
              if (tileId >= bankState[bankId].count) {
                if (game.currentAction === CurrentAction.PickingBank && game.bags.arePickedAddableToBank(bankId)) {
                  return (
                    <CustomTile
                      children=""
                      color={'#c9d4de'}
                      noContent={true}
                      border={true}
                      clickable={true}
                      // onClick={() => game.perform(Mutations.chooseBank(bankId))}
                      onClick={() => game.actChooseBank(bankId)}
                      borderColor={borderColor}
                      glowing={tutorial?.highlightBanks?.[bankId]?.includes(tileId)}
                    />
                  );
                } else {
                  return (
                    <CustomTile children="" color={'#c9d4de'} noContent={true} border={true} borderColor={borderColor} />
                  );
                }
              } else {
                return (
                  <Tile color={bankState[bankId].color!} border={true} />
                );
              }
            }) }
            <div style={{ width: '200px '}}>
              { !isDummyBank && (
                <BankActionButton
                  action={bank.action}
                  clickable={(
                    state.currentAction === CurrentAction.ChoosingBankToApply &&
                    state.bankSetup.banks[bankId].tiles === state.bankState.banks[bankId].count &&
                    game.banks.isActionAvailableInBank(bankId)
                  )}
                  onClick={() => game.actChooseAction(bankId)}
                  glowing={tutorial?.highlightBankActions?.includes(bankId)}
                />
              )}
            </div>
          </div>
        );
      }) }
      <div className={styles.statContainer} />
    </div>
  );
};
