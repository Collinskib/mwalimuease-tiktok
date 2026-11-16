import React from "react";
import {Sequence, AbsoluteFill, useCurrentFrame, interpolate, staticFile, Img} from "remotion";
import {loadFont as loadPatrick} from "@remotion/google-fonts/PatrickHand";
import {loadFont as loadArchivo} from "@remotion/google-fonts/ArchivoBlack";
import {loadFont as loadInter} from "@remotion/google-fonts/Inter";
import {SCENES} from "./timeline";
import {Scene1} from "./scenes/Scene1";
import {Scene2} from "./scenes/Scene2";
import {Scene3} from "./scenes/Scene3";
import {Scene4} from "./scenes/Scene4";
import {Scene5} from "./scenes/Scene5";
import {Captions, AudioTrack} from "./components/UI";

loadPatrick("normal", {weights: ["400"], subsets: ["latin"]});
loadArchivo("normal", {weights: ["400"], subsets: ["latin"]});
loadInter("normal", {weights: ["600", "700", "800"], subsets: ["latin"]});

export const Skit: React.FC = () => {
  return (
    <AbsoluteFill style={{background: "#f6efe3"}}>
      <Sequence from={SCENES.s1[0]} durationInFrames={SCENES.s1[1] - SCENES.s1[0]}>
        <Scene1 />
      </Sequence>
      <Sequence from={SCENES.s2[0]} durationInFrames={SCENES.s2[1] - SCENES.s2[0]}>
        <Scene2 />
      </Sequence>
      <Sequence from={SCENES.s3[0]} durationInFrames={SCENES.s3[1] - SCENES.s3[0]}>
        <Scene3 />
      </Sequence>
      <Sequence from={SCENES.s4[0]} durationInFrames={SCENES.s4[1] - SCENES.s4[0]}>
        <Scene4 />
      </Sequence>
      <Sequence from={SCENES.s5[0]} durationInFrames={SCENES.s5[1] - SCENES.s5[0]}>
        <Scene5 />
      </Sequence>
      <Captions />
      <BrandMark />
      <AudioTrack />
    </AbsoluteFill>
  );
};

/** Small persistent brand chip once the product is named (~27s) — drop-offs still see the brand. */
const BrandMark: React.FC = () => {
  const f = useCurrentFrame();
  if (f < 810 || f > 1685) return null;
  const op = interpolate(f, [810, 824, 1672, 1685], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        position: "absolute",
        top: 56,
        left: 36,
        display: "flex",
        alignItems: "center",
        gap: 12,
        background: "rgba(255,255,255,0.9)",
        border: "3px solid #103741",
        borderRadius: 18,
        padding: "8px 18px 8px 10px",
        opacity: op,
        zIndex: 60,
        boxShadow: "4px 5px 0 rgba(16,55,65,0.2)",
      }}
    >
      <div style={{width: 52, height: 52, borderRadius: 12, overflow: "hidden"}}>
        <Img src={staticFile("img/logo.png")} style={{width: "100%", height: "100%"}} />
      </div>
      <div
        style={{
          fontFamily: "'Archivo Black', sans-serif",
          fontSize: 26,
          color: "#103741",
          letterSpacing: 0.5,
        }}
      >
        MwalimuEase
      </div>
    </div>
  );
};
