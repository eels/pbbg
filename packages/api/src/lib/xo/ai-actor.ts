import AIAction from '@/api/lib/xo/ai-action';
import Round from '@/api/lib/xo/round';
import type State from '@/api/lib/xo/state';

export default class AIActor {
  private intelligence: 'BLIND' | 'NOVICE' | 'MASTER';
  private round: Round;

  public constructor(intelligence: 'BLIND' | 'NOVICE' | 'MASTER') {
    this.intelligence = intelligence;
    this.round = new Round(this);
  }

  public static calculateAvailableActions(state: State) {
    return (position: number) => {
      const action = new AIAction(position);
      const next = action.applyTo(state);

      action.minimax = AIActor.calculateMinimaxValue(next);

      return action;
    };
  }

  public static calculateAvailableStates(state: State) {
    return (position: number) => {
      return new AIAction(position).applyTo(state);
    };
  }

  public static calculateMinimaxValue(state: State) {
    if (state.isTerminal()) {
      return Round.score(state);
    }

    const availablePositions = state.emptyCells();
    const availableNextStates = availablePositions.map(AIActor.calculateAvailableStates(state));
    let minimax = state.turn === 'X' ? -1000 : 1000;

    for (const next of availableNextStates) {
      const score = AIActor.calculateMinimaxValue(next);
      const isPlayerTurn = state.turn === 'X';

      if ((isPlayerTurn && score > minimax) || (!isPlayerTurn && score < minimax)) {
        minimax = score;
      }
    }

    return minimax;
  }

  public notify(turn: 'X' | 'O') {
    switch (this.intelligence) {
      case 'BLIND':
        return this.playBlindMove();
      case 'NOVICE':
        return this.playMasterOrNoviceMove(turn, Math.random() * 100 <= 40);
      case 'MASTER':
        return this.playMasterOrNoviceMove(turn, true);
    }
  }

  public plays(round: Round) {
    this.round = round;
  }

  private playBlindMove() {
    const state = this.round.state;
    const available = state.emptyCells();
    const position = available[Math.floor(Math.random() * available.length)];
    const action = new AIAction(position);
    const next = action.applyTo(state);

    this.round.advanceTo(next);
  }

  private playMasterOrNoviceMove(turn: 'X' | 'O', P: boolean) {
    const state = this.round.state;
    const available = state.emptyCells();
    const availableActions = available.map(AIActor.calculateAvailableActions(state));
    const isPlayerTurn = turn === 'X';

    availableActions.sort(AIAction.compare(isPlayerTurn ? 'DESCENDING' : 'ASCENDING'));

    const action = P || availableActions.length < 2 ? availableActions[0] : availableActions[1];
    const next = action.applyTo(state);

    this.round.advanceTo(next);
  }
}
