import type { Story } from "./types";

export const demoStory: Story = {
  id: "demo",
  title: "The Whispers of Havenmoor",
  startSceneId: "d1_arrival",
  scenes: [
    {
      id: "d1_arrival",
      day: 1,
      startOfDay: true,
      title: "The Road to Havenmoor",
      text: [
        "Frost clings to your cloak as the village of Havenmoor rises out of the falling snow. Chimney smoke hangs low over the rooftops, and somewhere a bell tolls the third hour of dusk.",
        "Strange: the village gate stands wide open, and no guard is in sight. Villagers hurry past you without meeting your eyes.",
      ],
      choices: [
        {
          text: "Ask the blacksmith about the open gate",
          next: "d1_smith",
          effects: { set: ["knows_gate_rumor"] },
        },
        {
          text: "Ask the old priestess about the open gate",
          next: "d1_priestess",
          effects: { set: ["knows_old_warning"] },
        },
      ],
    },
    {
      id: "d1_smith",
      day: 1,
      title: "The Blacksmith's Worry",
      text: [
        "The blacksmith wipes soot from her hands and glances at the open gate behind you.",
        "\"The watchmen went into the Whispering Pines three nights ago,\" she says quietly. \"None of them came back. The reeve forbade anyone to speak of it. But you're not from here, are you?\"",
      ],
      choices: [
        { text: "Thank her and head to the inn", next: "d1_inn" },
      ],
    },
    {
      id: "d1_priestess",
      day: 1,
      title: "The Old Warning",
      text: [
        "The priestess closes her prayer book and studies your face for a long moment.",
        "\"Twelve winters ago, the gate was left open just like this,\" she says. \"The cold that came through it took nine souls before it slept again. It begins with whispers in the pines. Child, if you hear them tonight — do not answer.\"",
      ],
      choices: [
        { text: "Thank her and head to the inn", next: "d1_inn" },
      ],
    },
    {
      id: "d1_inn",
      day: 1,
      title: "The Ember Hearth",
      text: [
        "The inn is warm and loud with talk that stops the moment you enter. You take a table near the hearth, where the embers glow the same orange as the wine in your cup.",
        {
          requires: ["knows_gate_rumor"],
          text: "You keep thinking about the blacksmith's words: three watchmen, vanished into the pines.",
        },
        {
          requires: ["knows_old_warning"],
          text: "The priestess's warning circles your thoughts like a raven: if you hear whispers tonight, do not answer.",
        },
        "The night grows old. Through the window you can see the open gate, pale in the moonlight.",
      ],
      choices: [
        {
          text: "Stay up and watch the road from your window",
          next: "d1_night",
          effects: { set: ["night_watch"] },
        },
        {
          text: "Bolt your door and go to bed early",
          next: "d1_night",
        },
      ],
    },
    {
      id: "d1_night",
      day: 1,
      title: "Whispers in the Dark",
      text: [
        {
          requires: ["night_watch"],
          text: "Hours pass. Then, at midnight, you see it: a tall figure gliding through the open gate without leaving footprints in the snow. It pauses at the well in the square, as if listening. Before you can blink, it is gone.",
        },
        {
          text: "You sleep restlessly, and somewhere between dreams and waking, you could swear the wind carries words: a whisper that curls around the shutters like smoke.",
        },
        "Morning cannot come soon enough.",
      ],
      endsDay: true,
    },
    {
      id: "d2_tracks",
      day: 2,
      startOfDay: true,
      title: "Tracks in the Snow",
      text: [
        "You wake to hammering at the inn's door. Half the village stands in the square: during the night, the well has frozen solid — in mid-thaw, and the frost marks on its stones form spirals no wind could draw.",
        "At the open gate you find tracks pressed deep into the snow, leading toward the Whispering Pines. They begin with feet. They end with something wider, drag-marked, and wrong.",
        {
          requires: ["knows_old_warning"],
          text: "The priestess appears at your shoulder and presses a sprig of dried emberblossom into your palm. \"If you must follow them,\" she whispers, \"let this be your answer, not your voice.\"",
        },
      ],
      choices: [
        {
          text: "Follow the tracks into the Whispering Pines",
          next: "d2_pines",
          effects: { set: ["followed_tracks"] },
        },
        {
          text: "Bring the tracks to the village reeve first",
          next: "d2_reeve",
          effects: { set: ["reported_tracks"] },
        },
      ],
    },
    {
      id: "d2_pines",
      day: 2,
      title: "The Whispering Pines",
      text: [
        "The pines close over your head like a roof of black needles. Ten steps in, the village sounds are gone. Twenty steps in, the whispers begin — your own name, woven between the branches.",
        "You keep your mouth shut and your eyes on the tracks. They lead downhill, toward a split in the valley: on one side, steam rises from vents in the rocks below; on the other, a moss-green ridge climbs into the mist.",
        "You mark the place well. This is where you must return.",
      ],
      choices: [
        { text: "Head back before nightfall", next: "d2_campfire" },
      ],
    },
    {
      id: "d2_reeve",
      day: 2,
      title: "The Reeve's Bargain",
      text: [
        "Reeve Aldwin studies the tracks for a long time. \"Same as the ones three nights past,\" he mutters. \"Before I lost my watchmen to them.\"",
        "He deputizes you on the spot — a copper badge, cold in your hand. \"You found them, you walk point tonight,\" he says. \"My hunters will follow at your back. If we don't act now, Havenmoor won't see another dawn of thaw.\"",
        "By dusk you stand at the edge of the pines with the hunters behind you. The tracks lead downhill, toward a split in the valley: on one side, steam rises from vents in the rocks below; on the other, a moss-green ridge climbs into the mist.",
      ],
      choices: [
        { text: "Make camp at the treeline to rest", next: "d2_campfire" },
      ],
    },
    {
      id: "d2_campfire",
      day: 2,
      title: "Eyes Between the Trees",
      text: [
        "The campfire burns low and orange. Somewhere beyond its light, the whispers have stopped — and that is worse.",
        "Between the pines, dozens of pale eyes open, all at once, all watching you.",
        "None of them blink. None of them come closer. Not yet.",
      ],
      endsDay: true,
    },
    {
      id: "d3_hub",
      day: 3,
      startOfDay: true,
      title: "The Valley Splits",
      text: [
        "Dawn finds you at the split in the valley, alone with your decision. The eyes withdrew before first light, but their message was clear enough: what they guard waits below.",
        "Two paths reveal themselves in the morning fog.",
      ],
      choices: [
        {
          text: "Descend into the steaming Cinder Vale",
          next: "cinder_1",
          without: ["arc_cinder_done"],
        },
        {
          text: "Climb the green ridge of Mosspeak",
          next: "moss_1",
          without: ["arc_moss_done"],
        },
      ],
    },
    {
      id: "cinder_1",
      day: 3,
      arc: "Cinder Vale",
      title: "Into the Steam",
      text: [
        "Heat rises around you as the vent-mouths breathe sulfur into the cold air. The stones underfoot are warm as bread, and black flowers grow in the cracks, turning to watch you pass.",
        "In a hollow of rock you find a forge — ancient, immaculate, its coals still alive after what must be centuries. On the anvil lies half of a round medallion, glowing ember-orange, humming faintly when you touch it.",
        "You have barely lifted it when the ground shudders. Something below the vale is turning over in its sleep.",
      ],
      choices: [
        { text: "Take the half-medallion and climb out fast", next: "cinder_2" },
      ],
    },
    {
      id: "cinder_2",
      day: 3,
      arc: "Cinder Vale",
      title: "The Sleeping Below",
      text: [
        "You scramble up the scree slope as steam billows behind you. At the rim, you look back once: in the chasm below, the roof of something enormous — a shoulder, or a curled wing — shifts and settles again.",
        "The half-medallion is warm in your pocket, like a held hand.",
        "Whatever the eyes in the pines are guarding — this was a piece of its key.",
      ],
      choices: [
        {
          text: "Return to the valley split",
          next: "hub_return",
          effects: { set: ["arc_cinder_done"] },
        },
      ],
    },
    {
      id: "moss_1",
      day: 3,
      arc: "Mosspeak",
      title: "The Green Ridge",
      text: [
        "The climb is steep but strangely gentle: the moss cushions every step and the air tastes of rain and old paper. Wind chimes of bone and wood hang from the branches — left as offerings, the priestess would say.",
        "Halfway up, you find a hermit's hut carved into a living pine. Inside: a desk, a journal, and a cold teacup. The last entry reads: \"The door in the hollow takes two keys. One of ember, one of moss. I have found the moss half. If you read this, the mountain chose me poorly.\"",
        "Beneath the desk, wrapped in oilcloth, lies the second half of a round medallion — deep green, humming faintly when you touch it.",
      ],
      choices: [
        { text: "Take the half-medallion and climb higher", next: "moss_2" },
      ],
    },
    {
      id: "moss_2",
      day: 3,
      arc: "Mosspeak",
      title: "The Hollow Door",
      text: [
        "The ridge ends at a wall of green stone, and in the stone, a door: perfectly round, its face split down the middle — a seam shaped exactly like two half-medallions joined.",
        "The green half in your hand flares once, eager as a hound at a door. But the seam stays shut. One key is not enough.",
        "As you turn to go, the door seems to sigh. You mark the way carefully. You will need to come back.",
      ],
      choices: [
        {
          text: "Return to the valley split",
          next: "hub_return",
          effects: { set: ["arc_moss_done"] },
        },
      ],
    },
    {
      id: "hub_return",
      day: 3,
      title: "Back at the Split",
      text: [
        "You return to the valley split as the light grows long. The fog has lifted, and far above the pines, the first star is out — the only eye in Havenmoor that means you no harm.",
        {
          requires: ["arc_cinder_done"],
          text: "The ember half-medallion keeps its steady warmth against your hip.",
        },
        {
          requires: ["arc_moss_done"],
          text: "The moss half-medallion is cool and quiet now, patient as the stone it came from.",
        },
        "Sleep comes at last, heavy and dreamless.",
      ],
      endsDay: true,
    },
    {
      id: "d4_hub",
      day: 4,
      startOfDay: true,
      title: "One More Day Before the Door",
      text: [
        "The morning is impossibly bright, the snow glittering as if nothing were wrong with Havenmoor at all.",
        "You know better now. The hollow door waits, and you hold a key toward it. The valley splits below — but so does the choice: there is still time to see what else the mountain keeps.",
      ],
      choices: [
        {
          text: "Descend into the steaming Cinder Vale",
          next: "cinder_1",
          without: ["arc_cinder_done"],
        },
        {
          text: "Climb the green ridge of Mosspeak",
          next: "moss_1",
          without: ["arc_moss_done"],
        },
        {
          text: "Rest and study what you have found",
          next: "d4_rest",
        },
      ],
    },
    {
      id: "d4_rest",
      day: 4,
      title: "A Quiet Day",
      text: [
        "You spend the day at the campfire, turning your findings over in mind and hand. Whatever waits behind the round door, it has waited this long; it will wait one more night.",
        "The whispers in the pines, when they come at dusk, sound almost disappointed.",
        "You answer them with silence, and they let you keep it.",
      ],
      endsDay: true,
    },
    {
      id: "d5_sanctum",
      day: 5,
      startOfDay: true,
      title: "The Hollow Sanctum",
      text: [
        "Before dawn you climb Mosspeak one last time. The round door stands exactly as you left it, seam splitting its stone face like a closed eye.",
        {
          requires: ["arc_cinder_done"],
          text: "The ember half slips from your pocket on its own, warm and eager, and settles into the left side of the seam.",
        },
        {
          requires: ["arc_moss_done"],
          text: "The moss half follows, cool and certain, sliding home into the right side of the seam.",
        },
        {
          requires: ["arc_cinder_done", "arc_moss_done"],
          text: "Where ember and moss meet, the seam flares — and the door, recognizing both its keys, swings inward without a sound.",
        },
        {
          requires: ["arc_cinder_done"],
          without: ["arc_moss_done"],
          text: "The ember half glows in the left side of the seam — but the right side stays empty and dark, and the door holds shut. You will need both keys, and you will have to come back for the moss.",
        },
        {
          requires: ["arc_moss_done"],
          without: ["arc_cinder_done"],
          text: "The moss half rests in the right side of the seam — but the left side waits, empty, for a warmth you have not yet found. The door holds shut.",
        },
        "Beyond the door, a hollow sanctum breathes cold. In its center: a well, twin to the one in Havenmoor's square, its rim carved with spirals. From its depths, the whisper rises — and now, at last, you understand the words: \"Free me, or seal me. Choose.\"",
      ],
      choices: [
        {
          text: "Seal the well with your own hands",
          next: "d5_ending",
          effects: { set: ["sealed_alone"] },
        },
        {
          text: "Descend to Havenmoor and call for help",
          next: "d5_ending",
          effects: { set: ["called_for_help"] },
        },
      ],
    },
    {
      id: "d5_ending",
      day: 5,
      title: "What the Well Remembers",
      text: [
        {
          requires: ["sealed_alone"],
          text: "You work alone until your hands burn, pressing ember and moss into the spirals of the rim until the whisper thins, falters, and sleeps. The cold recedes from the sanctum like a tide going out. You climb down to Havenmoor in the dark, carrying a secret no one will ever fully believe — and that is how it should be.",
        },
        {
          requires: ["called_for_help"],
          text: "You rouse the village, and they come — blacksmith, priestess, reeve, hunters with torches, all of them. Together you seal the well as the sun rises, and Havenmoor's bell tolls for a winter that almost was. By nightfall they are already singing of it in the inn. You smile into your cup. Some stories belong to everyone.",
        },
        "One thing is certain: for the first time since you arrived, the gate of Havenmoor closes.",
      ],
      endsDay: true,
      endsStory: true,
    },
  ],
};
