"use server";

import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { demoStory } from "./demo-story";
import { choose, resolveScene, startNextDay, startStory, validateStory } from "./engine";
import { filterStoryForDay, getUnlockedDay, maxStoryDay } from "./gating";
import { loadSavedState, resolveInitialState, saveState } from "./progress";
import type { ActionResult, GameState, Story, TurnResult } from "./types";

interface Session {
  supabase: SupabaseClient;
  userId: string;
  story: Story;
  unlockedDay: number;
  state: GameState;
}

function previewValid(preview: string | undefined): boolean {
  const token = process.env.STORY_PREVIEW_TOKEN;
  return Boolean(token && preview && preview === token);
}

async function loadSession(
  preview: string | undefined,
): Promise<Session | { error: string }> {
  const storyErrors = validateStory(demoStory);
  if (storyErrors.length > 0) {
    return { error: "The story data is broken — sorry, please try again later." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Your session has expired — please log in again." };
  }

  const unlockedDay = previewValid(preview)
    ? maxStoryDay(demoStory)
    : getUnlockedDay(demoStory, new Date());

  if (unlockedDay < 1) {
    return { error: "The first door has not opened yet." };
  }

  const story = filterStoryForDay(demoStory, unlockedDay);
  const saved = await loadSavedState(supabase, user.id);

  return {
    supabase,
    userId: user.id,
    story,
    unlockedDay,
    state: resolveInitialState(story, saved),
  };
}

function turnResult(story: Story, state: GameState, unlockedDay: number): TurnResult {
  return {
    scene: resolveScene(story, state),
    state,
    nextDayUnlocked: state.currentDay < unlockedDay,
  };
}

async function commit(session: Session, next: GameState): Promise<ActionResult> {
  const saved = await saveState(session.supabase, session.userId, next);
  if (!saved) {
    return { ok: false, error: "Could not save your progress — please try again." };
  }
  return { ok: true, ...turnResult(session.story, next, session.unlockedDay) };
}

export async function makeChoice(
  choiceIndex: number,
  preview?: string,
): Promise<ActionResult> {
  const session = await loadSession(preview);
  if ("error" in session) {
    return { ok: false, error: session.error };
  }

  let next: GameState;
  try {
    next = choose(session.story, session.state, choiceIndex);
  } catch {
    return {
      ok: false,
      error: "That choice is no longer available — please reload the page.",
    };
  }

  return commit(session, next);
}

export async function beginNextDay(preview?: string): Promise<ActionResult> {
  const session = await loadSession(preview);
  if ("error" in session) {
    return { ok: false, error: session.error };
  }

  if (session.state.currentDay + 1 > session.unlockedDay) {
    return {
      ok: false,
      error: "The next door is still sealed — come back tomorrow.",
    };
  }

  let next: GameState;
  try {
    next = startNextDay(session.story, session.state);
  } catch {
    return {
      ok: false,
      error: "Could not begin the next day — please reload the page.",
    };
  }

  return commit(session, next);
}

export async function restartStory(preview?: string): Promise<ActionResult> {
  const session = await loadSession(preview);
  if ("error" in session) {
    return { ok: false, error: session.error };
  }

  return commit(session, startStory(session.story));
}
