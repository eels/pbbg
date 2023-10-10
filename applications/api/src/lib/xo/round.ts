import State from '@/api/lib/xo/state';
import type AIActor from '@/api/lib/xo/ai-actor';

export default class Round {
  public ai: AIActor;
  public state: State;
  public status: 'BEGINNING' | 'RUNNING' | 'ENDED';

  public constructor(ai: AIActor) {
    this.ai = ai;
    this.state = new State();
    this.status = 'BEGINNING';

    this.state.board = new Array(9).fill('E');
    this.state.turn = 'X';
  }

  public static score(state: State) {
    if (state.result === 'X-WON') {
      return 10 - state.oMovesCount;
    }

    if (state.result === 'O-WON') {
      return -10 + state.oMovesCount;
    }

    return 0;
  }

  public advanceTo(state: State) {
    this.state = state;
  }

  public start() {
    if (this.status !== 'BEGINNING') {
      return;
    }

    this.advanceTo(this.state);
    this.status = 'RUNNING';
  }
}
