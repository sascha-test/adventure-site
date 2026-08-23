import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-1">
        <section className="flex flex-col items-center justify-center text-center px-6 py-32 border-b border-foreground/10">
          <Image
            src="/logo.jpeg"
            alt="DnP Logo"
            width={120}
            height={120}
            className="mb-8"
            priority
          />
          <p className="text-sm uppercase tracking-[0.3em] text-ember mb-4">
            Coming December 2026
          </p>
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight max-w-4xl">
            Advent of Tales
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-foreground/70 max-w-xl">
            A choose-your-own-adventure story set in a world of swords and
            sorcery. A new chapter every day in December.
          </p>
        </section>

        <section className="px-6 py-24 max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-ember">
            What is this?
          </h2>
          <div className="space-y-4 text-foreground/80 leading-relaxed">
            <p>
              <span className="font-semibold text-foreground">
                Advent of Tales
              </span>{" "}
              is an interactive story that unfolds over 24 days. Each day
              brings a new chapter with choices, dice rolls, and consequences
              that shape your journey.
            </p>
            <p>
              Will you parley with the goblin envoy, or draw your blade? Will
              you trust the witch&apos;s bargain, or break the pact before
              dawn? Your decisions carry forward — and so do your wounds, your
              allies, and your regrets.
            </p>
          </div>
        </section>

        <section className="px-6 py-24 max-w-3xl mx-auto border-t border-foreground/10">
          <h2 className="text-2xl font-semibold mb-6 text-ember">
            How it works
          </h2>
          <ol className="space-y-6 text-foreground/80 leading-relaxed list-decimal list-inside marker:text-ember marker:font-semibold">
            <li>
              <span className="font-semibold text-foreground">
                A new door each day.
              </span>{" "}
              From December 1st, a new chapter unlocks every morning. You
              can&apos;t peek ahead — but you can revisit past choices.
            </li>
            <li>
              <span className="font-semibold text-foreground">
                Choices that matter.
              </span>{" "}
              Your decisions are saved and remembered. The blacksmith you
              spared on day 3 may return on day 14 — as friend, or as foe.
            </li>
            <li>
              <span className="font-semibold text-foreground">
                Roll the dice.
              </span>{" "}
              Combat and skill checks use a custom d20 system. Fortune
              favours the bold, but a clever plan can outdo a lucky roll.
            </li>
            <li>
              <span className="font-semibold text-foreground">
                One story, many paths.
              </span>{" "}
              Certain turning points are fixed — but how you reach them, and
              what you carry, is yours alone.
            </li>
          </ol>
        </section>

        <section className="px-6 py-24 max-w-3xl mx-auto border-t border-foreground/10">
          <h2 className="text-2xl font-semibold mb-6 text-ember">
            When can I play?
          </h2>
          <p className="text-foreground/80 leading-relaxed">
            The first chapter opens on{" "}
            <span className="font-semibold text-foreground">
              December 1st, 2026
            </span>
            . This year&apos;s run is for family and close friends — a small
            party of brave adventurers. If that&apos;s you, check back when the
            first snow falls.
          </p>
        </section>
      </main>

      <footer className="border-t border-foreground/10 px-6 py-8 text-center text-sm text-foreground/50">
        <p>Advent of Tales · A personal project</p>
      </footer>
    </div>
  );
}
