import React from "react";
import {Sequence, AbsoluteFill} from "remotion";
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

loadPatrick();
loadArchivo();
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
      <AudioTrack />
    </AbsoluteFill>
  );
};
