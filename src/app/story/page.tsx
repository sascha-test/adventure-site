import type { Metadata } from "next";
import StoryPlayer from "@/components/story-player";
import StoryWaiting from "@/components/story-waiting";
import { validateStory } from "@/story/engine";
import { demoStory } from "@/story/demo-story";
import {
  filterStoryForDay,
  getUnlockedDay,
  maxStoryDay,
} from "@/story/gating";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "The Whispers of Havenmoor — Advent of Tales",
  description:
    "A five-day demo of the Advent of Tales story engine: choices, flags, and paths that remember.",
};

export default async function StoryPage({
  searchParams,
}: PageProps<"/story">) {
  const params = await searchParams;

  const errors = validateStory(demoStory);
  if (errors.length > 0) {
    throw new Error(`Invalid story data:\n${errors.join("\n")}`);
  }

  const previewToken = process.env.STORY_PREVIEW_TOKEN;
  const previewValue =
    typeof params.preview === "string" ? params.preview : undefined;
  const fullAccess = Boolean(
    previewToken && previewValue && previewValue === previewToken,
  );

  const now = new Date();
  const unlockedDay = fullAccess
    ? maxStoryDay(demoStory)
    : getUnlockedDay(demoStory, now);

  if (unlockedDay < 1) {
    return <StoryWaiting now={now} />;
  }

  return (
    <StoryPlayer
      story={filterStoryForDay(demoStory, unlockedDay)}
      unlockedDay={unlockedDay}
    />
  );
}
