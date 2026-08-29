"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { beginNextDay, makeChoice, restartStory } from "@/story/actions";
import type { ActionResult, TurnResult } from "@/story/types";

export default function StoryPlayer({
  initial,
  preview,
}: {
  initial: TurnResult;
  preview?: string;
}) {
  const [turn, setTurn] = useState<TurnResult>(initial);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const { scene, state } = turn;

  const run = (action: () => Promise<ActionResult>) => {
    setError(null);
    startTransition(async () => {
      const result = await action();
      if (result.ok) {
        setTurn(result);
      } else {
        setError(result.error);
      }
    });
  };

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

            {error && (
              <p className="mt-6 text-sm text-ember bg-ember/10 border border-ember/30 rounded-lg px-4 py-3">
                {error}
              </p>
            )}

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
                    onClick={() => run(() => restartStory(preview))}
                    disabled={pending}
                    className="px-6 py-3 rounded-lg bg-ember text-background font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-wait"
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
                {turn.nextDayUnlocked ? (
                  <>
                    <p className="text-sm text-foreground/50">
                      In December, the next door only opens on its real day.
                      For now, you may continue.
                    </p>
                    <button
                      onClick={() => run(() => beginNextDay(preview))}
                      disabled={pending}
                      className="px-6 py-3 rounded-lg bg-ember text-background font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-wait"
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
                    onClick={() => run(() => makeChoice(index, preview))}
                    disabled={pending}
                    className="w-full text-left px-4 py-3 rounded-lg border border-foreground/10 bg-foreground/5 hover:border-ember hover:bg-foreground/10 transition-colors disabled:opacity-50 disabled:cursor-wait"
                  >
                    {choice.text}
                  </button>
                ))}
              </div>
            )}

            {pending && (
              <p className="mt-4 text-center text-xs text-foreground/40" role="status">
                …
              </p>
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
