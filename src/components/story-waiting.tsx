import Link from "next/link";
import { daysUntilStart, STORY_START_DATE } from "@/story/gating";

export default function StoryWaiting({ now }: { now: Date }) {
  const daysLeft = daysUntilStart(now);
  const start = new Date(STORY_START_DATE).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md text-center">
          <Link
            href="/"
            className="block text-sm text-foreground/50 hover:text-foreground/70 transition-colors mb-8"
          >
            ← Back to home
          </Link>

          <p className="text-6xl mb-6">🚪</p>

          <h1 className="text-4xl font-semibold text-ember mb-4">
            Not yet, traveler
          </h1>
          <p className="text-foreground/70 leading-relaxed mb-8">
            The first door opens on{" "}
            <span className="text-foreground font-semibold">{start}</span>.
            The story of Havenmoor is sealed until then — no peeking at the
            presents.
          </p>

          <div className="rounded-xl bg-foreground/5 border border-foreground/10 p-6">
            <p className="text-sm uppercase tracking-widest text-moss mb-2">
              Doors remaining until the story begins
            </p>
            <p className="text-5xl font-semibold">{daysLeft}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
