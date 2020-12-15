import {
  BagState,
  BankState,
  BoardSetup,
  BoardState,
  BoardTileState,
  CurrentAction,
  GameState, IndividualBankState,
  TileColor,
} from './types';

export const getInitialBoardState = (setup: BoardSetup): BoardState =>
  ({ tiles: setup.tiles.map(row => row.map(tile => ({}))) });

const randomItem = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

const getBag = (colors: TileColor[]): BagState => ({
  tiles: [randomItem(colors), randomItem(colors), randomItem(colors), randomItem(colors)]
});

export const getBags = (colors: TileColor[]): BagState[] => [
  getBag(colors), getBag(colors), getBag(colors), getBag(colors)
];

export const getRemainingTileCountFromBags = (state: GameState, color: TileColor) => {
  return state.bags
    .map(bag => bag.tiles)
    .reduce<Array<number | null>>((a, b) => [...a, ...b], [])
    .filter(x => x === color)
    .length;
}

export const getRemainingColorsInBags = (state: GameState) => {
  const numberOfColors = new Set(state.bags
    .map(bag => bag.tiles)
    .reduce<Array<number | null>>((a, b) => [...a, ...b], [])
    .filter(x => x !== null))
    .size;

  return numberOfColors;
}

export const mutateBoardState = (board: BoardState, mutations: Array<{ x: number, y: number, changeTo: (old: BoardTileState | null) => BoardTileState | null }>) => {
  let newBoard = JSON.parse(JSON.stringify(board)) as BoardState;
  for (const mutation of mutations) {
    newBoard.tiles[mutation.x][mutation.y] = mutation.changeTo(board.tiles[mutation.x]![mutation.y]!);
  }
  return newBoard;
}

export const emptyBank = (bankState: BankState, actioningBankId: number): BankState => {
  return {
    ...bankState,
    banks: bankState.banks.map((bank, bankId) => {
      if (bankId === actioningBankId) {
        return { count: 0, color: undefined };
      } else {
        return bank;
      }
    })
  };
}

export const nextColor = (state: GameState, color: TileColor) => {
  const nextColor = state.colors[state.colors.indexOf(color) + 1] ?? state.colors[0];
  console.log(nextColor, state, color)
  return nextColor
}

export const bankActionsAvailable = (state: GameState, bankToEmpty?: number) => {
  const banks: BankState = !bankToEmpty ? state.bankState : emptyBank(state.bankState, bankToEmpty);
  return banks.banks
    .map((bank, bankId) => bank.count === state.bankSetup.banks[bankId].tiles)
    .reduce((a, b) => a || b, false);
}

export const prepareNextRoundState = (state: GameState, bankToEmpty?: number): Partial<GameState> => {
  console.log("Next round available: ", !bankActionsAvailable(state, bankToEmpty), state)
  if (!bankActionsAvailable(state, bankToEmpty)) {
    return {
      currentAction: CurrentAction.ChoosingFromBag,
      currentBag: 0,
      bags: getBags(state.colors),
    };
  } else {
    return {};
  }
}

export const countUnpickedTiles = (state: GameState) => {
  let counter: { [key in TileColor]: number } = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  for (const bag of state.bags) {
    for (const tile of bag.tiles) {
      if (tile !== null) {
        counter[tile]++;
      }
    }
  }

  return Object.values(counter).reduce((a, b) => a + b, 0);
}

export const getPotentialBagPicks = (state: GameState): { [key in TileColor]: number } => {
  let counter: { [key in TileColor]: number } = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  if (state.currentBag === 'remainings') {
    for (const bag of state.bags) {
      for (const tile of bag.tiles) {
        if (tile !== null) {
          counter[tile]++;
        }
      }
    }
  } else {
    for (const tile of state.bags[state.currentBag].tiles) {
      if (tile !== null) {
        counter[tile]++;
      }
    }
  }

  return counter;
}

export const noValidBagPicksLeft = (state: GameState) => {
  const potentialBagPicks = getPotentialBagPicks(state);
  console.log(potentialBagPicks);

  return !Object.entries(potentialBagPicks)
    .filter(([color, count]) => count > 0)
    .map(([tileColor, count]) => {
      const color = tileColor as unknown as TileColor;
      return state.bankSetup.banks
        .map((bank, bankId) => (
          (state.bankState.banks[bankId].count === 0 || state.bankState.banks[bankId].color === color) &&
          (bank.tiles - state.bankState.banks[bankId].count >= count)
        ))
        .reduce((a, b) => a || b, false);
    })
    .reduce((a, b) => a || b, false);
}

export const potentiallyEndBagPickingIfNoValidMovesLeft = (state: GameState): Partial<GameState> => {
  if (!noValidBagPicksLeft(state)) {
    return {};
  } else {
    const emptyBag: BagState = { tiles: [null, null, null, null] };
    return {
      currentAction: CurrentAction.ChoosingBankToApply,
      points: state.points - countUnpickedTiles(state),
      bags: [emptyBag, emptyBag, emptyBag],
      ...(!bankActionsAvailable(state) ? prepareNextRoundState(state) : {})
    }
  }
}