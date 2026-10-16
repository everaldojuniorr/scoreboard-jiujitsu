export type AthleteSide = "white" | "blue";

export type ScoreAction =
  | { type: "points"; side: AthleteSide; value: 2 | 3 | 4 }
  | { type: "advantage"; side: AthleteSide }
  | { type: "penalty"; side: AthleteSide };

export type AthleteScore = {
  points: number;
  advantages: number;
  penalties: number;
};

export type MatchState = {
  white: AthleteScore;
  blue: AthleteScore;
  history: ScoreAction[];
};

export const initialMatchState = (): MatchState => ({
  white: { points: 0, advantages: 0, penalties: 0 },
  blue: { points: 0, advantages: 0, penalties: 0 },
  history: [],
});

export function applyAction(state: MatchState, action: ScoreAction): MatchState {
  const next = {
    white: { ...state.white },
    blue: { ...state.blue },
    history: [...state.history, action],
  };
  const athlete = next[action.side];

  if (action.type === "points") {
    athlete.points += action.value;
  } else if (action.type === "advantage") {
    athlete.advantages += 1;
  } else {
    athlete.penalties += 1;
  }

  return next;
}

export function undoLastAction(state: MatchState): MatchState {
  const last = state.history.at(-1);
  if (!last) return state;

  const next = {
    white: { ...state.white },
    blue: { ...state.blue },
    history: state.history.slice(0, -1),
  };
  const athlete = next[last.side];

  if (last.type === "points") {
    athlete.points = Math.max(0, athlete.points - last.value);
  } else if (last.type === "advantage") {
    athlete.advantages = Math.max(0, athlete.advantages - 1);
  } else {
    athlete.penalties = Math.max(0, athlete.penalties - 1);
  }

  return next;
}
