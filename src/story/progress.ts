import type { SupabaseClient } from "@supabase/supabase-js";
import { isGameState, startStory } from "./engine";
import type { GameState, Story } from "./types";

export async function loadSavedState(
  supabase: SupabaseClient,
  userId: string,
): Promise<unknown> {
  const { data } = await supabase
    .from("game_progress")
    .select("state")
    .eq("user_id", userId)
    .maybeSingle();
  return data?.state ?? null;
}

export function resolveInitialState(story: Story, saved: unknown): GameState {
  if (
    isGameState(saved) &&
    saved.storyId === story.id &&
    story.scenes.some((scene) => scene.id === saved.currentSceneId)
  ) {
    return saved;
  }
  return startStory(story);
}

export async function saveState(
  supabase: SupabaseClient,
  userId: string,
  state: GameState,
): Promise<boolean> {
  const { error } = await supabase.from("game_progress").upsert(
    {
      user_id: userId,
      state,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" },
  );
  if (error) {
    console.error("Failed to save progress:", error.message);
  }
  return !error;
}
