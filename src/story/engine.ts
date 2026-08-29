import type {
  ChoiceSpec,
  Effects,
  GameState,
  ResolvedScene,
  Scene,
  Story,
} from "./types";

function hasAll(flags: string[], required?: string[]): boolean {
  if (!required) return true;
  return required.every((flag) => flags.includes(flag));
}

function hasNone(flags: string[], forbidden?: string[]): boolean {
  if (!forbidden) return true;
  return forbidden.every((flag) => !flags.includes(flag));
}

function conditionsMet(
  flags: string[],
  requires?: string[],
  without?: string[],
): boolean {
  return hasAll(flags, requires) && hasNone(flags, without);
}

export function applyEffects(state: GameState, effects?: Effects): GameState {
  if (!effects) return state;
  const flags = new Set(state.flags);
  effects.set?.forEach((flag) => flags.add(flag));
  effects.clear?.forEach((flag) => flags.delete(flag));
  return { ...state, flags: [...flags] };
}

function getScene(story: Story, sceneId: string): Scene {
  const scene = story.scenes.find((s) => s.id === sceneId);
  if (!scene) {
    throw new Error(`Scene not found: "${sceneId}" in story "${story.id}"`);
  }
  return scene;
}

function visibleChoices(scene: Scene, flags: string[]): ChoiceSpec[] {
  return (scene.choices ?? []).filter((choice) =>
    conditionsMet(flags, choice.requires, choice.without),
  );
}

function enterScene(story: Story, state: GameState, sceneId: string): GameState {
  const scene = getScene(story, sceneId);
  const entered: GameState = {
    ...state,
    currentSceneId: sceneId,
    visitedScenes: [...state.visitedScenes, sceneId],
  };
  return applyEffects(entered, scene.effects);
}

export function startStory(story: Story): GameState {
  const start = getScene(story, story.startSceneId);
  const state: GameState = {
    storyId: story.id,
    currentSceneId: story.startSceneId,
    currentDay: start.day,
    flags: [],
    visitedScenes: [],
    choiceLog: [],
  };
  return enterScene(story, state, story.startSceneId);
}

export function resolveScene(story: Story, state: GameState): ResolvedScene {
  const scene = getScene(story, state.currentSceneId);
  const paragraphs = scene.text
    .filter((entry) =>
      typeof entry === "string"
        ? true
        : conditionsMet(state.flags, entry.requires, entry.without),
    )
    .map((entry) => (typeof entry === "string" ? entry : entry.text));
  const choices = visibleChoices(scene, state.flags).map((choice) => ({
    text: choice.text,
    kind: choice.kind ?? "decision",
  }));
  return {
    sceneId: scene.id,
    arc: scene.arc,
    title: scene.title,
    paragraphs,
    choices,
    endsDay: scene.endsDay ?? false,
    endsStory: scene.endsStory ?? false,
  };
}

export function choose(story: Story, state: GameState, index: number): GameState {
  const scene = getScene(story, state.currentSceneId);
  const choice = visibleChoices(scene, state.flags)[index];
  if (!choice) {
    throw new Error(`No visible choice ${index} in scene "${scene.id}"`);
  }
  const afterChoice = applyEffects(state, choice.effects);
  const withLog: GameState = {
    ...afterChoice,
    choiceLog: [...afterChoice.choiceLog, choice.text],
  };
  return enterScene(story, withLog, choice.next);
}

export function startNextDay(story: Story, state: GameState): GameState {
  const nextDay = state.currentDay + 1;
  const entry = story.scenes.find(
    (scene) =>
      scene.startOfDay &&
      scene.day === nextDay &&
      conditionsMet(state.flags, scene.requires, scene.without),
  );
  if (!entry) {
    throw new Error(`No entry scene for day ${nextDay} in story "${story.id}"`);
  }
  return {
    ...enterScene(story, state, entry.id),
    currentDay: nextDay,
  };
}

export function validateStory(story: Story): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();

  for (const scene of story.scenes) {
    if (ids.has(scene.id)) {
      errors.push(`Duplicate scene id: "${scene.id}"`);
    }
    ids.add(scene.id);
  }

  if (!story.scenes.some((scene) => scene.id === story.startSceneId)) {
    errors.push(`startSceneId not found: "${story.startSceneId}"`);
  }

  for (const scene of story.scenes) {
    for (const choice of scene.choices ?? []) {
      if (!ids.has(choice.next)) {
        errors.push(
          `Scene "${scene.id}" links to unknown scene: "${choice.next}"`,
        );
      }
      if (choice.kind && choice.kind !== "decision" && !choice.check) {
        errors.push(
          `Scene "${scene.id}" has a "${choice.kind}" choice without check data`,
        );
      }
    }
    if (scene.endsDay && (scene.choices ?? []).length > 0) {
      errors.push(
        `Scene "${scene.id}" ends the day but still has choices`,
      );
    }
    if (scene.text.length === 0) {
      errors.push(`Scene "${scene.id}" has no text`);
    }
  }

  return errors;
}
