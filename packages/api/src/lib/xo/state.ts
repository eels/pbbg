export default class State {
  public board: string[];
  public oMovesCount: number;
  public result: 'RUNNING' | 'DRAW' | 'X-WON' | 'O-WON';
  public turn: 'X' | 'O';

  public constructor(state?: State) {
    this.board = state?.board ?? [];
    this.oMovesCount = state?.oMovesCount ?? 0;
    this.result = state?.result ?? 'RUNNING';
    this.turn = state?.turn ?? 'X';
  }

  public advanceTurn() {
    this.turn = this.turn === 'X' ? 'O' : 'X';
  }

  public emptyCells() {
    return this.board.reduce<number[]>((out, cell, index) => {
      return cell === 'E' ? [...out, index] : out;
    }, []);
  }

  public isTerminal() {
    const B = this.board;

    for (let i = 0; i <= 6; i = i + 3) {
      if (B[i] !== 'E' && B[i] === B[i + 1] && B[i + 1] === B[i + 2]) {
        this.result = (B[i] + '-WON') as 'X-WON' | 'O-WON';

        return true;
      }
    }

    for (let i = 0; i <= 2; i++) {
      if (B[i] !== 'E' && B[i] === B[i + 3] && B[i + 3] === B[i + 6]) {
        this.result = (B[i] + '-WON') as 'X-WON' | 'O-WON';

        return true;
      }
    }

    for (let i = 0, j = 4; i <= 2; i = i + 2, j = j - 2) {
      if (B[i] !== 'E' && B[i] === B[i + j] && B[i + j] === B[i + 2 * j]) {
        this.result = (B[i] + '-WON') as 'X-WON' | 'O-WON';

        return true;
      }
    }

    const empty = this.emptyCells().length === 0;

    this.result = empty ? 'DRAW' : this.result;

    return empty;
  }
}
