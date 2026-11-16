import React from "react";
import {useCurrentFrame, interpolate, Easing} from "remotion";
import {Office, FallingPaper, RingingPhone} from "../components/Office";
import {Stickman} from "../components/Stickman";
import {SpeechBubble, SlamText, PhoneCall} from "../components/UI";

const FREEZE = 285; // local frame where time stops (~16.5s abs)

/** SCENE 2 — THE CHAOS (7–21s). Absolute frames 210–630, local 0–420. */
export const Scene2: React.FC = () => {
  const f = useCurrentFrame();
  const frozen = f >= FREEZE;
  // animation clock: freezes at FREEZE
  const at = frozen ? FREEZE : f;

  // rapid head turn: HT looks left/right toward whoever is shouting
  const lookPhase = Math.floor(f / 24) % 2; // flips ~every 0.8s
  const htExpr = frozen
    ? "tired"
    : f > 200
      ? "angry"
      : lookPhase === 0
        ? "stressed"
        : "shocked";

  // HT pops up onto the desk for the "ONE AT A TIME" outburst and stays there
  const outburst = f >= 195 && f < FREEZE;
  const htY = f >= 195
    ? interpolate(f, [195, 205], [880, 770], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.quad),
      })
    : 880;

  // stress meter climbs with each interruption, pegs at the outburst
  const stress = frozen
    ? 100
    : Math.min(
        100,
        interpolate(f, [8, 22], [0, 12], {extrapolateRight: "clamp", extrapolateLeft: "clamp"}) +
          interpolate(f, [22, 30], [0, 23], {extrapolateLeft: "clamp", extrapolateRight: "clamp"}) +
          interpolate(f, [85, 93], [0, 33], {extrapolateLeft: "clamp", extrapolateRight: "clamp"}) +
          interpolate(f, [132, 140], [0, 24], {extrapolateLeft: "clamp", extrapolateRight: "clamp"}) +
          interpolate(f, [195, 205], [0, 8], {extrapolateLeft: "clamp", extrapolateRight: "clamp"}),
      );

  // freeze fade to slight desaturation via gray overlay
  const freezeOverlay = interpolate(f, [FREEZE, FREEZE + 15], [0, 0.28], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // slow push during freeze, then HT "turns to camera" (scale-up head)
  const camZoom = frozen
    ? interpolate(f, [FREEZE, FREEZE + 90], [1.05, 1.9], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : interpolate(f, [0, 190], [1.0, 1.12], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });

  return (
    <>
      <div
        style={{
          position: "absolute",
          inset: 0,
          scale: String(camZoom),
          translate: frozen
            ? `${interpolate(f, [FREEZE, FREEZE + 90], [0, -250], {extrapolateLeft: "clamp", extrapolateRight: "clamp"})}px ${interpolate(f, [FREEZE, FREEZE + 90], [0, -320], {extrapolateLeft: "clamp", extrapolateRight: "clamp"})}px`
            : "0px -40px",
        }}
      >
        <Office paperPile={10} />
        <RingingPhone active={!frozen && (f % 55 < 30)} />

        {/* headteacher — spinning plate act */}
        <div style={{position: "absolute", left: 330, top: htY, width: 260, height: 430}}>
          <svg viewBox="0 0 200 320" style={{width: "100%", height: "100%"}}>
            <Stickman
              t={at}
              expression={htExpr}
              pose={outburst ? "armsUp" : frozen ? "stand" : "sit"}
              accessories={["tie"]}
              sweat={!frozen}
              animAmp={frozen ? 0.05 : 1}
              animSpeed={0.5}
            />
          </svg>
        </div>

        {/* teacher — left side shouting, feet on floor */}
        <div style={{position: "absolute", left: 60, top: 1109, width: 230, height: 390}}>
          <svg viewBox="0 0 200 320" style={{width: "100%", height: "100%"}}>
            <Stickman
              t={at}
              expression={f % 48 < 24 ? "stressed" : "neutral"}
              pose={f % 96 < 50 ? "point" : "stand"}
              accessories={["books"]}
              animAmp={frozen ? 0 : 0.7}
            />
          </svg>
        </div>
        {f > 22 && f < 110 && !frozen && (
          <SpeechBubble text="Sir, where is the information?" x={60} y={950} tail="bottom-left" appear={24} w={480} />
        )}

        {/* admin — right side with papers, feet on floor */}
        <div style={{position: "absolute", left: 800, top: 1124, width: 220, height: 380}}>
          <svg viewBox="0 0 200 320" style={{width: "100%", height: "100%"}}>
            <Stickman
              t={at}
              expression="stressed"
              pose={f % 80 < 40 ? "holdStack" : "shrug"}
              accessories={["papers"]}
              sweat={!frozen}
              animAmp={frozen ? 0 : 0.7}
              flip
            />
          </svg>
        </div>
        {f > 85 && f < 160 && !frozen && (
          <SpeechBubble text="Which file has the latest records?" x={480} y={950} tail="bottom-right" appear={88} w={480} />
        )}

        {/* parent calls again */}
        {f > 130 && f < 200 && !frozen && (
          <PhoneCall appear={132} x={620} y={170} ringing>
            <div style={{position: "absolute", left: 30, top: 60, width: 240, height: 260}}>
              <svg viewBox="0 0 200 320" style={{width: "100%", height: "100%"}}>
                <Stickman t={at} expression="angry" pose="phoneHeld" animAmp={0.9} animSpeed={0.45} />
              </svg>
            </div>
          </PhoneCall>
        )}
        {f > 140 && f < 195 && (
          <SpeechBubble text="So... are you going to answer me?" x={140} y={330} tail="bottom-right" appear={142} w={460} />
        )}

        {/* outburst */}
        {outburst && (
          <SpeechBubble text="ONE AT A TIME! PLEASE!" x={200} y={560} tail="bottom-left" appear={198} big w={680} color="#ffe27a" />
        )}

        {/* paper storm */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <FallingPaper key={i} seed={i + 10} startFrame={i * 18} />
        ))}

        {/* freeze gray veil + vignette */}
        {frozen && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `rgba(40,50,60,${freezeOverlay})`,
            }}
          />
        )}
      </div>

      {/* STRESS meter — pinned overlay, climbs with each interruption */}
      <div
        style={{
          position: "absolute",
          top: 40,
          right: 40,
          zIndex: 50,
          background: "rgba(255,255,255,0.92)",
          border: "4px solid #1a1a1a",
          borderRadius: 18,
          padding: "10px 18px",
          boxShadow: "5px 6px 0 rgba(16,55,65,0.2)",
          scale: String(frozen ? 1 + 0.06 * Math.sin(f * 0.5) : 1),
        }}
      >
        <div
          style={{
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: 26,
            color: stress >= 100 ? "#c0392b" : "#103741",
            letterSpacing: 1,
          }}
        >
          STRESS {stress >= 100 ? "MAX" : `${Math.round(stress)}%`}
        </div>
        <div
          style={{
            marginTop: 6,
            width: 300,
            height: 22,
            background: "#e3ded4",
            borderRadius: 11,
            border: "3px solid #1a1a1a",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${stress * 3}px`,
              height: "100%",
              background:
                stress >= 100 ? "#c0392b" : stress >= 66 ? "#e8912d" : "#e6b93c",
            }}
          />
        </div>
      </div>

      {/* to-camera monologue text */}
      {frozen && (
        <>
          <div
            style={{
              position: "absolute",
              bottom: 420,
              left: 0,
              right: 0,
              textAlign: "center",
              zIndex: 70,
              opacity: interpolate(f, [FREEZE + 40, FREEZE + 60], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            <div
              style={{
                fontFamily: "'Patrick Hand', cursive",
                fontSize: 58,
                color: "#fff",
                textShadow: "3px 3px 0 rgba(0,0,0,0.6)",
                fontStyle: "italic",
              }}
            >
              "Is running a school supposed
              <br />
              to feel like this?"
            </div>
          </div>
          <SlamText text="EVERY. SINGLE. DAY." appear={FREEZE + 95} y={240} size={96} color="#c0392b" />
        </>
      )}
    </>
  );
};
