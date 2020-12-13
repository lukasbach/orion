import { BankAction, CurrentAction, GameState, TileColor } from './types';
import {
  emptyBank,
  getRemainingColorsInBags,
  getRemainingTileCountFromBags,
  mutateBoardState,
  nextColor, potentiallyEndBagPickingIfNoValidMovesLeft,
  prepareNextRoundState,
} from './utils';

export const Mutations = {
  chooseFromBag: (color: TileColor) => (state: GameState): GameState => {
    if (state.currentBag !== 'remainings') {
      return {
        ...state,
        currentAction: CurrentAction.PickingBank,
        bags: state.bags.map((bag, idx) => idx !== state.currentBag ? bag : { tiles: bag.tiles.map(tile => tile === color ? null : tile) }) as any,
        currentBag: Number.isInteger(state.currentBag) && state.currentBag < 2 ? (state.currentBag as number) + 1 : 'remainings',
        tilesPickedFromBag: {
          color: color,
          count: state.bags[state.currentBag as number].tiles.filter(t => t === color).length
        }
      };
    } else {
      return {
        ...state,
        currentAction: CurrentAction.PickingBank,
        bags: state.bags.map((bag, idx) => {
          return {
            tiles: bag.tiles.map(tile => tile === color ? null : tile) as any
          }
        }) as any,
        currentBag: getRemainingColorsInBags(state) !== 1 ? 'remainings' : 0,
        tilesPickedFromBag: {
          color: color,
          count: getRemainingTileCountFromBags(state, color)
        }
      };
    }
  },

  chooseBank: (bankId: number) => (state: GameState): GameState => ({
    ...state,
    currentAction: getRemainingColorsInBags(state) > 0 ? CurrentAction.ChoosingFromBag : CurrentAction.ChoosingBankToApply,
    tilesPickedFromBag: undefined,
    bankState: {
      ...state.bankState,
      banks: state.bankState.banks.map((bank, idx) => idx !== bankId ? bank : ({
        color: state.tilesPickedFromBag!.color,
        count: bank.count + state.tilesPickedFromBag!.count
      }))
    },
    ...potentiallyEndBagPickingIfNoValidMovesLeft(state)
  }),

  chooseAction: (bankId: number) => (state: GameState): GameState => {
    const bank = state.bankSetup.banks[bankId];
    switch (bank.action) {
      case BankAction.Move:
        return {
          ...state,
          currentAction: CurrentAction.MovingTilePickingTile,
          bankState: emptyBank(state.bankState, bankId),
          actioningBankId: bankId,
          actioningTileColor: state.bankState.banks[bankId].color,
        }
      case BankAction.Recolor:
        return {
          ...state,
          currentAction: CurrentAction.RecoloringPickingTile,
          bankState: emptyBank(state.bankState, bankId),
          actioningBankId: bankId,
          actioningTileColor: state.bankState.banks[bankId].color,
        }
      case BankAction.PlaceInRow:
        return {
          ...state,
          currentAction: CurrentAction.PlacingTile,
          bankState: emptyBank(state.bankState, bankId),
          actioningBankId: bankId,
          actioningTileColor: state.bankState.banks[bankId].color,
        }

    }
  },

  placeTile: (rowId: number, tileId: number) => (state: GameState): GameState => {
    return {
      ...state,
      currentAction: CurrentAction.ChoosingBankToApply,
      actioningBankId: undefined,
      boardState: mutateBoardState(state.boardState, [{
        y: tileId, x: rowId,
        changeTo: () => ({
          color: state.actioningTileColor
        })
      }]),
      ...prepareNextRoundState(state),
    }
  },

  recolorTile: (rowId: number, tileId: number) => (state: GameState): GameState => {
    return {
      ...state,
      currentAction: CurrentAction.ChoosingBankToApply,
      actioningBankId: undefined,
      // bankState: emptyBank(state.bankState, state.actioningBankId!),
      boardState: mutateBoardState(state.boardState, [{
        y: tileId, x: rowId,
        changeTo: () => ({
          color: nextColor(state, state.boardState.tiles[rowId]![tileId]!.color!)
        })
      }]),
      ...prepareNextRoundState(state),
    };
  },

  startMovingTile: (rowId: number, tileId: number) => (state: GameState): GameState => {
    return {
      ...state,
      currentAction: CurrentAction.MovingTileMoving,
      actioningBankId: undefined,
      // bankState: emptyBank(state.bankState, state.actioningBankId!),
      movingTileSourcePosition: [rowId, tileId],
      ...prepareNextRoundState(state),
    };
  },

  completeMovingTile: (rowId: number, tileId: number) => (state: GameState): GameState => {
    const [sourceRow, sourceTile] = state.movingTileSourcePosition!;
    return {
      ...state,
      currentAction: CurrentAction.ChoosingBankToApply,
      movingTileSourcePosition: undefined,
      boardState: mutateBoardState(state.boardState, [
        {
          x: sourceRow, y: sourceTile,
          changeTo: () => null,
        },
        {
          x: rowId, y: tileId,
          changeTo: () => ({
            color: state.boardState.tiles[sourceRow]![sourceTile]!.color
          })
        }
      ]),
      ...prepareNextRoundState(state),
    };
  },
}