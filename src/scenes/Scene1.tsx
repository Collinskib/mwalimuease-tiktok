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
  const adminX = interpolate(f, [168, 186], [-320, 270], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  // headteacher expression escalation
  const htExpr =
    f > 190 ? "shocked" : f > 168 ? "stressed" : f > 120 ? "stressed" : f > 60 ? "tired" : "neutral";

  // papers pile grows
  const pile = Math.min(10, Math.floor(f / 22) + 2);

  return (
    <>
    <Camera
      stops={[
        [0, 1.0, 0, 0],
        [150, 1.06, 0, -20],
        [195, 1.9, -240, -330], // punch zoom into HT face
        [209, 2.15, -260, -360],
      ]}
      shakeAt={[60, 130]}
      shakeAmp={5}
    >
      <Office paperPile={pile} />
      <RingingPhone active={(f > 12 && f < 60) || (f > 100 && f < 150) || f > 175} />

      {/* headteacher behind desk */}
      <div style={{position: "absolute", left: 330, top: 880, width: 260, height: 420}}>
        <svg viewBox="0 0 200 320" style={{width: "100%", height: "100%"}}>
          <Stickman t={f} expression={htExpr} pose="sit" accessories={["tie"]} sweat={f > 100} animAmp={f > 120 ? 0.8 : 0.2} />
        </svg>
      </div>

      {/* teacher bursts in with books */}
      {f > 52 && (
        <div style={{position: "absolute", left: teacherX, top: 900, width: 240, height: 400}}>
          <svg viewBox="0 0 200 320" style={{width: "100%", height: "100%"}}>
            <Stickman t={f} expression={f < 190 ? "stressed" : "shocked"} pose={f < 75 ? "run" : "stand"} accessories={["books"]} animAmp={0.9} flip />
          </svg>
        </div>
      )}
      {f > 60 && f < 205 && (
        <SpeechBubble text="Sir! I need the student records!" x={520} y={640} tail="bottom-right" appear={62} />
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
        <SpeechBubble text="I've been trying to get an update about my child's fees!" x={160} y={260} tail="bottom-right" appear={130} w={520} />
      )}

      {/* admin with huge paper stack */}
      {f > 165 && (
        <div style={{position: "absolute", left: adminX, top: 920, width: 230, height: 390}}>
          <svg viewBox="0 0 200 320" style={{width: "100%", height: "100%"}}>
            <Stickman t={f} expression="stressed" pose="holdStack" accessories={["papers"]} sweat animAmp={0.6} />
          </svg>
        </div>
      )}
      {f > 178 && f < 205 && (
        <SpeechBubble text="Sir, we also need the school reports!" x={60} y={700} tail="bottom-left" appear={180} w={520} />
      )}

      <FallingPaper seed={1} startFrame={40} />
      <FallingPaper seed={2} startFrame={90} />
      <FallingPaper seed={3} startFrame={140} />
      <FallingPaper seed={4} startFrame={170} />

    </Camera>
    <SlamText text="RUNNING A SCHOOL IN 2026?" appear={195} y={280} size={88} />
    </>
  );
};
