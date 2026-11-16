export const FPS = 30;
export const DURATION = 1890; // 63s @ 30fps

// Scene windows [startFrame, endFrame) — absolute timeline
export const SCENES = {
  s1: [0, 210],
  s2: [210, 630],
  s3: [630, 915],
  s4: [915, 1410],
  s5: [1410, 1890],
} as const;

export type Speaker = "HT" | "TEACHER" | "ADMIN" | "PARENT" | "CALM";

export const SPEAKER_STYLE: Record<
  Speaker,
  {label: string; color: string; text: string}
> = {
  HT: {label: "HEADTEACHER", color: "#103741", text: "#ffffff"},
  TEACHER: {label: "TEACHER", color: "#e8912d", text: "#ffffff"},
  ADMIN: {label: "ADMIN", color: "#b04d7a", text: "#ffffff"},
  PARENT: {label: "PARENT", color: "#5a4fcf", text: "#ffffff"},
  CALM: {label: "MR. KIPROP", color: "#2e9e6b", text: "#ffffff"},
};

export interface Line {
  file: string;
  start: number; // seconds
  dur: number;
  speaker: Speaker;
  text: string;
}

export const LINES: Line[] = [
  {file: "t1_records", start: 2.0, dur: 5.592, speaker: "TEACHER", text: "Sir! The parents' meeting starts in ten minutes — I need the records NOW!"},
  {file: "p1_fees", start: 4.3, dur: 3.912, speaker: "PARENT", text: "I paid on M-Pesa on Monday — how can you not find the receipt?!"},
  {file: "a1_reports", start: 5.9, dur: 4.704, speaker: "ADMIN", text: "Sir! The education office wants the returns by Friday!"},
  {file: "t2_where", start: 7.8, dur: 3.624, speaker: "TEACHER", text: "Sir! Which file did you put in the drawer?!"},
  {file: "p2_answer", start: 11.6, dur: 3.528, speaker: "PARENT", text: "Hello? HELLO? I can see you sitting there!"},
  {file: "h1_onetime", start: 13.3, dur: 4.728, speaker: "HT", text: "Yes—no—fees—records—ONE AT A TIME! PLEASE!"},
  {file: "h2_feellike", start: 17.2, dur: 3.648, speaker: "HT", text: "Is running a school... supposed to feel like this?"},
  {file: "c1_hardway", start: 21.6, dur: 2.904, speaker: "CALM", text: "Sir... why are you doing all this the hard way?"},
  {file: "h3_whatmean", start: 24.9, dur: 1.8, speaker: "HT", text: "What do you mean?"},
  {file: "c2_tried", start: 27.1, dur: 2.28, speaker: "CALM", text: "Have you tried... MwalimuEase?"},
  {file: "h4_mwaliwhat", start: 29.8, dur: 1.896, speaker: "HT", text: "Mwali... what?"},
  {file: "t3_wait", start: 32.8, dur: 3.888, speaker: "TEACHER", text: "Wait — ALL of it? In one place?"},
  {file: "c3_idea", start: 37.2, dur: 4.8, speaker: "CALM", text: "One dashboard. Marks, fees, timetables — everything's in there."},
  {file: "h5_suffering", start: 44.1, dur: 2.664, speaker: "HT", text: "And I've been suffering all this time?"},
  {file: "c4_unfortunately", start: 46.9, dur: 1.512, speaker: "CALM", text: "Unfortunately, yes!"},
  {file: "t4_problem", start: 49.0, dur: 3.864, speaker: "TEACHER", text: "Sir! The printer has jammed — AGAIN!"},
  {file: "h6_tried", start: 52.6, dur: 2.448, speaker: "HT", text: "Have you tried MwalimuEase?"},
  {file: "p3_fees", start: 55.6, dur: 2.856, speaker: "PARENT", text: "Headteacher! About my child's fees—"},
  {file: "h7_tried", start: 58.9, dur: 2.664, speaker: "HT", text: "Have you tried MwalimuEase?"},
];

export interface Sfx {
  file: string;
  start: number; // seconds
  volume?: number;
}

export const SFX: Sfx[] = [
  // Scene 1 — single ring, then entrances
  {file: "sfx_ring", start: 0.35, volume: 0.55},
  {file: "sfx_whoosh", start: 1.9, volume: 0.6},
  {file: "sfx_pop", start: 4.15, volume: 0.5},
  {file: "sfx_whoosh", start: 5.8, volume: 0.6},
  {file: "sfx_thump", start: 6.3, volume: 0.6},
  {file: "sfx_pop", start: 6.55, volume: 0.55},
  // Scene 2 — chaos
  {file: "sfx_ring", start: 7.4, volume: 0.6},
  {file: "sfx_whoosh", start: 7.7, volume: 0.55},
  {file: "sfx_swoosh", start: 9.9, volume: 0.5}, // paper avalanche
  {file: "sfx_scratch", start: 10.4, volume: 0.4},
  {file: "sfx_ring", start: 11.4, volume: 0.6},
  {file: "sfx_thump", start: 12.2, volume: 0.6},
  {file: "sfx_pop", start: 13.2, volume: 1},
  {file: "sfx_scratch", start: 16.55, volume: 1},
  {file: "sfx_pop", start: 19.6, volume: 0.5},
  // Scene 3
  {file: "sfx_whoosh", start: 20.9, volume: 0.6},
  {file: "sfx_ding", start: 28.9, volume: 0.6},
  {file: "sfx_boing", start: 29.75, volume: 0.6},
  {file: "sfx_riser", start: 30.4, volume: 0.5},
  // Scene 4 — papers fly away
  {file: "sfx_swoosh", start: 30.9, volume: 0.55},
  {file: "sfx_whoosh", start: 31.6, volume: 0.5},
  {file: "sfx_whoosh", start: 32.3, volume: 0.5},
  {file: "sfx_ding", start: 31.8, volume: 0.6},
  {file: "sfx_pop", start: 34.8, volume: 0.5},
  {file: "sfx_pop", start: 37.7, volume: 0.5},
  {file: "sfx_pop", start: 40.5, volume: 0.5},
  {file: "sfx_pop", start: 43.3, volume: 0.5},
  {file: "sfx_wahwah", start: 44.9, volume: 0.55},
  // Scene 5
  {file: "sfx_swoosh", start: 47.0, volume: 0.5},
  {file: "sfx_whoosh", start: 48.9, volume: 0.6},
  {file: "sfx_ding", start: 52.5, volume: 0.55},
  {file: "sfx_laugh", start: 55.4, volume: 0.55},
  {file: "sfx_ring2", start: 55.5, volume: 0.5}, // parent calls back — final gag
  {file: "sfx_pop", start: 55.6, volume: 0.4},
  {file: "sfx_pop", start: 55.95, volume: 0.4},
  {file: "sfx_pop", start: 56.3, volume: 0.4},
  {file: "sfx_swoosh", start: 56.4, volume: 0.55},
  {file: "sfx_ta_da", start: 56.8, volume: 0.55},
];
