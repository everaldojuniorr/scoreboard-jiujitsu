"use client";

import { useCallback, useState } from "react";
import { MatchControls } from "@/components/MatchControls";
import { ScorePanel } from "@/components/ScorePanel";
import {
  applyAction,
  initialMatchState,
  undoLastAction,
  type ScoreAction,
} from "@/lib/scoring";

export default function Home() {
  const [match, setMatch] = useState(initialMatchState);

  const handleAction = useCallback((action: ScoreAction) => {
    setMatch((prev) => applyAction(prev, action));
  }, []);

  const handleUndo = useCallback(() => {
    setMatch((prev) => undoLastAction(prev));
  }, []);

  const handleReset = useCallback(() => {
    const empty =
      match.white.points === 0 &&
      match.blue.points === 0 &&
      match.white.advantages === 0 &&
      match.blue.advantages === 0 &&
      match.white.penalties === 0 &&
      match.blue.penalties === 0;

    if (empty || window.confirm("Zerar pontuação, vantagens e punições dos dois lados?")) {
      setMatch(initialMatchState());
    }
  }, [match]);

  return (
    <div className="relative flex h-dvh min-h-dvh w-full flex-col overflow-hidden sm:flex-row">
      <MatchControls
        onUndo={handleUndo}
        onReset={handleReset}
        canUndo={match.history.length > 0}
      />
      <ScorePanel side="white" score={match.white} onAction={handleAction} />
      <div
        className="absolute top-0 bottom-0 left-1/2 z-[5] hidden w-1 -translate-x-1/2 bg-neutral-950 sm:block"
        aria-hidden
      />
      <ScorePanel side="blue" score={match.blue} onAction={handleAction} />
    </div>
  );
}
