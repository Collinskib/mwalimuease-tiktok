import React from "react";
import {useCurrentFrame, useVideoConfig, interpolate, Easing, staticFile, Sequence} from "remotion";
import {Audio} from "@remotion/media";
import {LINES, SFX, SPEAKER_STYLE, FPS} from "../timeline";

const INK = "#1a1a1a";

/** Comic speech bubble with a tail pointing at the speaker. */
export const SpeechBubble: React.FC<{
  text: string;
  x: number;
  y: number;
  tail?: "left" | "right" | "bottom-left" | "bottom-right";
  appear: number; // local frame to pop in
  big?: boolean;
  color?: string;
  w?: number;
}> = ({text, x, y, tail = "bottom-left", appear, big = false, color = "#fff", w}) => {
  const f = useCurrentFrame();
  const local = f - appear;
  if (local < 0) return null;
  const s = interpolate(local, [0, 8], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.spring({damping: 12, stiffness: 200}),
  });
  const width = w ?? (big ? 640 : Math.min(560, 130 + text.length * 15));
  const fontSize = big ? 52 : 36;
  const lines: string[] = [];
  const words = text.split(" ");
  let cur = "";
  const perLine = Math.max(8, Math.floor(width / (fontSize * 0.52)));
  for (const wd of words) {
    if ((cur + " " + wd).trim().length > perLine) {
      lines.push(cur.trim());
      cur = wd;
    } else {
      cur = cur + " " + wd;
    }
  }
  lines.push(cur.trim());
  const height = 34 + lines.length * (fontSize * 1.18);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        scale: String(s),
        transformOrigin: tail.includes("left") ? "15% 100%" : "85% 100%",
        zIndex: 40,
      }}
    >
      <div
        style={{
          position: "relative",
          width,
          minHeight: height,
          background: color,
          border: `5px solid ${INK}`,
          borderRadius: 26,
          padding: "14px 22px",
          fontFamily: "'Patrick Hand', 'Comic Sans MS', cursive",
          fontSize,
          lineHeight: 1.18,
          color: INK,
          fontWeight: 700,
          textAlign: "center",
          boxShadow: "4px 6px 0 rgba(0,0,0,0.15)",
        }}
      >
        {lines.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
        {/* tail */}
        <div
          style={{
            position: "absolute",
            bottom: -22,
            [tail.includes("left") ? "left" : "right"]: 46,
            width: 0,
            height: 0,
            borderLeft: "14px solid transparent",
            borderRight: "14px solid transparent",
            borderTop: `24px solid ${INK}`,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -13,
            [tail.includes("left") ? "left" : "right"]: 50,
            width: 0,
            height: 0,
            borderLeft: "10px solid transparent",
            borderRight: "10px solid transparent",
            borderTop: `19px solid ${color}`,
          }}
        />
      </div>
    </div>
  );
};

/** Big on-screen headline text that slams in. */
export const SlamText: React.FC<{
  text: string;
  appear: number;
  y?: number;
  size?: number;
  color?: string;
  sub?: string;
  until?: number;
}> = ({text, appear, y = 240, size = 92, color = "#103741", sub, until}) => {
  const f = useCurrentFrame();
  const local = f - appear;
  if (local < 0) return null;
  if (until !== undefined && f > until) return null;
  const s = interpolate(local, [0, 7], [2.4, 1], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const op = interpolate(local, [0, 4], [0, 1], {extrapolateRight: "clamp"});
  return (
    <div
      style={{
        position: "absolute",
        top: y,
        left: 0,
        right: 0,
        textAlign: "center",
        scale: String(s),
        opacity: op,
        zIndex: 60,
      }}
    >
      <div
        style={{
          fontFamily: "'Archivo Black', 'Arial Black', sans-serif",
          fontSize: size,
          color,
          WebkitTextStroke: `3px ${INK === color ? "#fff" : "rgba(255,255,255,0.85)"}`,
          textShadow: "6px 6px 0 rgba(0,0,0,0.18)",
          letterSpacing: 1,
          padding: "0 40px",
        }}
      >
        {text}
      </div>
      {sub && (
        <div
          style={{
            marginTop: 14,
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: size * 0.5,
            color: "#c0392b",
            textShadow: "4px 4px 0 rgba(255,255,255,0.8)",
          }}
        >
          {sub}
        </div>
      )}
    </div>
  );
};

/** Bottom TikTok-style captions, driven by the shared LINES timeline. */
export const Captions: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const active = LINES.filter((l) => t >= l.start && t <= l.start + l.dur + 0.15);
  if (active.length === 0) return null;
  return (
    <div
      style={{
        position: "absolute",
        bottom: 260,
        left: 40,
        right: 40,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        zIndex: 80,
      }}
    >
      {active.slice(-1).map((l) => {
        const st = SPEAKER_STYLE[l.speaker];
        return (
          <div
            key={l.file}
            style={{
              background: "rgba(16,20,24,0.82)",
              borderRadius: 18,
              padding: "12px 22px",
              maxWidth: 940,
              border: `3px solid ${st.color}`,
            }}
          >
            <span
              style={{
                color: st.color === "#103741" ? "#7DC8E8" : lighten(st.color),
                fontFamily: "'Inter', sans-serif",
                fontWeight: 800,
                fontSize: 26,
                letterSpacing: 1.5,
                marginRight: 12,
              }}
            >
              {st.label}:
            </span>
            <span
              style={{
                color: "#fff",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: 34,
                lineHeight: 1.25,
              }}
            >
              {l.text}
            </span>
          </div>
        );
      })}
    </div>
  );
};

function lighten(hex: string) {
  return hex; // accent colors already bright enough
}

/** Video-call inset showing the parent on a phone. */
export const PhoneCall: React.FC<{
  appear: number;
  x?: number;
  y?: number;
  children: React.ReactNode;
  ringing?: boolean;
}> = ({appear, x = 620, y = 170, children, ringing}) => {
  const f = useCurrentFrame();
  const local = f - appear;
  if (local < 0) return null;
  const s = interpolate(local, [0, 8], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.spring({damping: 13, stiffness: 220}),
  });
  const jig = ringing ? Math.sin(f * 1.2) * 3 : 0;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        scale: String(s),
        rotate: `${jig}deg`,
        zIndex: 50,
      }}
    >
      <div
        style={{
          width: 300,
          height: 380,
          background: "#10222b",
          border: "6px solid #1a1a1a",
          borderRadius: 30,
          overflow: "hidden",
          boxShadow: "6px 8px 0 rgba(0,0,0,0.2)",
        }}
      >
        <div style={{height: 26, background: "#1a1a1a", borderRadius: "0 0 12px 12px", width: 110, margin: "0 auto"}} />
        <div style={{position: "relative", height: 310, background: "#d8ecf4"}}>{children}</div>
        <div
          style={{
            position: "absolute",
            bottom: 8,
            left: "50%",
            width: 60,
            height: 6,
            borderRadius: 3,
            background: "#fff",
            opacity: 0.7,
            translate: "-50%",
          }}
        />
      </div>
    </div>
  );
};

/** All audio: dialogue, SFX, music beds. Placed once for the whole video. */
export const AudioTrack: React.FC = () => {
  const {fps} = useVideoConfig();
  const f = useCurrentFrame();
  const t = f / fps;
  // tension bed under scenes 1-2 (0-16.6s), quirky bed from scene 3 to end
  const tensionVol = interpolate(t, [0, 0.5, 16.0, 16.8], [0, 0.24, 0.24, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bedVol = interpolate(
    t,
    [20.6, 22, 46.0, 47.4, 56.2, 57.0, 61.5, 62.6],
    [0, 0.18, 0.18, 0.13, 0.13, 0.16, 0.16, 0],
    {extrapolateLeft: "clamp", extrapolateRight: "clamp"},
  );
  return (
    <>
      {LINES.map((l) => (
        <Sequence
          key={l.file}
          from={Math.round(l.start * fps)}
          durationInFrames={Math.ceil((l.dur + 0.3) * fps)}
        >
          <Audio src={staticFile(`audio/${l.file}.mp3`)} />
        </Sequence>
      ))}
      {SFX.map((s, i) => (
        <Sequence key={i} from={Math.round(s.start * fps)} durationInFrames={5 * fps}>
          <Audio src={staticFile(`audio/${s.file}.mp3`)} volume={s.volume ?? 1} />
        </Sequence>
      ))}
      <Audio src={staticFile("audio/music_tension.mp3")} volume={tensionVol} loop />
      <Audio src={staticFile("audio/music_bed.mp3")} volume={bedVol} loop />
    </>
  );
};
