import type { Story } from "./types";

export const STORY_TIMEZONE = "Europe/Berlin";
export const STORY_START_DATE = "2026-12-01";

function calendarDate(now: Date, timeZone: string): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

export function maxStoryDay(story: Story): number {
  return Math.max(...story.scenes.map((scene) => scene.day));
}

export function getUnlockedDay(story: Story, now: Date): number {
  const today = calendarDate(now, STORY_TIMEZONE);
  const daysSinceStart = Math.round(
    (Date.parse(today) - Date.parse(STORY_START_DATE)) / 86_400_000,
  );
  return Math.min(Math.max(daysSinceStart + 1, 0), maxStoryDay(story));
}

export function daysUntilStart(now: Date): number {
  const today = calendarDate(now, STORY_TIMEZONE);
  const days = Math.round(
    (Date.parse(STORY_START_DATE) - Date.parse(today)) / 86_400_000,
  );
  return Math.max(days, 0);
}

export function filterStoryForDay(story: Story, unlockedDay: number): Story {
  return {
    ...story,
    scenes: story.scenes.filter((scene) => scene.day <= unlockedDay),
  };
}
