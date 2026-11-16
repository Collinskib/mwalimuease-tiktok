import React from "react";
import {useCurrentFrame, interpolate, Easing, staticFile, Img} from "remotion";
import {Office} from "../components/Office";
import {Stickman} from "../components/Stickman";
import {SpeechBubble} from "../components/UI";

const BRAND_AT = 285; // local frame the brand card sweeps in (~56.5s abs)

/** SCENE 5 — PAYOFF + CTA (47–63s). Absolute 1410–1890, local 0–480. */
export const Scene5: React.FC = () => {
  const f = useCurrentFrame();

  const teacherX = interpolate(f, [55, 72], [1250, 640], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
  const laughing = f > 240 && f < BRAND_AT + 5;

  // camera life: snap in on teacher's panic, punch on HT's callback, push on the laugh
  const camZoom = interpolate(
    f,
    [52, 66, 140, 160, 176, 230, 245, BRAND_AT],
    [1, 1.08, 1.08, 1.2, 1.2, 1.12, 1.15, 1.15],
    {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad)},
  );
  const camX = interpolate(
    f,
    [52, 66, 140, 160, 176, 230],
    [0, -120, -120, -80, -80, -60],
    {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad)},
  );
  const camY = interpolate(
    f,
    [52, 66, 140, 160, 176, 230],
    [0, -80, -80, -140, -140, -100],
    {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad)},
  );

  // brand card sweep
  const brandX = interpolate(f, [BRAND_AT, BRAND_AT + 22], [1200, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const logoPop = interpolate(f, [BRAND_AT + 24, BRAND_AT + 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.spring({damping: 10, stiffness: 160}),
  });
  const textUp = interpolate(f, [BRAND_AT + 42, BRAND_AT + 60], [60, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
  const textOp = interpolate(f, [BRAND_AT + 42, BRAND_AT + 56], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fade = interpolate(f, [470, 479], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{position: "absolute", inset: 0, opacity: fade}}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          scale: String(camZoom),
          translate: `${camX}px ${camY}px`,
        }}
      >
        {/* calm office — same room, now tidy */}
        <Office paperPile={0} tidy />

        {/* relaxed headteacher — feet up, tea in hand */}
        <div style={{position: "absolute", left: 320, top: 900, width: 280, height: 430}}>
          <svg viewBox="0 0 200 320" style={{width: "100%", height: "100%"}}>
            <Stickman
              t={f}
              expression={laughing ? "happy" : "calm"}
              pose={laughing ? "laugh" : f > 160 ? "point" : "recline"}
              accessories={["tie", "mug"]}
              animAmp={laughing ? 0.9 : 0.4}
              bob={laughing ? 8 : 4}
            />
          </svg>
        </div>

        {/* teacher bursts in with "another problem" */}
        {f > 52 && f < BRAND_AT + 8 && (
          <div style={{position: "absolute", left: teacherX, top: 1105, width: 230, height: 390}}>
            <svg viewBox="0 0 200 320" style={{width: "100%", height: "100%"}}>
              <Stickman
                t={f}
                expression={laughing ? "happy" : f < 160 ? "stressed" : "shocked"}
                pose={laughing ? "laugh" : f < 75 ? "run" : f % 90 < 45 ? "shrug" : "point"}
                accessories={["books"]}
                animAmp={laughing ? 0.9 : 0.75}
                bob={laughing ? 8 : 4}
                flip
              />
            </svg>
          </div>
        )}
        {f > 62 && f < 160 && (
          <SpeechBubble text="Sir! I have another problem!" x={430} y={660} tail="bottom-right" appear={64} w={500} />
        )}
        {f > 160 && f < 240 && (
          <SpeechBubble text="Have you tried MwalimuEase?" x={90} y={600} tail="bottom-left" appear={164} w={560} color="#dff3ee" />
        )}
      </div>

      {/* laugh pops — comedic payoff beat */}
      {laughing &&
        [
          {x: 130, y: 430, at: 244},
          {x: 720, y: 380, at: 254},
          {x: 380, y: 330, at: 264},
        ].map((h, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: h.x,
              top: h.y,
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: 64,
              color: "#e8912d",
              WebkitTextStroke: "3px #1a1a1a",
              scale: String(
                interpolate(f, [h.at, h.at + 8], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.spring({damping: 8, stiffness: 320}),
                }),
              ),
              rotate: `${i % 2 === 0 ? -8 : 10}deg`,
              opacity: interpolate(f, [278, 292], [1, 0], {
                extrapolateRight: "clamp",
              }),
            }}
          >
            HA!
          </div>
        ))}

      {/* BRAND CARD */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          left: brandX,
          background: "linear-gradient(160deg, #103741 0%, #1d5a70 55%, #4d9dbb 100%)",
          zIndex: 90,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* subtle animated rings */}
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 700 + i * 220,
              height: 700 + i * 220,
              borderRadius: "50%",
              border: "2px solid rgba(125,200,232,0.18)",
              scale: String(1 + 0.04 * Math.sin(f * 0.05 + i)),
            }}
          />
        ))}
        <div
          style={{
            scale: String(logoPop),
            width: 240,
            height: 240,
            borderRadius: 56,
            overflow: "hidden",
            boxShadow: "0 18px 50px rgba(0,0,0,0.35)",
            marginBottom: 46,
            position: "relative",
          }}
        >
          <Img src={staticFile("img/logo.png")} style={{width: "100%", height: "100%"}} />
          {/* shine sweep across logo */}
          <div
            style={{
              position: "absolute",
              top: -40,
              bottom: -40,
              width: 90,
              left: interpolate(f, [BRAND_AT + 45, BRAND_AT + 72], [-140, 300], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)",
              rotate: "16deg",
            }}
          />
        </div>
        <div
          style={{
            translate: `0px ${textUp}px`,
            opacity: textOp,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: 96,
              color: "#fff",
              letterSpacing: 2,
            }}
          >
            MwalimuEase
          </div>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 40,
              color: "#bfe6f5",
              marginTop: 14,
              fontWeight: 600,
            }}
          >
            School management made easier.
          </div>
          <div
            style={{
              marginTop: 56,
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: 52,
              color: "#ffe27a",
              lineHeight: 1.2,
              padding: "0 80px",
            }}
          >
            YOUR SCHOOL DESERVES
            <br />
            BETTER MANAGEMENT.
          </div>
          <div
            style={{
              marginTop: 64,
              display: "inline-block",
              background: "#ffe27a",
              color: "#103741",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 800,
              fontSize: 40,
              padding: "18px 54px",
              borderRadius: 60,
              boxShadow: "0 8px 0 rgba(0,0,0,0.25)",
              scale: String(
                f > BRAND_AT + 62 ? 1 + 0.045 * Math.sin((f - BRAND_AT - 62) * 0.22) : 1,
              ),
            }}
          >
            mwalimuease.com
          </div>
        </div>
      </div>
    </div>
  );
};
