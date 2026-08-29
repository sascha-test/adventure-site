"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { choose, resolveScene, startNextDay, startStory } from "@/story/engine";
import type { GameState, Story } from "@/story/types";

export default function StoryPlayer({
  story,
  unlockedDay,
  initialState,
}: {
  story: Story;
  unlockedDay: number;
  initialState: GameState;
}) {
  const [state, setState] = useState<GameState>(initialState);
  const scene = useMemo(() => resolveScene(story, state), [story, state]);
  const nextDayUnlocked = state.currentDay < unlockedDay;

  const update = (next: GameState) => {
    setState(next);
    fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(next),
    }).catch((error) => console.error("Progress save failed:", error));
  };

  const restart = () => update(startStory(story));

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-1 px-6 py-16">
        <div className="w-full max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/"
              className="text-sm text-foreground/50 hover:text-foreground/70 transition-colors"
            >
              ← Back to home
            </Link>
            <span className="text-sm uppercase tracking-widest text-ember">
              Day {state.currentDay}
            </span>
          </div>

          <section className="rounded-xl bg-foreground/5 border border-foreground/10 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              {scene.arc && (
                <span className="text-xs uppercase tracking-widest text-moss border border-moss/40 rounded-full px-3 py-1">
                  {scene.arc}
                </span>
              )}
              {scene.title && (
                <h1 className="text-2xl sm:text-3xl font-semibold">
                  {scene.title}
                </h1>
              )}
            </div>

            <div className="space-y-4 leading-relaxed text-foreground/80">
              {scene.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {scene.endsStory ? (
              <div className="mt-10 pt-8 border-t border-foreground/10 text-center space-y-4">
                <p className="text-xl font-semibold text-moss">
                  The End — for now
                </p>
                <p className="text-sm text-foreground/50">
                  This is the five-day demo. In December, the story continues
                  for 24 days, shaped by your choices.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                  <button
                    onClick={restart}
                    className="px-6 py-3 rounded-lg bg-ember text-background font-semibold hover:opacity-90 transition-opacity"
                  >
                    Play again
                  </button>
                  <Link
                    href="/"
                    className="px-6 py-3 rounded-lg border border-foreground/10 bg-foreground/5 hover:border-ember transition-colors font-semibold"
                  >
                    Back to home
                  </Link>
                </div>
              </div>
            ) : scene.endsDay ? (
              <div className="mt-10 pt-8 border-t border-foreground/10 text-center space-y-4">
                <p className="text-xl font-semibold text-ember">
                  Day {state.currentDay} complete
                </p>
                {nextDayUnlocked ? (
                  <>
                    <p className="text-sm text-foreground/50">
                      In December, the next door only opens on its real day.
                      For now, you may continue.
                    </p>
                    <button
                      onClick={() => update(startNextDay(story, state))}
                      className="px-6 py-3 rounded-lg bg-ember text-background font-semibold hover:opacity-90 transition-opacity"
                    >
                      Begin Day {state.currentDay + 1}
                    </button>
                  </>
                ) : (
                  <p className="text-sm text-foreground/50">
                    The next door is still sealed. Come back tomorrow to
                    continue the story.
                  </p>
                )}
              </div>
            ) : (
              <div className="mt-10 pt-8 border-t border-foreground/10 space-y-3">
                {scene.choices.map((choice, index) => (
                  <button
                    key={index}
                    onClick={() => update(choose(story, state, index))}
                    className="w-full text-left px-4 py-3 rounded-lg border border-foreground/10 bg-foreground/5 hover:border-ember hover:bg-foreground/10 transition-colors"
                  >
                    {choice.text}
                  </button>
                ))}
              </div>
            )}
          </section>

          <details className="mt-6 text-sm text-foreground/40">
            <summary className="cursor-pointer hover:text-foreground/60 transition-colors">
              Story engine state (for testing)
            </summary>
            <div className="mt-3 space-y-2 pl-1">
              <p>
                <span className="text-foreground/60">Scene:</span>{" "}
                {state.currentSceneId}
              </p>
              <p>
                <span className="text-foreground/60">Flags:</span>{" "}
                {state.flags.length > 0 ? state.flags.join(", ") : "none"}
              </p>
              <p>
                <span className="text-foreground/60">Scenes visited:</span>{" "}
                {state.visitedScenes.join(" → ")}
              </p>
              <p>
                <span className="text-foreground/60">Choices made:</span>{" "}
                {state.choiceLog.length}
              </p>
            </div>
          </details>
        </div>
      </main>
    </div>
  );
}
