import React from "react";
import {useCurrentFrame, interpolate, Easing} from "remotion";
import {Office, FallingPaper, RingingPhone} from "../components/Office";
import {Stickman} from "../components/Stickman";
import {SpeechBubble, SlamText, PhoneCall} from "../components/UI";
import {Camera} from "../components/Camera";

/** SCENE 1 — THE HOOK (0–7s). Absolute frames 0–210. */
export const Scene1: React.FC = () => {
  const f = useCurrentFrame(); // 0..209

  // teacher bursts in at ~2.0s (f=60), slides in from right
  const teacherX = interpolate(f, [55, 72], [1250, 700], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  // admin enters at ~5.8s (f=174) from left
  const adminX = interpolate(f, [168, 186], [-320, 120], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  // headteacher is already under pressure from frame 0
  const htExpr = f > 190 ? "shocked" : "stressed";

  // papers pile grows slowly — chaos builds, not dumps
  const pile = Math.min(6, Math.floor(f / 55) + 3);

  return (
    <>
    <Camera
      stops={[
        [0, 1.14, -90, -140], // open tight on HT, pull back — motion from frame 0
        [60, 1.0, 0, 0],
        [150, 1.05, 0, -15],
        [195, 1.85, -240, -330], // punch zoom into HT face
        [209, 2.05, -255, -350],
      ]}
    >
      <Office paperPile={pile} />
      <RingingPhone active={f < 58} />

      {/* headteacher behind desk */}
      <div style={{position: "absolute", left: 330, top: 880, width: 260, height: 420}}>
        <svg viewBox="0 0 200 320" style={{width: "100%", height: "100%"}}>
          <Stickman t={f} expression={htExpr} pose="sit" accessories={["tie"]} sweat={f > 40} animAmp={f > 60 ? 0.8 : 0.5} />
        </svg>
      </div>

      {/* teacher bursts in with books — feet on floor */}
      {f > 52 && (
        <div style={{position: "absolute", left: teacherX, top: 1095, width: 240, height: 400}}>
          <svg viewBox="0 0 200 320" style={{width: "100%", height: "100%"}}>
            <Stickman t={f} expression={f < 190 ? "stressed" : "shocked"} pose={f < 75 ? "run" : "stand"} accessories={["books"]} animAmp={0.9} flip />
          </svg>
        </div>
      )}
      {f > 60 && f < 205 && (
        <SpeechBubble text="Sir! Parents' meeting in 10 min — records NOW!" x={520} y={860} tail="bottom-right" appear={62} w={540} />
      )}

      {/* parent on phone call */}
      {f > 118 && (
        <PhoneCall appear={120} x={640} y={180} ringing>
          <div style={{position: "absolute", left: 30, top: 60, width: 240, height: 260}}>
            <svg viewBox="0 0 200 320" style={{width: "100%", height: "100%"}}>
              <Stickman t={f} expression="angry" pose="phoneHeld" animAmp={0.9} animSpeed={0.4} />
            </svg>
          </div>
        </PhoneCall>
      )}
      {f > 128 && f < 205 && (
        <SpeechBubble text="I paid on M-Pesa Monday — where's my receipt?!" x={160} y={260} tail="bottom-right" appear={130} w={540} />
      )}

      {/* admin with huge paper stack */}
      {f > 165 && (
        <div style={{position: "absolute", left: adminX, top: 1109, width: 230, height: 390}}>
          <svg viewBox="0 0 200 320" style={{width: "100%", height: "100%"}}>
            <Stickman t={f} expression="stressed" pose="holdStack" accessories={["papers"]} sweat animAmp={0.6} />
          </svg>
        </div>
      )}
      {f > 178 && f < 205 && (
        <SpeechBubble text="Sir! Education office wants returns by FRIDAY!" x={60} y={960} tail="bottom-left" appear={180} w={540} />
      )}

      <FallingPaper seed={3} startFrame={175} />

    </Camera>

    {/* instant-context hook chip — pinned overlay, visible from the first beats */}
    {f < 100 && (
      <div
        style={{
          position: "absolute",
          top: 340,
          left: 60,
          scale: String(
            interpolate(f, [2, 14], [0, 1], {
              extrapolateRight: "clamp",
              extrapolateLeft: "clamp",
              easing: Easing.spring({damping: 12, stiffness: 220}),
            }),
          ),
          opacity: interpolate(f, [85, 98], [1, 0], {extrapolateRight: "clamp"}),
        }}
      >
        <div
          style={{
            background: "#103741",
            color: "#ffe27a",
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: 44,
            padding: "14px 34px",
            borderRadius: 20,
            border: "4px solid #1a1a1a",
            boxShadow: "6px 8px 0 rgba(16,55,65,0.25)",
            letterSpacing: 1,
          }}
        >
          POV: YOU RUN
          <br />
          A SCHOOL
        </div>
      </div>
    )}
    <SlamText text="RUNNING A SCHOOL IN 2026?" appear={195} y={280} size={88} />
    </>
  );
};
