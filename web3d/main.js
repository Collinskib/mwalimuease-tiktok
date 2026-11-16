import * as THREE from "three";

/* ============================================================
   MWALIMUEASE 3D SKIT — three.js + GSAP
   Same 63s script/timing as the Remotion version.
   ============================================================ */

const LINES = [
  {t: 2.0,  d: 5.592, who: "TEACHER", col: "#e8912d", text: "Sir! The parents' meeting starts in ten minutes — I need the records NOW!"},
  {t: 4.3,  d: 3.912, who: "PARENT",  col: "#5a4fcf", text: "I paid on M-Pesa on Monday — how can you not find the receipt?!"},
  {t: 5.9,  d: 4.704, who: "ADMIN",   col: "#b04d7a", text: "Sir! The education office wants the returns by Friday!"},
  {t: 7.8,  d: 3.624, who: "TEACHER", col: "#e8912d", text: "Sir! Which file did you put in the drawer?!"},
  {t: 11.6, d: 3.528, who: "PARENT",  col: "#5a4fcf", text: "Hello? HELLO? I can see you sitting there!"},
  {t: 13.3, d: 4.728, who: "HEADTEACHER", col: "#ffffff", text: "Yes—no—fees—records—ONE AT A TIME! PLEASE!"},
  {t: 17.2, d: 3.648, who: "HEADTEACHER", col: "#ffffff", text: "Is running a school... supposed to feel like this?"},
  {t: 21.6, d: 2.904, who: "MR. KIPROP", col: "#7ee0b8", text: "Sir... why are you doing all this the hard way?"},
  {t: 24.9, d: 1.8,   who: "HEADTEACHER", col: "#ffffff", text: "What do you mean?"},
  {t: 27.1, d: 2.28,  who: "MR. KIPROP", col: "#7ee0b8", text: "Have you tried... MwalimuEase?"},
  {t: 29.8, d: 1.896, who: "HEADTEACHER", col: "#ffffff", text: "Mwali... what?"},
  {t: 32.8, d: 3.888, who: "TEACHER", col: "#e8912d", text: "Wait — ALL of it? In one place?"},
  {t: 37.2, d: 4.8,   who: "MR. KIPROP", col: "#7ee0b8", text: "One dashboard. Marks, fees, timetables — everything's in there."},
  {t: 44.1, d: 2.664, who: "HEADTEACHER", col: "#ffffff", text: "And I've been suffering all this time?"},
  {t: 46.9, d: 1.512, who: "MR. KIPROP", col: "#7ee0b8", text: "Unfortunately, yes!"},
  {t: 49.0, d: 3.864, who: "TEACHER", col: "#e8912d", text: "Sir! The printer has jammed — AGAIN!"},
  {t: 52.6, d: 2.448, who: "HEADTEACHER", col: "#ffffff", text: "Have you tried MwalimuEase?"},
  {t: 55.6, d: 2.856, who: "PARENT",  col: "#5a4fcf", text: "Headteacher! About my child's fees—"},
  {t: 58.9, d: 2.664, who: "HEADTEACHER", col: "#ffffff", text: "Have you tried MwalimuEase?"},
];

const SFX = [
  ["sfx_ring", 0.35, 0.55], ["sfx_whoosh", 1.9, 0.6], ["sfx_pop", 4.15, 0.5],
  ["sfx_whoosh", 5.8, 0.6], ["sfx_thump", 6.3, 0.6], ["sfx_pop", 6.55, 0.55],
  ["sfx_ring", 7.4, 0.6], ["sfx_whoosh", 7.7, 0.55], ["sfx_swoosh", 9.9, 0.5],
  ["sfx_scratch", 10.4, 0.4], ["sfx_ring", 11.4, 0.6], ["sfx_thump", 12.2, 0.6],
  ["sfx_pop", 13.2, 1.0], ["sfx_scratch", 16.55, 1.0], ["sfx_pop", 19.6, 0.5],
  ["sfx_whoosh", 20.9, 0.6], ["sfx_ding", 28.9, 0.6], ["sfx_boing", 29.75, 0.6],
  ["sfx_riser", 30.4, 0.5], ["sfx_swoosh", 30.9, 0.55], ["sfx_whoosh", 31.6, 0.5],
  ["sfx_ding", 31.8, 0.6], ["sfx_pop", 34.8, 0.5], ["sfx_pop", 37.7, 0.5],
  ["sfx_pop", 40.5, 0.5], ["sfx_pop", 43.3, 0.5], ["sfx_wahwah", 44.9, 0.55],
  ["sfx_swoosh", 47.0, 0.5], ["sfx_whoosh", 48.9, 0.6], ["sfx_ding", 52.5, 0.55],
  ["sfx_laugh", 55.4, 0.55], ["sfx_ring2", 55.5, 0.5], ["sfx_pop", 55.6, 0.4],
  ["sfx_pop", 55.95, 0.4], ["sfx_pop", 56.3, 0.4], ["sfx_swoosh", 56.4, 0.55],
  ["sfx_ta_da", 56.8, 0.55],
];

const BUBBLES = [
  {t0: 2.05, t1: 6.8,  x: 48, y: 47, cls: "",     text: "Sir! Parents' meeting in 10 min — records NOW!"},
  {t0: 4.35, t1: 6.8,  x: 15, y: 14, cls: "",     text: "I paid on M-Pesa Monday — where's my receipt?!"},
  {t0: 5.95, t1: 6.85, x: 6,  y: 50, cls: "",     text: "Sir! Education office wants returns by FRIDAY!"},
  {t0: 7.85, t1: 11.5, x: 6,  y: 50, cls: "",     text: "Sir! Which file did you put in the drawer?!"},
  {t0: 11.7, t1: 13.2, x: 13, y: 17, cls: "",     text: "Hello? HELLO? I can see you sitting there!"},
  {t0: 13.3, t1: 16.6, x: 18, y: 30, cls: "gold", text: "ONE AT A TIME! PLEASE!"},
  {t0: 21.7, t1: 24.8, x: 38, y: 30, cls: "mint", text: "Sir... why are you doing all this the hard way?"},
  {t0: 24.9, t1: 27.0, x: 14, y: 32, cls: "",     text: "What do you mean?"},
  {t0: 27.1, t1: 29.7, x: 40, y: 28, cls: "mint", text: "Have you tried... MwalimuEase?"},
  {t0: 29.8, t1: 32.6, x: 14, y: 33, cls: "gold", text: "Mwali... what?"},
  {t0: 32.9, t1: 37.0, x: 7,  y: 46, cls: "",     text: "Wait — ALL of it? In ONE place?"},
  {t0: 37.3, t1: 43.8, x: 30, y: 46, cls: "mint", text: "One dashboard. Marks, fees, timetables — everything."},
  {t0: 44.2, t1: 46.8, x: 9,  y: 48, cls: "",     text: "And I've been suffering all this time?"},
  {t0: 49.1, t1: 52.4, x: 40, y: 36, cls: "",     text: "Sir! The printer has jammed — AGAIN!"},
  {t0: 52.6, t1: 55.3, x: 9,  y: 33, cls: "mint", text: "Have you tried MwalimuEase?"},
];

/* ============================ RENDERER ============================ */
const stage = document.getElementById("stage");
const canvas = document.getElementById("c3d");
const renderer = new THREE.WebGLRenderer({canvas, antialias: true});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf5efe0);
scene.fog = new THREE.Fog(0xf5efe0, 14, 26);

const camera = new THREE.PerspectiveCamera(50, 9 / 16, 0.1, 60);
const camTarget = new THREE.Object3D();
camTarget.position.set(0, 1.4, -1);
scene.add(camTarget);

function fitRenderer() {
  const w = stage.clientWidth, h = stage.clientHeight;
  renderer.setSize(w, h, false);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
fitRenderer();
addEventListener("resize", fitRenderer);

/* ============================ LIGHTS ============================ */
scene.add(new THREE.AmbientLight(0xffffff, 0.75));
const sun = new THREE.DirectionalLight(0xfff3dd, 1.15);
sun.position.set(4, 8, 6);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.left = -8; sun.shadow.camera.right = 8;
sun.shadow.camera.top = 8; sun.shadow.camera.bottom = -4;
sun.shadow.camera.far = 30;
scene.add(sun);
const fill = new THREE.DirectionalLight(0xbfe6f5, 0.3);
fill.position.set(-5, 4, 8);
scene.add(fill);

/* ============================ MATERIALS ============================ */
const M = {
  wall:  new THREE.MeshStandardMaterial({color: 0xf0e7d3, roughness: .95}),
  wallS: new THREE.MeshStandardMaterial({color: 0xe7dcc4, roughness: .95}),
  floor: new THREE.MeshStandardMaterial({color: 0xe0d5ba, roughness: .9}),
  wood:  new THREE.MeshStandardMaterial({color: 0x8a5a33, roughness: .8}),
  woodD: new THREE.MeshStandardMaterial({color: 0x6e4526, roughness: .8}),
  black: new THREE.MeshStandardMaterial({color: 0x1a1a1a, roughness: .6}),
  white: new THREE.MeshStandardMaterial({color: 0xffffff, roughness: .5}),
  paper: new THREE.MeshStandardMaterial({color: 0xffffff, roughness: .9}),
  red:   new THREE.MeshStandardMaterial({color: 0xc0392b, roughness: .5}),
  teal:  new THREE.MeshStandardMaterial({color: 0x4d9dbb, roughness: .6}),
  tealD: new THREE.MeshStandardMaterial({color: 0x103741, roughness: .6}),
  glass: new THREE.MeshStandardMaterial({color: 0xbfe6f5, roughness: .2, metalness: .1}),
  gold:  new THREE.MeshStandardMaterial({color: 0xffe27a, roughness: .4}),
  slate: new THREE.MeshStandardMaterial({color: 0x24303a, roughness: .7}),
};
const tieMat = c => new THREE.MeshStandardMaterial({color: c, roughness: .55});

function box(w, h, d, mat, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z);
  m.castShadow = m.receiveShadow = true;
  return m;
}
function cyl(r, h, mat, x = 0, y = 0, z = 0, seg = 14) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, seg), mat);
  m.position.set(x, y, z);
  m.castShadow = true;
  return m;
}
function capsule(r, len, mat) {
  const m = new THREE.Mesh(new THREE.CapsuleGeometry(r, len, 4, 10), mat);
  m.castShadow = true;
  return m;
}

/* ============================ FACES ============================ */
function drawFace(ctx, mood) {
  const s = 256;
  ctx.clearRect(0, 0, s, s);
  ctx.strokeStyle = "#1a1a1a";
  ctx.fillStyle = "#1a1a1a";
  ctx.lineWidth = 11;
  ctx.lineCap = "round";
  const eye = (x, y) => { ctx.beginPath(); ctx.arc(x, y, 13, 0, Math.PI * 2); ctx.fill(); };
  const arc = (x, y, r, a0, a1) => { ctx.beginPath(); ctx.arc(x, y, r, a0, a1); ctx.stroke(); };
  switch (mood) {
    case "happy":
      arc(88, 112, 20, Math.PI, Math.PI * 2);      // closed smiling eyes
      arc(168, 112, 20, Math.PI, Math.PI * 2);
      arc(128, 150, 42, 0.15 * Math.PI, 0.85 * Math.PI); // big smile
      break;
    case "stressed":
      ctx.beginPath(); ctx.moveTo(60, 84); ctx.lineTo(102, 100); ctx.stroke();  // brows
      ctx.beginPath(); ctx.moveTo(196, 84); ctx.lineTo(154, 100); ctx.stroke();
      eye(85, 118); eye(171, 118);
      ctx.beginPath(); ctx.moveTo(96, 178);                     // wavy mouth
      ctx.quadraticCurveTo(112, 166, 128, 178);
      ctx.quadraticCurveTo(144, 190, 160, 178);
      ctx.stroke();
      ctx.fillStyle = "#5aa9d6";                               // sweat drop
      ctx.beginPath(); ctx.moveTo(206, 60);
      ctx.quadraticCurveTo(220, 84, 206, 96);
      ctx.quadraticCurveTo(192, 84, 206, 60); ctx.fill();
      break;
    case "shocked":
      ctx.beginPath(); ctx.arc(88, 110, 18, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(168, 110, 18, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(128, 178, 22, 30, 0, 0, Math.PI * 2); ctx.stroke();
      break;
    case "deadpan":
      ctx.beginPath(); ctx.moveTo(62, 100); ctx.lineTo(110, 100); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(146, 100); ctx.lineTo(194, 100); ctx.stroke();
      eye(88, 118); eye(168, 118);
      ctx.beginPath(); ctx.moveTo(100, 178); ctx.lineTo(156, 178); ctx.stroke();
      break;
    case "sad":
      ctx.beginPath(); ctx.moveTo(62, 100); ctx.lineTo(104, 86); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(194, 100); ctx.lineTo(152, 86); ctx.stroke();
      eye(85, 118); eye(171, 118);
      arc(128, 200, 38, 1.15 * Math.PI, 1.85 * Math.PI);       // frown
      break;
    default: // calm
      eye(88, 112); eye(168, 112);
      arc(128, 150, 34, 0.2 * Math.PI, 0.8 * Math.PI);
  }
}
function faceTexture(mood) {
  const cv = document.createElement("canvas");
  cv.width = cv.height = 256;
  drawFace(cv.getContext("2d"), mood);
  const t = new THREE.CanvasTexture(cv);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/* ============================ STICKMAN ============================ */
const HIP = 0.95, SHOULDER = 1.7, NECK = 1.78;

class Stick {
  constructor({tie = null, accessory = null} = {}) {
    this.g = new THREE.Group();
    this.mode = "idle";          // idle | run | panic | laugh
    this.animScale = 1;          // frozen → ~0.05
    this.phase = Math.random() * 9;
    this.mood = "calm";

    // legs (pivot at hip)
    this.legL = new THREE.Group(); this.legL.position.set(0.1, HIP, 0);
    this.legR = new THREE.Group(); this.legR.position.set(-0.1, HIP, 0);
    const legGeo = new THREE.CapsuleGeometry(0.05, 0.8, 4, 10);
    for (const [leg, sx] of [[this.legL, 1], [this.legR, -1]]) {
      const m = new THREE.Mesh(legGeo, M.black);
      m.position.y = -0.46; m.castShadow = true;
      leg.add(m);
      const foot = new THREE.Mesh(new THREE.SphereGeometry(0.07, 10, 8), M.black);
      foot.position.set(0.01 * sx, -0.92, 0.05); leg.add(foot);
      this.g.add(leg);
    }

    // torso
    this.torso = new THREE.Group(); this.torso.position.set(0, HIP, 0);
    const body = capsule(0.1, 0.62, M.black); body.position.y = 0.42;
    this.torso.add(body); this.g.add(this.torso);

    // arms (pivot at shoulder)
    this.armL = new THREE.Group(); this.armL.position.set(0.2, SHOULDER, 0);
    this.armR = new THREE.Group(); this.armR.position.set(-0.2, SHOULDER, 0);
    const armGeo = new THREE.CapsuleGeometry(0.045, 0.55, 4, 10);
    for (const arm of [this.armL, this.armR]) {
      const m = new THREE.Mesh(armGeo, M.black);
      m.position.y = -0.32; m.castShadow = true;
      arm.add(m);
      const hand = new THREE.Mesh(new THREE.SphereGeometry(0.06, 10, 8), M.black);
      hand.position.y = -0.64; arm.add(hand);
      this.g.add(arm);
    }
    this.armL.rotation.z = 0.28; this.armR.rotation.z = -0.28;

    // head
    this.head = new THREE.Group(); this.head.position.set(0, NECK + 0.16, 0);
    const skull = new THREE.Mesh(new THREE.SphereGeometry(0.24, 24, 18), M.white);
    skull.castShadow = true;
    const rim = new THREE.Mesh(new THREE.SphereGeometry(0.245, 24, 18),
      new THREE.MeshStandardMaterial({color: 0x1a1a1a, roughness: .6, side: THREE.BackSide}));
    rim.scale.setScalar(1.03);
    this.faceCv = document.createElement("canvas");
    this.faceCv.width = this.faceCv.height = 256;
    this.faceCtx = this.faceCv.getContext("2d");
    this.faceTex = new THREE.CanvasTexture(this.faceCv);
    this.faceTex.colorSpace = THREE.SRGBColorSpace;
    const fp = new THREE.Mesh(new THREE.PlaneGeometry(0.36, 0.36),
      new THREE.MeshBasicMaterial({map: this.faceTex, transparent: true}));
    fp.position.z = 0.21;
    this.head.add(rim, skull, fp);
    this.g.add(this.head);
    this.setMood("calm");

    // tie — hangs from neck; torso-local coords (torso origin = hip)
    if (tie) {
      const t = box(0.08, 0.34, 0.02, tieMat(tie));
      t.geometry.translate(0, -0.17, 0);
      t.position.set(0, 0.72, 0.11);
      this.torso.add(t);
    }
    // accessory on right hand
    if (accessory === "books") {
      const bk = new THREE.Group();
      ["#e8912d", "#4d9dbb", "#b04d7a"].forEach((c, i) =>
        bk.add(box(0.3, 0.07, 0.22, tieMat(c), 0, i * 0.08, 0)));
      bk.position.set(0, -0.72, 0.06);
      this.armR.add(bk);
    }
    if (accessory === "papers") {
      const pk = new THREE.Group();
      for (let i = 0; i < 6; i++)
        pk.add(box(0.34, 0.02, 0.26, M.paper, 0, i * 0.035, 0));
      pk.position.set(0, -0.72, 0.08);
      this.armR.add(pk);
    }
    if (accessory === "mug") {
      const mug = new THREE.Group();
      mug.add(cyl(0.06, 0.1, M.white));
      const handle = new THREE.Mesh(new THREE.TorusGeometry(0.045, 0.012, 8, 14, Math.PI), M.white);
      handle.rotation.z = -Math.PI / 2; handle.position.x = 0.07;
      mug.add(handle);
      mug.position.set(0, -0.7, 0.05);
      this.armR.add(mug);
      this.mug = mug;
      mug.visible = false;
    }
  }
  setMood(m) {
    if (m === this.mood) return;
    this.mood = m;
    drawFace(this.faceCtx, m);
    this.faceTex.needsUpdate = true;
  }
}

const POSES = {
  stand:   {legL: {x: 0, z: 0}, legR: {x: 0, z: 0}, armL: {x: 0, z: 0.28}, armR: {x: 0, z: -0.28}, torso: {x: 0}, head: {x: 0, z: 0}},
  despair: {legL: {x: 0, z: 0}, legR: {x: 0, z: 0}, armL: {x: 0, z: 2.5}, armR: {x: 0, z: -2.5}, torso: {x: 0.08}, head: {x: 0.12, z: 0}},
  shout:   {legL: {x: -0.15, z: 0.1}, legR: {x: 0.15, z: -0.1}, armL: {x: 0, z: 2.9}, armR: {x: 0, z: -2.9}, torso: {x: 0.05}, head: {x: -0.15, z: 0}},
  point:   {legL: {x: 0, z: 0}, legR: {x: 0, z: 0}, armL: {x: 0, z: 0.28}, armR: {x: -1.45, z: -0.15}, torso: {x: 0}, head: {x: 0, z: 0}},
  shrug:   {legL: {x: 0, z: 0}, legR: {x: 0, z: 0}, armL: {x: 0, z: 1.15}, armR: {x: 0, z: -1.15}, torso: {x: 0.06}, head: {x: 0, z: 0.06}},
  recline: {legL: {x: -0.5, z: 0.05}, legR: {x: -0.4, z: -0.05}, armL: {x: 0, z: 0.9}, armR: {x: -0.9, z: -0.5}, torso: {x: -0.18}, head: {x: -0.1, z: 0}},
  run:     {legL: {x: 0, z: 0}, legR: {x: 0, z: 0}, armL: {x: 0, z: 0.3}, armR: {x: 0, z: -0.3}, torso: {x: 0.15}, head: {x: 0, z: 0}},
};

function applyPose(c, name, dur = 0.35) {
  const p = POSES[name];
  const D = {duration: dur, ease: "power2.out", overwrite: "auto"};
  gsap.to(c.legL.rotation, {...p.legL, ...D});
  gsap.to(c.legR.rotation, {...p.legR, ...D});
  gsap.to(c.armL.rotation, {...p.armL, ...D});
  gsap.to(c.armR.rotation, {...p.armR, ...D});
  gsap.to(c.torso.rotation, {...p.torso, ...D});
  gsap.to(c.head.rotation, {...p.head, ...D});
}

/* ============================ ROOM ============================ */
const room = new THREE.Group();
scene.add(room);

const floor = new THREE.Mesh(new THREE.PlaneGeometry(16, 14), M.floor);
floor.rotation.x = -Math.PI / 2;
floor.position.set(0, 0, 0);
floor.receiveShadow = true;
room.add(floor);

const backWall = new THREE.Mesh(new THREE.PlaneGeometry(16, 6), M.wall);
backWall.position.set(0, 3, -6);
backWall.receiveShadow = true;
room.add(backWall);

const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(14, 6), M.wallS);
leftWall.rotation.y = Math.PI / 2;
leftWall.position.set(-7, 3, 0);
leftWall.receiveShadow = true;
room.add(leftWall);

// window (back wall, right)
const win = new THREE.Group();
win.position.set(3.6, 3.1, -5.97);
win.add(box(1.9, 2.0, 0.06, M.white));
const glass = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 1.7),
  new THREE.MeshBasicMaterial({color: 0xaedcf0}));
glass.position.z = 0.04;
win.add(glass);
win.add(box(0.05, 1.7, 0.02, M.white, 0, 0, 0.06));
win.add(box(1.6, 0.05, 0.02, M.white, 0, 0, 0.06));
const sunDot = new THREE.Mesh(new THREE.CircleGeometry(0.22, 20),
  new THREE.MeshBasicMaterial({color: 0xffd84d}));
sunDot.position.set(-0.35, 0.45, 0.06);
win.add(sunDot);
room.add(win);

// bulletin board (back wall, left)
const board = new THREE.Group();
board.position.set(-3.6, 3.0, -5.97);
board.add(box(2.2, 1.6, 0.07, M.wood));
const noteCols = [0xffffff, 0xffe27a, 0xf3b6d2, 0xbfe6f5, 0xffffff, 0xffe27a];
noteCols.forEach((c, i) => {
  const n = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.6),
    new THREE.MeshStandardMaterial({color: c, roughness: .9}));
  n.position.set(-0.7 + (i % 3) * 0.7, i < 3 ? 0.35 : -0.35, 0.05);
  n.rotation.z = (i % 2 ? -1 : 1) * 0.06;
  board.add(n);
});
room.add(board);

// door on left wall
const door = new THREE.Group();
door.rotation.y = Math.PI / 2;
door.position.set(-6.96, 1.55, -0.5);
door.add(box(1.7, 3.1, 0.08, new THREE.MeshStandardMaterial({color: 0xc99e63, roughness: .85})));
const knob = new THREE.Mesh(new THREE.SphereGeometry(0.07, 12, 10), M.gold);
knob.position.set(0.6, 0, 0.08); door.add(knob);
room.add(door);

// bookshelf (right)
const shelf = new THREE.Group();
shelf.position.set(5.3, 1.9, -4.4);
shelf.rotation.y = -0.15;
shelf.add(box(1.6, 3.0, 0.5, M.woodD));
const bookCols = [0xe8912d, 0x4d9dbb, 0xb04d7a, 0x2e9e6b, 0x5a4fcf, 0xffe27a];
for (let row = 0; row < 3; row++) {
  shelf.add(box(1.4, 0.06, 0.42, M.wood, 0, -0.95 + row * 0.9, 0));
  for (let i = 0; i < 5; i++) {
    shelf.add(box(0.18, 0.5 + (i % 3) * 0.08, 0.3,
      tieMat(bookCols[(row * 5 + i) % 6]), -0.5 + i * 0.26, -0.65 + row * 0.9, 0));
  }
}
room.add(shelf);

/* desk */
const desk = new THREE.Group();
desk.position.set(0, 0, -0.9);
desk.add(box(3.6, 0.12, 1.5, M.wood, 0, 1.05, 0));
for (const [x, z] of [[-1.65, -0.6], [1.65, -0.6], [-1.65, 0.6], [1.65, 0.6]])
  desk.add(box(0.1, 1.0, 0.1, M.woodD, x, 0.55, z));
room.add(desk);

// monitor on desk
const monitor = new THREE.Group();
monitor.position.set(1.35, 1.11, -0.95);
monitor.add(box(0.5, 0.07, 0.34, M.slate, 0, 0.02, 0));
monitor.add(box(0.09, 0.34, 0.09, M.slate, 0, 0.2, 0));
const monBody = box(1.15, 0.78, 0.07, M.slate, 0, 0.62, 0);
monitor.add(monBody);
const monCv = document.createElement("canvas");
monCv.width = 320; monCv.height = 200;
const mc = monCv.getContext("2d");
mc.fillStyle = "#123c4a"; mc.fillRect(0, 0, 320, 200);
mc.fillStyle = "#4d9dbb"; mc.fillRect(0, 0, 320, 36);
mc.strokeStyle = "#7DC8E8"; mc.lineWidth = 4; mc.beginPath();
mc.moveTo(20, 160); mc.lineTo(80, 120); mc.lineTo(140, 140); mc.lineTo(200, 80);
mc.lineTo(260, 95); mc.lineTo(300, 60); mc.stroke();
mc.fillStyle = "rgba(125,200,232,.5)";
[0, 1, 2].forEach(i => mc.fillRect(20 + i * 100, 170 - i * 10, 60, 8));
const monTex = new THREE.CanvasTexture(monCv);
monTex.colorSpace = THREE.SRGBColorSpace;
const monScreen = new THREE.Mesh(new THREE.PlaneGeometry(1.05, 0.66),
  new THREE.MeshBasicMaterial({map: monTex}));
monScreen.position.set(0, 0.62, 0.045);
monitor.add(monScreen);
desk.add(monitor);

// red phone on desk
const phone = new THREE.Group();
phone.position.set(-1.2, 1.11, -0.75);
phone.add(box(0.42, 0.12, 0.3, M.red));
phone.add(box(0.4, 0.1, 0.09, M.red, 0, 0.13, -0.05));
for (let i = 0; i < 3; i++)
  phone.add(cyl(0.018, 0.025, M.white, -0.08 + i * 0.08, 0.07, 0.06, 8));
desk.add(phone);
// ring arcs
const ringArcs = [];
for (let i = 0; i < 2; i++) {
  const arc = new THREE.Mesh(
    new THREE.TorusGeometry(0.16 + i * 0.14, 0.018, 8, 20, Math.PI * 0.9),
    new THREE.MeshBasicMaterial({color: 0xc0392b, transparent: true}));
  arc.rotation.z = Math.PI / 2 - Math.PI * 0.45;
  arc.position.set(-1.2, 1.32, -0.75);
  desk.add(arc);
  ringArcs.push(arc);
}

// paper stack on desk — grows with stress
const pile = new THREE.Group();
pile.position.set(0.15, 1.11, -0.6);
const pileSheets = [];
for (let i = 0; i < 9; i++) {
  const p = box(0.42, 0.018, 0.32, M.paper, (Math.random() - .5) * 0.05, i * 0.02, (Math.random() - .5) * 0.05);
  p.rotation.y = (Math.random() - .5) * 0.3;
  pile.add(p); pileSheets.push(p);
}
desk.add(pile);

// scattered floor papers (chaos)
const floorPapers = [];
for (let i = 0; i < 7; i++) {
  const p = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 0.55), M.paper);
  p.rotation.x = -Math.PI / 2;
  p.rotation.z = Math.random() * Math.PI;
  p.position.set(-3 + Math.random() * 6, 0.012 + i * 0.001, -2 + Math.random() * 3);
  p.receiveShadow = true;
  p.visible = false;
  room.add(p);
  floorPapers.push(p);
}

// falling papers pool
const rain = [];
for (let i = 0; i < 36; i++) {
  const p = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.46),
    new THREE.MeshStandardMaterial({color: 0xffffff, roughness: .9, side: THREE.DoubleSide}));
  p.visible = false;
  p.castShadow = true;
  scene.add(p);
  rain.push({m: p, v: 0, spin: 0, drift: 0, alive: false});
}
let rainTimer = 0;

// parent video-call tablet on wall
const tablet = new THREE.Group();
tablet.position.set(-3.3, 2.6, -5.9);
tablet.add(box(1.5, 2.1, 0.08, M.slate));
const tabCv = document.createElement("canvas");
tabCv.width = tabCv.height = 256;
const tc = tabCv.getContext("2d");
drawFace(tc, "stressed");
tc.globalCompositeOperation = "destination-over";
tc.fillStyle = "#cfe9f4"; tc.fillRect(0, 0, 256, 256);
const tabTex = new THREE.CanvasTexture(tabCv);
tabTex.colorSpace = THREE.SRGBColorSpace;
const tabScreen = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 1.9),
  new THREE.MeshBasicMaterial({map: tabTex}));
tabScreen.position.z = 0.05;
tablet.add(tabScreen);
tablet.scale.setScalar(0.001);
room.add(tablet);

// floating product browser (scene 4)
const browser = new THREE.Group();
browser.position.set(0.6, 2.15, -0.2);
browser.rotation.y = -0.16;
browser.add(box(4.3, 2.75, 0.09, M.slate));
const browserBar = box(4.3, 0.34, 0.1, new THREE.MeshStandardMaterial({color: 0x35424e}));
browserBar.position.y = 1.2;
browser.add(browserBar);
[0xe05252, 0xffd84d, 0x2e9e6b].forEach((c, i) => {
  const d = new THREE.Mesh(new THREE.CircleGeometry(0.05, 12), new THREE.MeshBasicMaterial({color: c}));
  d.position.set(-1.9 + i * 0.16, 1.2, 0.06);
  browser.add(d);
});
const shotLoader = new THREE.TextureLoader();
const SHOTS = ["dashboard1", "students", "marks_entry", "finances", "timetable_web"]
  .map(n => {
    const t = shotLoader.load(`img/${n}.png`);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  });
const shotScreen = new THREE.Mesh(new THREE.PlaneGeometry(4.05, 2.3),
  new THREE.MeshBasicMaterial({map: SHOTS[0]}));
shotScreen.position.set(0, -0.1, 0.055);
browser.add(shotScreen);
browser.scale.setScalar(0.001);
browser.visible = false;
scene.add(browser);

/* ============================ CHARACTERS ============================ */
const ht = new Stick({tie: "#c0392b", accessory: "mug"});
ht.g.position.set(-0.35, 0, -2.0);
scene.add(ht.g);

const teacher = new Stick({tie: "#e8912d", accessory: "books"});
teacher.g.position.set(6.5, 0, 0);      // offscreen right
scene.add(teacher.g);

const admin = new Stick({tie: "#b04d7a", accessory: "papers"});
admin.g.position.set(-6.5, 0, 0);       // offscreen left
scene.add(admin.g);

const calm = new Stick({tie: "#2e9e6b"});
calm.g.position.set(-6.5, 0, -0.3);
scene.add(calm.g);

/* ============================ STATE MACHINE ============================
   Deterministic per-time state so any seek lands correctly. */
function charState(name, t) {
  switch (name) {
    case "ht":
      if (t < 0.3) return {pose: "stand", mood: "stressed", mode: "idle"};
      if (t < 13.3) return {pose: "despair", mood: "stressed", mode: "idle"};
      if (t < 16.4) return {pose: "shout", mood: "stressed", mode: "panic"};
      if (t < 21)   return {pose: "despair", mood: "sad", mode: "idle"};
      if (t < 24.9) return {pose: "stand", mood: "sad", mode: "idle"};
      if (t < 27.1) return {pose: "shrug", mood: "calm", mode: "idle"};
      if (t < 29.8) return {pose: "stand", mood: "shocked", mode: "idle"};
      if (t < 32.8) return {pose: "shocked2", mood: "shocked", mode: "idle", p: "shrug"};
      if (t < 44.1) return {pose: "stand", mood: "calm", mode: "idle"};
      if (t < 46.9) return {pose: "shrug", mood: "sad", mode: "idle"};
      if (t < 52.6) return {pose: "recline", mood: "calm", mode: "idle"};
      if (t < 55.4) return {pose: "point", mood: "calm", mode: "idle"};
      if (t < 56.5) return {pose: "recline", mood: "happy", mode: "laugh"};
      return {pose: "recline", mood: "deadpan", mode: "idle"};
    case "teacher":
      if (t < 2.0) return {hide: true};
      if (t < 7.0)  return {pose: "shrug", mood: "stressed", mode: "idle"};
      if (t < 11.4) return {pose: "point", mood: "stressed", mode: "idle"};
      if (t < 16.4) return {pose: "despair", mood: "stressed", mode: "panic"};
      if (t < 21)   return {pose: "despair", mood: "stressed", mode: "idle"};
      if (t < 30.5) return {pose: "stand", mood: "calm", mode: "idle"};
      if (t < 37.2) return {pose: "shrug", mood: "shocked", mode: "idle"};
      if (t < 47.0) return {hide: true};
      if (t < 52.4) return {pose: "shrug", mood: "stressed", mode: t < 49.3 ? "run" : "panic"};
      if (t < 55.4) return {pose: "stand", mood: "shocked", mode: "idle"};
      if (t < 56.5) return {pose: "stand", mood: "happy", mode: "laugh"};
      return {hide: true};
    case "admin":
      if (t < 5.8) return {hide: true};
      if (t < 7.0)  return {pose: "shrug", mood: "stressed", mode: "idle"};
      if (t < 16.4) return {pose: "despair", mood: "stressed", mode: "panic"};
      if (t < 21)   return {pose: "despair", mood: "stressed", mode: "idle"};
      return {hide: true};
    case "calm":
      if (t < 21.2) return {hide: true};
      if (t < 24.9) return {pose: "point", mood: "calm", mode: "idle"};
      if (t < 27.1) return {pose: "stand", mood: "calm", mode: "idle"};
      if (t < 29.8) return {pose: "point", mood: "calm", mode: "idle"};
      if (t < 32.8) return {pose: "stand", mood: "happy", mode: "idle"};
      if (t < 46.9) return {pose: "point", mood: "calm", mode: "idle"};
      if (t < 47.0) return {pose: "stand", mood: "happy", mode: "idle"};
      return {hide: true};
  }
  return {};
}

const chars = {ht, teacher, admin, calm};
const lastState = {};
function updateChar(name, t) {
  const c = chars[name];
  const s = charState(name, t);
  const key = JSON.stringify(s);
  if (key === lastState[name]) return;
  lastState[name] = key;
  const poseName = s.p || s.pose;
  if (s.hide) { c.g.visible = false; c.mode = "idle"; return; }
  c.g.visible = true;
  c.mode = s.mode || "idle";
  if (poseName) applyPose(c, poseName, 0.4);
  if (s.mood) c.setMood(s.mood);
  if (name === "ht") c.mug.visible = t >= 47 && t < 56.5;
}

/* ============================ AUDIO ============================ */
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const buffers = {};
async function loadAudio() {
  const names = new Set(SFX.map(s => s[0]));
  LINES.forEach(l => names.add(
    {TEACHER: "t", PARENT: "p", ADMIN: "a", HEADTEACHER: "h", "MR. KIPROP": "c"}[l.who]
  ));
  const files = [
    "t1_records","p1_fees","a1_reports","t2_where","p2_answer","h1_onetime",
    "h2_feellike","c1_hardway","h3_whatmean","c2_tried","h4_mwaliwhat","t3_wait",
    "c3_idea","h5_suffering","c4_unfortunately","t4_problem","h6_tried",
    "p3_fees","h7_tried","music_bed","music_tension",
    "sfx_ring","sfx_ring2","sfx_whoosh","sfx_swoosh","sfx_pop","sfx_thump",
    "sfx_scratch","sfx_ding","sfx_boing","sfx_riser","sfx_wahwah","sfx_laugh","sfx_ta_da",
  ];
  let done = 0;
  const lbl = document.getElementById("loading");
  await Promise.all(files.map(async f => {
    try {
      const r = await fetch(`audio/${f}.mp3`);
      buffers[f] = await audioCtx.decodeAudioData(await r.arrayBuffer());
    } catch (e) { console.warn("audio fail", f); }
    lbl.textContent = `loading audio ${++done}/${files.length}`;
  }));
}
const LINE_FILES = ["t1_records","p1_fees","a1_reports","t2_where","p2_answer","h1_onetime",
  "h2_feellike","c1_hardway","h3_whatmean","c2_tried","h4_mwaliwhat","t3_wait","c3_idea",
  "h5_suffering","c4_unfortunately","t4_problem","h6_tried","p3_fees","h7_tried"];

function playBuf(name, at, vol = 1, loop = false, t0 = 0) {
  const b = buffers[name];
  if (!b) return null;
  const src = audioCtx.createBufferSource();
  src.buffer = b; src.loop = loop;
  const g = audioCtx.createGain();
  g.gain.value = vol;
  src.connect(g).connect(audioCtx.destination);
  src.start(t0 + at);
  return {src, g};
}

/* ============================ HUD ============================ */
const $ = id => document.getElementById(id);
const cap = $("cap"), stressEl = $("stress"), stressBar = $("stressBar"), stressLbl = $("stressLbl");
const bubbleBox = $("bubbles"), hapops = $("hapops");
const bubbleEls = BUBBLES.map(b => {
  const d = document.createElement("div");
  d.className = `bubble ${b.cls}`;
  d.style.left = b.x + "%";
  d.style.top = b.y + "%";
  d.textContent = b.text;
  bubbleBox.appendChild(d);
  return d;
});
const checklist = $("checklist");
["ONE DASHBOARD", "STUDENTS", "MARKS", "FEES", "TIMETABLE"].forEach((t, i) => {
  const d = document.createElement("div");
  d.className = "cl" + (i === 0 ? " lead" : "");
  d.textContent = t;
  checklist.appendChild(d);
});
const clEls = [...checklist.children].slice(1);
[{x: 12, y: 22, at: 55.45}, {x: 66, y: 19, at: 55.7}, {x: 35, y: 16, at: 55.95}]
  .forEach(h => {
    const d = document.createElement("div");
    d.className = "ha"; d.dataset.at = h.at;
    d.style.left = h.x + "%"; d.style.top = h.y + "%";
    d.style.transform = `rotate(${Math.random() > .5 ? -8 : 10}deg)`;
    d.textContent = "HA!";
    hapops.appendChild(d);
  });
const haEls = [...hapops.children];

function hud(t) {
  // captions — latest active line wins
  let cur = null;
  for (const l of LINES) if (t >= l.t && t < l.t + l.d) cur = l;
  if (cur) {
    cap.style.opacity = 1;
    cap.innerHTML = `<span class="who" style="color:${cur.col}">${cur.who}:</span>${cur.text}`;
  } else cap.style.opacity = 0;

  bubbleEls.forEach((el, i) => {
    const b = BUBBLES[i];
    el.classList.toggle("on", t >= b.t0 && t < b.t1);
  });

  $("pov").style.opacity = t > 0.4 && t < 7 ? 1 : 0;
  $("logoChip").style.opacity = t > 27.0 ? 1 : 0;

  // stress meter
  const showStress = t > 7.4 && t < 21;
  stressEl.style.opacity = showStress ? 1 : 0;
  if (showStress) {
    const v = Math.min(100, ((t - 7.4) / 6.0) * 100);
    stressBar.style.width = v + "%";
    const max = t >= 13.3;
    stressEl.classList.toggle("max", max);
    stressLbl.textContent = max ? "STRESS MAX" : `STRESS ${Math.round(v)}%`;
  }

  // freeze vignette
  $("freeze").style.opacity = t > 16.4 && t < 21.0 ? 1 : 0;

  // checklist
  checklist.style.opacity = t > 30.6 && t < 46.8 ? 1 : 0;
  const ticks = [31.8, 34.8, 37.7, 40.5];
  clEls.forEach((el, i) => el.classList.toggle("done", t > ticks[i]));

  // HA pops
  haEls.forEach(el => {
    const at = +el.dataset.at;
    el.style.opacity = t > at && t < 56.55 ? 1 : 0;
    if (t > at && t < 56.55)
      el.style.transform += "";
  });
}

/* ============================ MASTER TIMELINE ============================ */
const tl = gsap.timeline({paused: true});
const cam = (t, p, tg, dur = 1.4) => {
  tl.to(camera.position, {...p, duration: dur, ease: "power2.inOut"}, t);
  tl.to(camTarget.position, {...tg, duration: dur, ease: "power2.inOut"}, t);
};

// open tight on HT, pull back
camera.position.set(-0.1, 1.9, 3.4);
camTarget.position.set(-0.3, 1.6, -2);
cam(0.4, {x: 0, y: 2.3, z: 10.2}, {x: 0, y: 1.5, z: -0.8}, 2.2);

// entrances
tl.to(teacher.g.position, {x: 1.55, duration: 0.8, ease: "power3.out"}, 1.95);
tl.call(() => { teacher.mode = "run"; }, null, 1.95);
tl.call(() => { teacher.mode = "idle"; }, null, 2.75);
tl.to(tablet.scale, {x: 1, y: 1, z: 1, duration: 0.5, ease: "back.out(1.7)"}, 4.0);
tl.to(admin.g.position, {x: -2.2, duration: 0.8, ease: "power3.out"}, 5.75);
tl.call(() => { admin.mode = "run"; }, null, 5.75);
tl.call(() => { admin.mode = "idle"; }, null, 6.55);

// camera nudges with each interruption
cam(4.2, {x: -0.6, y: 2.2, z: 9.8}, {x: -0.8, y: 1.6, z: -0.9}, 0.7);
cam(6.0, {x: 0.2, y: 2.3, z: 10.0}, {x: 0, y: 1.5, z: -0.8}, 0.8);

// scene 2 chaos — shake then punch into outburst
cam(7.4, {x: 0, y: 2.2, z: 9.4}, {x: 0, y: 1.5, z: -0.9}, 1.0);
cam(13.3, {x: 0, y: 1.9, z: 6.4}, {x: 0.2, y: 1.6, z: -1.2}, 0.45);
cam(15.0, {x: 0, y: 2.1, z: 8.2}, {x: 0, y: 1.5, z: -1.0}, 1.2);

// freeze — slow push while world stops
cam(16.4, {x: 0.4, y: 2.0, z: 7.2}, {x: 0.2, y: 1.6, z: -1.4}, 4.0);

// scene 3 — calm teacher glides in
tl.to(calm.g.position, {x: -2.2, duration: 1.0, ease: "power3.out"}, 21.15);
cam(21.2, {x: -0.9, y: 2.3, z: 9.6}, {x: -0.5, y: 1.5, z: -0.9}, 1.1);
cam(27.0, {x: -0.4, y: 2.1, z: 8.6}, {x: -0.3, y: 1.6, z: -0.9}, 0.9);
cam(29.8, {x: 0.2, y: 2.0, z: 7.4}, {x: 0.3, y: 1.6, z: -1.2}, 0.5);

// scene 4 — browser materializes, screens cycle
tl.call(() => { browser.visible = true; }, null, 30.5);
tl.to(browser.scale, {x: 1, y: 1, z: 1, duration: 0.7, ease: "back.out(1.4)"}, 30.5);
tl.to(pile.scale, {x: 0.01, y: 0.01, z: 0.01, duration: 0.6}, 30.6);
cam(30.5, {x: 0.4, y: 2.2, z: 8.8}, {x: 0.4, y: 1.9, z: -0.4}, 1.0);
const SHOT_TIMES = [30.9, 33.7, 36.5, 39.3, 42.1];
SHOT_TIMES.forEach((t, i) => {
  tl.call(() => {
    shotScreen.material.map = SHOTS[i];
    shotScreen.material.needsUpdate = true;
  }, null, t);
  tl.fromTo(browser.scale, {x: 0.96, y: 0.96, z: 0.96}, {x: 1, y: 1, z: 1, duration: 0.4, ease: "power2.out"}, t);
});
// HT + calm stay visible flanking the browser
tl.to(ht.g.position, {x: -2.6, z: -1.6, duration: 0.8}, 30.9);
tl.to(calm.g.position, {x: 3.1, z: -1.4, duration: 0.8}, 30.9);
tl.to(teacher.g.position, {x: 6.5, duration: 0.7}, 30.6);

// scene 5 — tidy snap, teacher runs back in
tl.call(() => {
  floorPapers.forEach(p => p.visible = false);
  pile.scale.setScalar(0.001);
  browser.visible = false;
  tablet.scale.setScalar(0.001);
}, null, 47.0);
tl.to(ht.g.position, {x: -0.35, z: -2.0, duration: 0.7}, 47.0);
tl.to(teacher.g.position, {x: 1.55, z: 0, duration: 0.9, ease: "power3.out"}, 48.9);
tl.call(() => { teacher.mode = "run"; }, null, 48.9);
cam(47.0, {x: 0, y: 2.3, z: 10.2}, {x: 0, y: 1.5, z: -0.8}, 0.8);
cam(49.0, {x: 0.9, y: 2.1, z: 7.8}, {x: 1.2, y: 1.5, z: -0.9}, 0.5);
cam(52.5, {x: -0.4, y: 2.0, z: 6.8}, {x: -0.2, y: 1.6, z: -1.3}, 0.5);
cam(55.3, {x: 0, y: 2.2, z: 8.4}, {x: 0, y: 1.5, z: -0.9}, 1.0);

// parent pops back onto the video-call tablet for the final gag
tl.to(tablet.scale, {x: 1, y: 1, z: 1, duration: 0.45, ease: "back.out(1.8)"}, 55.45);

// brand card sweep
tl.to("#brand", {x: "0%", duration: 0.65, ease: "power3.out"}, 56.5);

// floor papers appear during chaos
LINES; // (no-op)
[10.2, 11.5, 12.6, 13.4, 14.2, 15.0, 15.8].forEach((t, i) =>
  tl.call(() => { floorPapers[i].visible = true; }, null, t));

/* ============================ RENDER LOOP ============================ */
const clock = new THREE.Clock();
let playing = false;
let baseY = {ht: 0, teacher: 0, admin: 0, calm: 0};

const RING_WINDOWS = [[0.35, 2.6], [7.4, 9.6], [11.4, 13.3], [55.3, 56.7]];
const RAIN_WINDOW = [9.9, 16.4];

function tick() {
  requestAnimationFrame(tick);
  const dt = clock.getDelta();
  const t = playing ? tl.time() : tSeek;

  // characters — deterministic state by time
  for (const n of Object.keys(chars)) updateChar(n, t);

  // idle bob + run/panic/laugh modes
  const frozen = t > 16.4 && t < 21.0;
  const amp = frozen ? 0.06 : 1;
  for (const n of Object.keys(chars)) {
    const c = chars[n];
    if (!c.g.visible) continue;
    const ph = t * 10 + c.phase;
    if (c.mode === "run") {
      c.legL.rotation.x = Math.sin(ph * 1.6) * 0.85;
      c.legR.rotation.x = -Math.sin(ph * 1.6) * 0.85;
      c.armL.rotation.x = -Math.sin(ph * 1.6) * 0.7;
      c.armR.rotation.x = Math.sin(ph * 1.6) * 0.7;
      c.g.position.y = baseY[n] + Math.abs(Math.sin(ph * 1.6)) * 0.08;
    } else if (c.mode === "panic") {
      c.armL.rotation.z = 2.5 + Math.sin(ph * 2.2) * 0.25 * amp;
      c.armR.rotation.z = -2.5 - Math.sin(ph * 2.2) * 0.25 * amp;
      c.g.position.y = baseY[n] + Math.abs(Math.sin(ph * 2)) * 0.05 * amp;
      c.head.rotation.z = Math.sin(ph * 1.7) * 0.12 * amp;
    } else if (c.mode === "laugh") {
      c.torso.rotation.x = Math.sin(ph * 1.9) * 0.12;
      c.g.position.y = baseY[n] + Math.abs(Math.sin(ph * 1.9)) * 0.1;
      c.head.rotation.z = Math.sin(ph * 1.5) * 0.15;
    } else {
      c.g.position.y = baseY[n] + Math.sin(ph * 0.55) * 0.02 * amp;
    }
  }

  // phone ring
  const ringing = RING_WINDOWS.some(([a, b]) => t > a && t < b);
  phone.rotation.z = ringing ? Math.sin(t * 55) * 0.09 : 0;
  ringArcs.forEach((a, i) => {
    const ph2 = (t * 2.2 + i * 0.5) % 1;
    a.material.opacity = ringing ? 1 - ph2 : 0;
    a.scale.setScalar(0.7 + ph2 * 0.8);
  });

  // paper pile grows with stress (scenes 1-2), cleared once the app arrives
  if (t < 30.5) {
    const n = t < 7 ? Math.floor(Math.min(9, Math.max(2, t * 1.6)))
                  : Math.min(9, 5 + Math.floor((t - 7) / 1.6));
    pileSheets.forEach((p, i) => p.visible = i < n);
    pile.scale.setScalar(1);
  } else {
    pile.scale.setScalar(0.001);
  }

  // deterministic visibility (also correct when seeking)
  browser.visible = t > 30.45 && t < 47;
  tablet.visible = (t > 4.0 && t < 47) || (t > 55.4 && t < 57.2);
  floorPapers.forEach((p, i) => { p.visible = t > 10.2 + i * 0.85 && t < 47; });

  // paper rain during chaos
  if (t > RAIN_WINDOW[0] && t < RAIN_WINDOW[1]) {
    rainTimer -= dt;
    if (rainTimer <= 0) {
      rainTimer = 0.12;
      const p = rain.find(r => !r.alive);
      if (p) {
        p.alive = true; p.m.visible = true;
        p.m.position.set(-4 + Math.random() * 8, 5.6, -3.5 + Math.random() * 3);
        p.v = 1.6 + Math.random() * 1.4;
        p.spin = (Math.random() - .5) * 4;
        p.drift = (Math.random() - .5) * 1.2;
      }
    }
  }
  for (const p of rain) {
    if (!p.alive) continue;
    p.m.position.y -= p.v * dt;
    p.m.position.x += p.drift * dt;
    p.m.rotation.x += p.spin * dt;
    p.m.rotation.z += p.spin * 0.7 * dt;
    if (p.m.position.y < 0.03) { p.alive = false; p.m.visible = false; }
  }

  // tablet subtle wobble when parent talks
  tablet.rotation.z = (t > 11.5 && t < 13.2) || (t > 4.2 && t < 8.2)
    ? Math.sin(t * 18) * 0.03 : 0;

  hud(t);
  camera.lookAt(camTarget.position);
  renderer.render(scene, camera);
}
let tSeek = 0;
tick();
window.__ready = true;

/* ============================ START ============================ */
const playEl = $("play");
playEl.addEventListener("click", async () => {
  playEl.style.pointerEvents = "none";
  await loadAudio();
  if (audioCtx.state === "suspended") await audioCtx.resume();
  gsap.to(playEl, {autoAlpha: 0, duration: 0.4});

  const t0 = audioCtx.currentTime + 0.15;
  LINE_FILES.forEach((f, i) => playBuf(f, LINES[i].t, 0.95, false, t0));
  SFX.forEach(([f, at, v]) => playBuf(f, at, v, false, t0));
  // music: tension until the calm teacher arrives, then light bed
  const ten = playBuf("music_tension", 0, 0.16, true, t0);
  if (ten) { ten.g.gain.setValueAtTime(0.16, t0); ten.g.gain.linearRampToValueAtTime(0, t0 + 21.0); ten.src.stop(t0 + 21.4); }
  const bed = playBuf("music_bed", 21.0, 0.14, true, t0);
  if (bed) bed.src.stop(t0 + 63);

  playing = true;
  tl.play(0);
});

// ?seek=N — build state at time N without audio (QA/screenshots)
const qs = new URLSearchParams(location.search);
if (qs.has("seek")) {
  playEl.style.display = "none";
  tSeek = +qs.get("seek") || 0;
  tl.seek(tSeek, false);
  // settle pose tweens instantly for deterministic screenshots
  setTimeout(() => {
    for (const n of Object.keys(chars)) {
      lastState[n] = null;
      updateChar(n, tSeek);
    }
  }, 60);
}
