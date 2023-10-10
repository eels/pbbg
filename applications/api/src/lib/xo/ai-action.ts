import State from '@/api/lib/xo/state';

export default class AIAction {
  public minimax: number;
  public position: number;

  public constructor(position: number) {
    this.position = position;
    this.minimax = 0;
  }

  public static compare(direction: 'ASCENDING' | 'DESCENDING') {
    return (first: AIAction, second: AIAction) => {
      if (first.minimax < second.minimax) {
        return direction === 'ASCENDING' ? -1 : 1;
      } else if (first.minimax > second.minimax) {
        return direction === 'ASCENDING' ? 1 : -1;
      } else {
        return 0;
      }
    };
  }

  public applyTo(state: State) {
    const next = new State(state);

    next.board[this.position] = state.turn;
    next.oMovesCount = state.turn === 'O' ? next.oMovesCount++ : next.oMovesCount;

    next.advanceTurn();

    return next;
  }
}
