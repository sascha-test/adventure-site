import type { Metadata } from "next";
import StoryPlayer from "@/components/story-player";
import { validateStory } from "@/story/engine";
import { demoStory } from "@/story/demo-story";

const errors = validateStory(demoStory);
if (errors.length > 0) {
  throw new Error(`Invalid story data:\n${errors.join("\n")}`);
}

export const metadata: Metadata = {
  title: "The Whispers of Havenmoor — Advent of Tales",
  description:
    "A five-day demo of the Advent of Tales story engine: choices, flags, and paths that remember.",
};

export default function StoryPage() {
  return <StoryPlayer story={demoStory} />;
}
