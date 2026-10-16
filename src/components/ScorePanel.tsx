"use client";

import type { AthleteScore, AthleteSide, ScoreAction } from "@/lib/scoring";

type ScoreButtonPayload =
  | { type: "points"; value: 2 | 3 | 4 }
  | { type: "advantage" }
  | { type: "penalty" };

const BUTTONS: { label: string; payload: ScoreButtonPayload }[] = [
  { label: "2", payload: { type: "points", value: 2 } },
  { label: "3", payload: { type: "points", value: 3 } },
  { label: "4", payload: { type: "points", value: 4 } },
  { label: "ADV", payload: { type: "advantage" } },
  { label: "PUN", payload: { type: "penalty" } },
];

type ScorePanelProps = {
  side: AthleteSide;
  score: AthleteScore;
  onAction: (action: ScoreAction) => void;
};

export function ScorePanel({ side, score, onAction }: ScorePanelProps) {
  const isWhite = side === "white";

  return (
    <section
      className={`relative flex min-h-0 flex-1 flex-col ${
        isWhite ? "bg-white text-neutral-900" : "bg-[#0B4EA2] text-white"
      }`}
      aria-label={isWhite ? "Atleta branco" : "Atleta azul"}
    >
      <div className="flex flex-1 flex-col items-center justify-center gap-2 px-4 pt-14 pb-4 sm:gap-4 sm:pt-16">
        <p
          className={`text-xs font-semibold tracking-[0.35em] uppercase sm:text-sm ${
            isWhite ? "text-neutral-500" : "text-blue-100"
          }`}
        >
          {isWhite ? "Branco" : "Azul"}
        </p>
        <p
          className="font-mono text-[clamp(4.5rem,22vw,11rem)] leading-none font-bold tabular-nums"
          aria-live="polite"
        >
          {score.points}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
          <StatPill
            label="Vantagem"
            abbr="ADV"
            value={score.advantages}
            variant={isWhite ? "light" : "dark"}
          />
          <StatPill
            label="Punição"
            abbr="PUN"
            value={score.penalties}
            variant={isWhite ? "light" : "dark"}
            accent="penalty"
          />
        </div>
      </div>

      <div
        className={`border-t px-3 py-4 sm:px-6 sm:py-5 ${
          isWhite ? "border-neutral-200 bg-neutral-50" : "border-blue-900/40 bg-[#093d88]"
        }`}
      >
        <div
          className={`mx-auto grid max-w-xl grid-cols-5 gap-2 sm:gap-3 ${
            isWhite ? "" : ""
          }`}
        >
          {BUTTONS.map(({ label, payload }) => {
            const isAdv = payload.type === "advantage";
            const isPun = payload.type === "penalty";

            return (
              <button
                key={label}
                type="button"
                onClick={() =>
                  onAction({ ...payload, side } as ScoreAction)
                }
                className={`flex min-h-14 flex-col items-center justify-center rounded-lg border-2 px-1 py-2 text-sm font-bold transition active:scale-[0.97] sm:min-h-16 sm:text-base ${
                  isWhite
                    ? "border-neutral-300 bg-white text-neutral-900 shadow-sm hover:bg-neutral-100"
                    : "border-blue-300/50 bg-[#0d5bb8] text-white shadow-sm hover:bg-[#1268cc]"
                } ${
                  isAdv
                    ? isWhite
                      ? "border-amber-400 bg-amber-50 hover:bg-amber-100"
                      : "border-amber-300 bg-amber-500/90 hover:bg-amber-500"
                    : ""
                } ${
                  isPun
                    ? isWhite
                      ? "border-red-400 bg-red-50 text-red-900 hover:bg-red-100"
                      : "border-red-300 bg-red-600/90 hover:bg-red-600"
                    : ""
                }`}
              >
                <span className="text-[10px] font-semibold tracking-wide uppercase opacity-70 sm:text-xs">
                  {isAdv ? "Vant." : isPun ? "Pun." : "Pts"}
                </span>
                <span className="text-lg sm:text-xl">{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function StatPill({
  label,
  abbr,
  value,
  variant,
  accent,
}: {
  label: string;
  abbr: string;
  value: number;
  variant: "light" | "dark";
  accent?: "penalty";
}) {
  const base =
    variant === "light"
      ? "border-neutral-200 bg-neutral-100 text-neutral-800"
      : "border-white/20 bg-white/10 text-white";

  const penalty =
    accent === "penalty" && value > 0
      ? variant === "light"
        ? "border-red-300 bg-red-50 text-red-900"
        : "border-red-300/60 bg-red-500/30 text-white"
      : "";

  return (
    <div
      className={`flex min-w-[7.5rem] items-center justify-between gap-3 rounded-full border px-4 py-2 ${base} ${penalty}`}
    >
      <div className="text-left leading-tight">
        <p className="text-[10px] font-medium tracking-wide uppercase opacity-70">{label}</p>
        <p className="text-xs font-bold">{abbr}</p>
      </div>
      <span className="font-mono text-2xl font-bold tabular-nums">{value}</span>
    </div>
  );
}
