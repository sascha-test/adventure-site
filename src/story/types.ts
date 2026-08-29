export interface Effects {
  set?: string[];
  clear?: string[];
}

export interface ChoiceSpec {
  text: string;
  next: string;
  kind?: "decision" | "check" | "fight";
  requires?: string[];
  without?: string[];
  effects?: Effects;
  check?: {
    stat: string;
    difficulty: number;
  };
}

export type SceneText = string | {
  requires?: string[];
  without?: string[];
  text: string;
};

export interface Scene {
  id: string;
  day: number;
  startOfDay?: boolean;
  requires?: string[];
  without?: string[];
  arc?: string;
  title?: string;
  text: SceneText[];
  choices?: ChoiceSpec[];
  effects?: Effects;
  endsDay?: boolean;
  endsStory?: boolean;
}

export interface Story {
  id: string;
  title: string;
  startSceneId: string;
  scenes: Scene[];
}

export interface GameState {
  storyId: string;
  currentSceneId: string;
  currentDay: number;
  flags: string[];
  visitedScenes: string[];
  choiceLog: string[];
}

export interface ResolvedChoice {
  text: string;
  kind: "decision" | "check" | "fight";
}

export interface ResolvedScene {
  sceneId: string;
  arc?: string;
  title?: string;
  paragraphs: string[];
  choices: ResolvedChoice[];
  endsDay: boolean;
  endsStory: boolean;
}
