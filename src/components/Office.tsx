import React from "react";
import {useCurrentFrame} from "remotion";

const INK = "#1a1a1a";

/** The headteacher's office — wall, floor, desk, phone, computer, noticeboard. */
export const Office: React.FC<{
  paperPile?: number; // 0..10 papers stacked on desk
  tidy?: boolean;
}> = ({paperPile = 3, tidy = false}) => {
  return (
    <svg
      viewBox="0 0 1080 1920"
      style={{position: "absolute", inset: 0, width: "100%", height: "100%"}}
    >
      {/* wall + floor */}
      <rect x={0} y={0} width={1080} height={1920} fill={tidy ? "#eef7f5" : "#f6efe3"} />
      <rect x={0} y={1450} width={1080} height={470} fill={tidy ? "#d7e8e4" : "#e2d3b8"} />
      <line x1={0} y1={1450} x2={1080} y2={1450} stroke={INK} strokeWidth={5} />

      {/* window */}
      <g>
        <rect x={760} y={180} width={240} height={300} rx={8} fill="#cfeaf5" stroke={INK} strokeWidth={5} />
        <line x1={880} y1={180} x2={880} y2={480} stroke={INK} strokeWidth={4} />
        <line x1={760} y1={330} x2={1000} y2={330} stroke={INK} strokeWidth={4} />
        <circle cx={810} cy={240} r={26} fill="#ffd75e" stroke={INK} strokeWidth={4} />
      </g>

      {/* noticeboard */}
      <g transform="translate(90 190)">
        <rect x={0} y={0} width={330} height={240} rx={10} fill="#c98d4b" stroke={INK} strokeWidth={5} />
        <rect x={14} y={14} width={302} height={212} fill="#e8b877" stroke={INK} strokeWidth={3} />
        {[
          {x: 40, y: 40, c: "#fff", r: -6},
          {x: 150, y: 34, c: "#ffe27a", r: 4},
          {x: 245, y: 60, c: "#fff", r: -3},
          {x: 70, y: 130, c: "#ffb3c7", r: 5},
          {x: 190, y: 140, c: "#fff", r: -5},
        ].map((n, i) => (
          <g key={i} transform={`translate(${n.x} ${n.y}) rotate(${n.r} 40 30)`}>
            <rect x={0} y={0} width={80} height={64} fill={n.c} stroke={INK} strokeWidth={2.5} />
            <line x1={10} y1={18} x2={70} y2={18} stroke={INK} strokeWidth={2} opacity={0.4} />
            <line x1={10} y1={30} x2={62} y2={30} stroke={INK} strokeWidth={2} opacity={0.4} />
            <line x1={10} y1={42} x2={54} y2={42} stroke={INK} strokeWidth={2} opacity={0.4} />
          </g>
        ))}
      </g>

      {/* bookshelf, right side */}
      <g transform="translate(880 620)">
        <rect x={0} y={0} width={150} height={360} fill="#a06a35" stroke={INK} strokeWidth={5} />
        {[0, 1, 2].map((s) => (
          <g key={s}>
            <line x1={0} y1={90 + s * 110} x2={150} y2={90 + s * 110} stroke={INK} strokeWidth={4} />
            {[0, 1, 2, 3].map((b) => (
              <rect
                key={b}
                x={12 + b * 33}
                y={90 + s * 110 - 62}
                width={26}
                height={62}
                fill={["#e8912d", "#4d9dbb", "#b04d7a", "#2e9e6b"][(b + s) % 4]}
                stroke={INK}
                strokeWidth={2.5}
              />
            ))}
          </g>
        ))}
      </g>

      {/* door, left */}
      <g>
        <rect x={30} y={620} width={230} height={830} fill="#caa06a" stroke={INK} strokeWidth={6} />
        <rect x={55} y={660} width={180} height={300} fill="none" stroke={INK} strokeWidth={3} />
        <rect x={55} y={1010} width={180} height={380} fill="none" stroke={INK} strokeWidth={3} />
        <circle cx={225} cy={1040} r={12} fill="#ffd75e" stroke={INK} strokeWidth={4} />
      </g>

      {/* desk */}
      <g transform="translate(0 0)">
        <rect x={230} y={1150} width={620} height={42} rx={8} fill="#8a5a2e" stroke={INK} strokeWidth={6} />
        <rect x={255} y={1192} width={60} height={270} fill="#8a5a2e" stroke={INK} strokeWidth={6} />
        <rect x={765} y={1192} width={60} height={270} fill="#8a5a2e" stroke={INK} strokeWidth={6} />
        {/* desk drawer detail */}
        <line x1={330} y1={1230} x2={700} y2={1230} stroke={INK} strokeWidth={3} opacity={0.3} />
      </g>

      {/* computer on desk */}
      <g transform="translate(600 980)">
        <rect x={0} y={0} width={200} height={140} rx={10} fill={tidy ? "#dff3ee" : "#e8e8ec"} stroke={INK} strokeWidth={6} />
        <rect x={85} y={140} width={30} height={32} fill="#999" stroke={INK} strokeWidth={4} />
        <rect x={50} y={170} width={100} height={14} rx={4} fill="#bbb" stroke={INK} strokeWidth={4} />
        {tidy ? (
          <g>
            <rect x={16} y={16} width={168} height={22} rx={4} fill="#4d9dbb" />
            <rect x={16} y={48} width={80} height={12} rx={3} fill="#2e9e6b" />
            <rect x={104} y={48} width={80} height={12} rx={3} fill="#e8912d" />
            <rect x={16} y={70} width={168} height={52} rx={4} fill="#fff" stroke={INK} strokeWidth={2} />
            <path d="M 26 108 L 60 84 L 90 100 L 120 74 L 150 92 L 174 78" stroke="#2e9e6b" strokeWidth={4} fill="none" strokeLinecap="round" />
          </g>
        ) : (
          <g opacity={0.55}>
            <line x1={20} y1={30} x2={180} y2={30} stroke={INK} strokeWidth={4} />
            <line x1={20} y1={50} x2={160} y2={50} stroke={INK} strokeWidth={4} />
            <line x1={20} y1={70} x2={170} y2={70} stroke={INK} strokeWidth={4} />
            <line x1={20} y1={90} x2={120} y2={90} stroke={INK} strokeWidth={4} />
          </g>
        )}
      </g>

      {/* phone on desk — wiggles when ringing via prop-less pulse handled by scenes overlaying RingingPhone */}
      <g transform="translate(285 1090)">
        <rect x={0} y={30} width={110} height={40} rx={10} fill="#c0392b" stroke={INK} strokeWidth={5} />
        <rect x={8} y={0} width={94} height={26} rx={12} fill="#e74c3c" stroke={INK} strokeWidth={5} />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={30 + i * 25} cy={50} r={6} fill="#fff" stroke={INK} strokeWidth={2} />
        ))}
      </g>

      {/* paper pile on desk */}
      <g transform="translate(430 1150)">
        {Array.from({length: Math.min(paperPile, 10)}).map((_, i) => (
          <rect
            key={i}
            x={i * 4}
            y={-14 * i - 16}
            width={120}
            height={14}
            rx={3}
            fill="#fff"
            stroke={INK}
            strokeWidth={3}
            transform={`rotate(${(i % 3) - 1} 60 ${-14 * i})`}
          />
        ))}
      </g>
      <rect x={0} y={0} width={0} height={0} fill="none" />
    </svg>
  );
};

/** A paper that tumbles down — position driven by local frame. */
export const FallingPaper: React.FC<{
  seed: number;
  startFrame: number;
  x0?: number;
}> = ({seed, startFrame, x0}) => {
  const f = useCurrentFrame();
  const local = f - startFrame;
  if (local < 0) return null;
  const rnd = (n: number) => {
    const x = Math.sin(seed * 999 + n * 77.7) * 0.5 + 0.5;
    return x;
  };
  const x = (x0 ?? 120 + rnd(0) * 840) + Math.sin(local * 0.11 + seed) * 60;
  const y = -140 + local * (7 + rnd(1) * 5);
  if (y > 2000) return null;
  const rot = local * (3 + rnd(2) * 6) + seed * 40;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 90,
        height: 110,
        background: "#fff",
        border: "3px solid #1a1a1a",
        borderRadius: 4,
        rotate: `${rot}deg`,
        boxShadow: "2px 4px 0 rgba(0,0,0,0.12)",
      }}
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: 12,
            right: 12,
            top: 16 + i * 18,
            height: 3,
            background: "#1a1a1a",
            opacity: 0.35,
          }}
        />
      ))}
    </div>
  );
};

/** Ringing handset overlay placed over the desk phone. */
export const RingingPhone: React.FC<{active: boolean}> = ({active}) => {
  const f = useCurrentFrame();
  if (!active) return null;
  const wig = Math.sin(f * 1.5) * 6;
  return (
    <div
      style={{
        position: "absolute",
        left: 283,
        top: 1082,
        width: 116,
        height: 90,
        rotate: `${wig}deg`,
        transformOrigin: "50% 100%",
      }}
    >
      <svg viewBox="0 0 116 90" style={{width: "100%", height: "100%"}}>
        {[0, 1].map((i) => (
          <path
            key={i}
            d={`M ${18 - i * 10} ${34 - i * 12} q -14 8 -14 22 M ${98 + i * 10} ${34 - i * 12} q 14 8 14 22`}
            stroke="#c0392b"
            strokeWidth={5}
            fill="none"
            strokeLinecap="round"
            opacity={1 - ((f * 0.08 + i * 0.5) % 1)}
          />
        ))}
      </svg>
    </div>
  );
};
