import React from "react";
import {useCurrentFrame, interpolate, Easing, staticFile, Img} from "remotion";
import {Stickman} from "../components/Stickman";
import {SpeechBubble} from "../components/UI";

const SCREENS: {img: string; label: string; at: number}[] = [
  {img: "img/dashboard1.png", label: "One dashboard for the whole school", at: 40},
  {img: "img/students.png", label: "Student registry — find anyone in seconds", at: 150},
  {img: "img/marks_entry.png", label: "Marks entry → automatic report cards", at: 250},
  {img: "img/finances.png", label: "Fee tracking & receipts in real time", at: 340},
  {img: "img/timetable_web.png", label: "Clash-free timetables, generated", at: 425},
];

// retention checklist — each item ticks as its screen appears
const CHECKLIST: {label: string; at: number}[] = [
  {label: "STUDENTS", at: 150},
  {label: "MARKS", at: 250},
  {label: "FEES", at: 340},
  {label: "TIMETABLE", at: 425},
];

/** SCENE 4 — THE SOLUTION (30.5–47s). Absolute 915–1410, local 0–495. */
export const Scene4: React.FC = () => {
  const f = useCurrentFrame();

  // background shifts from office-beige to calm teal
  const bg = interpolate(f, [0, 30], [0, 1], {extrapolateRight: "clamp"});

  // papers fly away upward and vanish
  const fly = interpolate(f, [10, 70], [0, -2400], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.quad),
  });

  // browser window rises into view
  const winY = interpolate(f, [15, 55], [1400, 150], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
  const winTilt = interpolate(f, [15, 55], [8, 0], {extrapolateRight: "clamp"});

  const active = [...SCREENS].reverse().find((s) => f >= s.at) ?? SCREENS[0];
  const screenLocal = f - active.at;
  const screenScale = interpolate(screenLocal, [0, 12], [1.06, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
  const panY = interpolate(screenLocal, [10, 85], [0, -70], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(180deg, rgba(232,244,248,${0.4 + 0.6 * bg}) 0%, rgba(77,157,187,${0.15 + 0.25 * bg}) 100%), #f6efe3`,
        }}
      />

      {/* chaos papers ejected */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: 100 + i * 160,
            top: 1500 + fly * (1 + i * 0.15) - i * 120,
            width: 90,
            height: 110,
            background: "#fff",
            border: "3px solid #1a1a1a",
            borderRadius: 4,
            rotate: `${f * (4 + i) + i * 55}deg`,
            opacity: interpolate(f, [10, 60], [1, 0], {extrapolateRight: "clamp"}),
          }}
        />
      ))}

      {/* big browser mockup with real product screens */}
      <div
        style={{
          position: "absolute",
          left: 70,
          top: winY,
          width: 940,
          rotate: `${winTilt}deg`,
          zIndex: 20,
        }}
      >
        <div
          style={{
            background: "#fff",
            border: "6px solid #1a1a1a",
            borderRadius: 24,
            overflow: "hidden",
            boxShadow: "10px 14px 0 rgba(16,55,65,0.25)",
          }}
        >
          <div
            style={{
              height: 58,
              background: "#103741",
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "0 20px",
            }}
          >
            {["#e74c3c", "#f1c40f", "#2ecc71"].map((c) => (
              <div key={c} style={{width: 18, height: 18, borderRadius: 9, background: c}} />
            ))}
            <div
              style={{
                marginLeft: 16,
                flex: 1,
                height: 32,
                background: "#fff",
                borderRadius: 16,
                fontFamily: "Inter, sans-serif",
                fontSize: 19,
                color: "#555",
                display: "flex",
                alignItems: "center",
                paddingLeft: 18,
              }}
            >
              mwalimuease.com
            </div>
          </div>
          <div style={{position: "relative", height: 560, overflow: "hidden", background: "#fff"}}>
            {SCREENS.map((s) =>
              s === active ? (
                <Img
                  key={s.img}
                  src={staticFile(s.img)}
                  style={{
                    width: "114%",
                    scale: String(screenScale),
                    translate: `-30px ${panY}px`,
                    transformOrigin: "50% 0%",
                  }}
                />
              ) : null,
            )}
            {/* caption chip for current screen */}
            <div
              style={{
                position: "absolute",
                bottom: 24,
                left: "50%",
                translate: "-50%",
                background: "#103741",
                color: "#fff",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 800,
                fontSize: 30,
                padding: "12px 28px",
                borderRadius: 30,
                whiteSpace: "nowrap",
                scale: String(
                  interpolate(screenLocal, [0, 10], [0, 1], {
                    extrapolateRight: "clamp",
                    easing: Easing.spring({damping: 14, stiffness: 240}),
                  }),
                ),
              }}
            >
              {active.label}
            </div>
          </div>
        </div>
      </div>

      {/* checklist strip — ticks off as each screen appears */}
      {f > 30 && (
        <div
          style={{
            position: "absolute",
            top: 800,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            gap: 9,
            zIndex: 30,
            opacity: interpolate(f, [30, 42], [0, 1], {extrapolateRight: "clamp"}),
          }}
        >
          <div
            style={{
              background: "#103741",
              color: "#ffe27a",
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: 22,
              padding: "10px 14px",
              borderRadius: 14,
              border: "3px solid #1a1a1a",
            }}
          >
            ONE DASHBOARD:
          </div>
          {CHECKLIST.map((c) => {
            const done = f >= c.at;
            const pop = interpolate(f, [c.at, c.at + 10], [0.6, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({damping: 10, stiffness: 300}),
            });
            return (
              <div
                key={c.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: done ? "#2e9e6b" : "rgba(255,255,255,0.9)",
                  color: done ? "#fff" : "#667",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 800,
                  fontSize: 21,
                  padding: "10px 13px",
                  borderRadius: 14,
                  border: "3px solid #1a1a1a",
                  scale: String(done ? pop : 1),
                }}
              >
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    border: "3px solid #1a1a1a",
                    background: done ? "#ffe27a" : "#e3ded4",
                    color: "#103741",
                    fontSize: 16,
                    fontWeight: 900,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {done ? "✓" : ""}
                </div>
                {c.label}
              </div>
            );
          })}
        </div>
      )}

      {/* characters reacting at the bottom */}
      {f < 390 ? (
        <div style={{position: "absolute", left: 50, top: 1290, width: 200, height: 330}}>
          <svg viewBox="0 0 200 320" style={{width: "100%", height: "100%"}}>
            <Stickman t={f} expression={f > 120 ? "shocked" : "stressed"} pose={f > 120 ? "shrug" : "point"} accessories={["books"]} animAmp={0.5} />
          </svg>
        </div>
      ) : (
        <div style={{position: "absolute", left: 50, top: 1290, width: 200, height: 330}}>
          <svg viewBox="0 0 200 320" style={{width: "100%", height: "100%"}}>
            <Stickman t={f} expression="shocked" pose="facepalm" accessories={["tie"]} animAmp={0.4} />
          </svg>
        </div>
      )}
      <div style={{position: "absolute", left: 830, top: 1290, width: 200, height: 330}}>
        <svg viewBox="0 0 200 320" style={{width: "100%", height: "100%"}}>
          <Stickman t={f} expression="happy" pose={f > 300 ? "point" : "stand"} animAmp={0.3} flip />
        </svg>
      </div>

      {/* dialogue bubbles */}
      {f > 60 && f < 200 && (
        <SpeechBubble
          text="Wait... we can manage the whole school from ONE place?"
          x={70}
          y={880}
          tail="bottom-left"
          appear={64}
          w={560}
        />
      )}
      {f > 200 && f < 400 && (
        <SpeechBubble
          text="Marks, fees, timetables, reports — one dashboard."
          x={300}
          y={880}
          tail="bottom-right"
          appear={204}
          w={640}
          color="#dff3ee"
        />
      )}
      {f > 400 && f < 500 && (
        <SpeechBubble
          text="And I've been suffering all this time?"
          x={90}
          y={920}
          tail="bottom-left"
          appear={404}
          w={540}
        />
      )}
    </>
  );
};
