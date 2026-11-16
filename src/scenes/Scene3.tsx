import React from "react";
import {useCurrentFrame, interpolate, Easing} from "remotion";
import {Office} from "../components/Office";
import {Stickman} from "../components/Stickman";
import {SpeechBubble} from "../components/UI";
import {Camera} from "../components/Camera";

/** SCENE 3 — THE TWIST (21–30.5s). Absolute 630–915, local 0–285. */
export const Scene3: React.FC = () => {
  const f = useCurrentFrame();

  // calm teacher strolls in from right at local ~12f, stops mid-room
  const walkIn = interpolate(f, [12, 78], [1300, 700], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
  const walking = f < 82;

  const htExpr = f > 265 ? "suspicious" : f > 180 ? "tired" : "tired";
  const calmExpr = f > 190 ? "happy" : "calm";

  return (
    <Camera
      stops={[
        [0, 1.0, 0, 0],
        [150, 1.0, 0, 0],
        [215, 1.28, -160, -180], // "Have you tried MwalimuEase?"
        [262, 2.0, -300, -300], // "Mwali... what?" punch zoom
        [284, 2.2, -310, -320],
      ]}
    >
      <Office paperPile={8} />

      {/* headteacher slumped at desk */}
      <div style={{position: "absolute", left: 330, top: 880, width: 260, height: 420}}>
        <svg viewBox="0 0 200 320" style={{width: "100%", height: "100%"}}>
          <Stickman t={f} expression={htExpr} pose={f > 178 ? "sit" : "facepalm"} accessories={["tie"]} animAmp={0.15} />
        </svg>
      </div>

      {/* calm teacher — unbothered */}
      <div style={{position: "absolute", left: walkIn, top: 950, width: 240, height: 400}}>
        <svg viewBox="0 0 200 320" style={{width: "100%", height: "100%"}}>
          <Stickman
            t={f}
            expression={calmExpr}
            pose={walking ? "walk" : f > 180 ? "point" : "stand"}
            animAmp={walking ? 0.8 : 0.2}
            flip
          />
        </svg>
      </div>

      {/* dialogue bubbles */}
      {f > 20 && f < 95 && (
        <SpeechBubble text="Sir... why are you doing all this the hard way?" x={400} y={560} tail="bottom-right" appear={24} w={560} />
      )}
      {f > 118 && f < 160 && (
        <SpeechBubble text="What do you mean?" x={140} y={600} tail="bottom-left" appear={120} w={420} />
      )}
      {f > 160 && f < 235 && (
        <SpeechBubble text="Have you tried... MwalimuEase?" x={430} y={540} tail="bottom-right" appear={163} w={560} color="#dff3ee" />
      )}
      {f > 252 && (
        <SpeechBubble text="Mwali... what?" x={150} y={620} tail="bottom-left" appear={255} w={420} color="#ffe27a" />
      )}

      {/* sparkle burst on "MwalimuEase" mention ~ local 190 */}
      {f > 188 && f < 240 && (
        <div style={{position: "absolute", left: 560, top: 420, zIndex: 45}}>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
            const ang = (i / 8) * Math.PI * 2;
            const r = interpolate(f, [188, 228], [0, 160], {
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.quad),
            });
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: Math.cos(ang) * r,
                  top: Math.sin(ang) * r,
                  width: 14,
                  height: 14,
                  background: "#2e9e6b",
                  rotate: "45deg",
                  opacity: interpolate(f, [210, 238], [1, 0], {extrapolateRight: "clamp"}),
                }}
              />
            );
          })}
        </div>
      )}
    </Camera>
  );
};
