import React from "react";


export type Expression =
  | "neutral"
  | "stressed"
  | "shocked"
  | "angry"
  | "tired"
  | "calm"
  | "happy"
  | "suspicious";

export type Pose =
  | "stand"
  | "sit"
  | "lean"
  | "point"
  | "facepalm"
  | "armsUp"
  | "shrug"
  | "run"
  | "walk"
  | "sip"
  | "phoneHeld"
  | "holdStack"
  | "recline"
  | "laugh";

export type Accessory = "tie" | "books" | "papers" | "mug" | "phone";

interface Props {
  t: number; // animation clock (frames)
  expression?: Expression;
  pose?: Pose;
  flip?: boolean;
  color?: string;
  sweat?: boolean;
  accessories?: Accessory[];
  animSpeed?: number; // limb wiggle speed
  animAmp?: number; // limb wiggle amplitude 0..1
  bob?: number; // vertical bounce amplitude px
}

const SHOULDER = {x: 100, y: 96};
const HIP = {x: 100, y: 188};

// hand targets relative to a 200x320 figure
const POSES: Record<
  Pose,
  {lh: [number, number]; rh: [number, number]; lf: [number, number]; rf: [number, number]; lean: number}
> = {
  stand: {lh: [58, 158], rh: [142, 158], lf: [78, 292], rf: [122, 292], lean: 0},
  sit: {lh: [62, 128], rh: [138, 128], lf: [72, 250], rf: [128, 250], lean: 0},
  lean: {lh: [70, 150], rh: [130, 150], lf: [74, 292], rf: [126, 292], lean: 0.06},
  point: {lh: [72, 150], rh: [182, 66], lf: [78, 292], rf: [122, 292], lean: -0.05},
  facepalm: {lh: [58, 158], rh: [96, 52], lf: [78, 292], rf: [122, 292], lean: 0.08},
  armsUp: {lh: [56, 26], rh: [144, 26], lf: [70, 292], rf: [130, 292], lean: 0},
  shrug: {lh: [42, 92], rh: [158, 92], lf: [78, 292], rf: [122, 292], lean: 0},
  run: {lh: [150, 80], rh: [55, 150], lf: [130, 250], rf: [60, 285], lean: -0.14},
  walk: {lh: [66, 140], rh: [138, 150], lf: [88, 292], rf: [118, 285], lean: -0.03},
  sip: {lh: [70, 150], rh: [112, 58], lf: [78, 292], rf: [122, 292], lean: 0.05},
  phoneHeld: {lh: [58, 158], rh: [122, 48], lf: [78, 292], rf: [122, 292], lean: 0.03},
  holdStack: {lh: [66, 118], rh: [134, 118], lf: [78, 292], rf: [122, 292], lean: 0.04},
  recline: {lh: [60, 150], rh: [112, 58], lf: [176, 210], rf: [190, 224], lean: 0.3},
  laugh: {lh: [52, 90], rh: [148, 90], lf: [78, 292], rf: [122, 292], lean: 0.12},
};

function limb(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  bend: number,
): string {
  // two-segment limb with elbow/knee perpendicular bend
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const ex = mx + (-dy / len) * bend;
  const ey = my + (dx / len) * bend;
  return `M ${x1} ${y1} L ${ex} ${ey} L ${x2} ${y2}`;
}

const Face: React.FC<{e: Expression}> = ({e}) => {
  const stroke = "#1a1a1a";
  switch (e) {
    case "shocked":
      return (
        <g>
          <circle cx={88} cy={40} r={6.5} fill="#fff" stroke={stroke} strokeWidth={2.5} />
          <circle cx={112} cy={40} r={6.5} fill="#fff" stroke={stroke} strokeWidth={2.5} />
          <circle cx={88} cy={41} r={2.6} fill={stroke} />
          <circle cx={112} cy={41} r={2.6} fill={stroke} />
          <path d="M 78 30 Q 88 22 96 28" stroke={stroke} strokeWidth={3} fill="none" />
          <path d="M 104 28 Q 112 22 122 30" stroke={stroke} strokeWidth={3} fill="none" />
          <ellipse cx={100} cy={58} rx={8} ry={10} fill={stroke} />
        </g>
      );
    case "angry":
      return (
        <g>
          <path d="M 78 32 L 96 40" stroke={stroke} strokeWidth={4} strokeLinecap="round" />
          <path d="M 122 32 L 104 40" stroke={stroke} strokeWidth={4} strokeLinecap="round" />
          <circle cx={89} cy={46} r={3.4} fill={stroke} />
          <circle cx={111} cy={46} r={3.4} fill={stroke} />
          <path d="M 84 62 Q 100 52 116 62" stroke={stroke} strokeWidth={3.5} fill="none" strokeLinecap="round" />
        </g>
      );
    case "stressed":
      return (
        <g>
          <circle cx={88} cy={42} r={5} fill="#fff" stroke={stroke} strokeWidth={2.5} />
          <circle cx={112} cy={42} r={5} fill="#fff" stroke={stroke} strokeWidth={2.5} />
          <circle cx={88} cy={44} r={2.4} fill={stroke} />
          <circle cx={112} cy={44} r={2.4} fill={stroke} />
          <path d="M 80 32 Q 88 26 95 33" stroke={stroke} strokeWidth={3} fill="none" />
          <path d="M 105 33 Q 112 26 120 32" stroke={stroke} strokeWidth={3} fill="none" />
          <path d="M 86 60 Q 93 55 100 60 Q 107 65 114 60" stroke={stroke} strokeWidth={3.2} fill="none" strokeLinecap="round" />
        </g>
      );
    case "tired":
      return (
        <g>
          <path d="M 80 40 h 16 M 104 40 h 16" stroke={stroke} strokeWidth={3} strokeLinecap="round" />
          <circle cx={88} cy={46} r={3} fill={stroke} />
          <circle cx={112} cy={46} r={3} fill={stroke} />
          <path d="M 86 62 Q 100 56 114 62" stroke={stroke} strokeWidth={3.2} fill="none" strokeLinecap="round" />
        </g>
      );
    case "calm":
    case "happy":
      return (
        <g>
          <path d="M 80 44 Q 88 36 96 44" stroke={stroke} strokeWidth={3.5} fill="none" strokeLinecap="round" />
          <path d="M 104 44 Q 112 36 120 44" stroke={stroke} strokeWidth={3.5} fill="none" strokeLinecap="round" />
          {e === "happy" ? (
            <path d="M 82 56 Q 100 74 118 56" stroke={stroke} strokeWidth={3.5} fill={e === "happy" ? "#fff" : "none"} strokeLinecap="round" />
          ) : (
            <path d="M 86 58 Q 100 68 114 58" stroke={stroke} strokeWidth={3.2} fill="none" strokeLinecap="round" />
          )}
        </g>
      );
    case "suspicious":
      return (
        <g>
          <path d="M 78 36 L 96 40 M 122 34 L 104 39" stroke={stroke} strokeWidth={3.5} strokeLinecap="round" />
          <ellipse cx={88} cy={46} rx={4.5} ry={2.6} fill={stroke} />
          <ellipse cx={112} cy={45} rx={4.5} ry={2.6} fill={stroke} />
          <path d="M 88 62 Q 100 58 112 62" stroke={stroke} strokeWidth={3} fill="none" strokeLinecap="round" />
        </g>
      );
    default: // neutral
      return (
        <g>
          <circle cx={88} cy={42} r={3.6} fill={stroke} />
          <circle cx={112} cy={42} r={3.6} fill={stroke} />
          <path d="M 80 34 Q 88 30 96 34 M 104 34 Q 112 30 120 34" stroke={stroke} strokeWidth={2.8} fill="none" />
          <path d="M 88 60 Q 100 63 112 60" stroke={stroke} strokeWidth={3} fill="none" strokeLinecap="round" />
        </g>
      );
  }
};

export const Stickman: React.FC<Props> = ({
  t,
  expression = "neutral",
  pose = "stand",
  flip = false,
  color = "#1a1a1a",
  sweat = false,
  accessories = [],
  animSpeed = 0.25,
  animAmp = 0.4,
  bob = 0,
}) => {
  const p = POSES[pose];
  const wig = Math.sin(t * animSpeed) * 14 * animAmp;
  const wig2 = Math.sin(t * animSpeed + Math.PI) * 14 * animAmp;
  const bounce = Math.abs(Math.sin(t * animSpeed * 0.8)) * bob;

  const lhx = p.lh[0] + wig;
  const lhy = p.lh[1] + wig2 * 0.4;
  const rhx = p.rh[0] + wig2;
  const rhy = p.rh[1] + wig * 0.4;
  const lfx = p.lf[0] + (pose === "run" || pose === "walk" ? wig : 0);
  const lfy = p.lf[1] - Math.max(0, (pose === "run" ? wig2 : 0) * 0.8);
  const rfx = p.rf[0] + (pose === "run" || pose === "walk" ? wig2 : 0);
  const rfy = p.rf[1] - Math.max(0, (pose === "run" ? wig : 0) * 0.8);

  const hipX = HIP.x + p.lean * 100;
  const headX = 100 - p.lean * 40;

  return (
    <g transform={`translate(0 ${-bounce}) ${flip ? "scale(-1 1) translate(-200 0)" : ""}`}>
      {/* legs */}
      <path d={limb(hipX, HIP.y, lfx, lfy, 12)} stroke={color} strokeWidth={7} strokeLinecap="round" fill="none" />
      <path d={limb(hipX, HIP.y, rfx, rfy, -12)} stroke={color} strokeWidth={7} strokeLinecap="round" fill="none" />
      {/* torso */}
      <line x1={headX} y1={74} x2={hipX} y2={HIP.y} stroke={color} strokeWidth={7} strokeLinecap="round" />
      {/* tie */}
      {accessories.includes("tie") && (
        <path
          d={`M ${headX + (hipX - headX) * 0.25} 82 l 7 10 l -7 46 l -8 0 l 7 -46 z`}
          fill="#c0392b"
          transform={`rotate(${(hipX - headX) * 0.4} ${headX} 82)`}
        />
      )}
      {/* arms */}
      <path d={limb(SHOULDER.x + p.lean * 60, SHOULDER.y, lhx, lhy, 10)} stroke={color} strokeWidth={6.5} strokeLinecap="round" fill="none" />
      <path d={limb(SHOULDER.x + p.lean * 60, SHOULDER.y, rhx, rhy, -10)} stroke={color} strokeWidth={6.5} strokeLinecap="round" fill="none" />
      {/* held items */}
      {accessories.includes("books") && (
        <g
          transform={
            pose === "run" || pose === "walk"
              ? `translate(${lhx - 30} ${lhy - 34})`
              : "translate(70 96)"
          }
        >
          <rect x={0} y={0} width={60} height={15} rx={2} fill="#e8912d" stroke={color} strokeWidth={2.5} />
          <rect x={5} y={-15} width={60} height={15} rx={2} fill="#4d9dbb" stroke={color} strokeWidth={2.5} />
          <rect x={-2} y={-30} width={60} height={15} rx={2} fill="#b04d7a" stroke={color} strokeWidth={2.5} />
        </g>
      )}
      {accessories.includes("papers") && (
        <g transform={`translate(58 ${Math.min(lhy, rhy) - 60}) rotate(-4 42 40)`}>
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={i * 3} y={i * 22} width={84} height={20} rx={2} fill="#fff" stroke={color} strokeWidth={2} />
          ))}
        </g>
      )}
      {accessories.includes("mug") && (
        <g transform={`translate(${rhx - 6} ${rhy - 16})`}>
          <rect x={0} y={0} width={22} height={20} rx={3} fill="#fff" stroke={color} strokeWidth={2.5} />
          <path d="M 22 5 q 10 2 0 10" stroke={color} strokeWidth={2.5} fill="none" />
          <path d={`M 6 ${-6 - 4 * Math.sin(t * 0.15)} q 3 -6 0 -12 M 13 ${-6 - 4 * Math.sin(t * 0.15 + 1)} q 3 -6 0 -12`} stroke="#9aa" strokeWidth={2} fill="none" strokeLinecap="round" />
        </g>
      )}
      {accessories.includes("phone") && (
        <rect x={rhx - 7} y={rhy - 16} width={15} height={26} rx={3} fill="#222" />
      )}
      {/* head */}
      <g transform={`translate(${headX - 100} 0)`}>
        <circle cx={100} cy={44} r={30} fill="#fff" stroke={color} strokeWidth={7} />
        <Face e={expression} />
        {sweat && (
          <g>
            <path
              d={`M ${128 + 3 * Math.sin(t * 0.3)} 30 q 6 10 0 14 q -6 -4 0 -14`}
              fill="#4d9dbb"
            />
            <path
              d={`M ${66 - 3 * Math.sin(t * 0.3)} 44 q -6 10 0 14 q 6 -4 0 -14`}
              fill="#4d9dbb"
              opacity={0.9}
            />
          </g>
        )}
      </g>
    </g>
  );
};
