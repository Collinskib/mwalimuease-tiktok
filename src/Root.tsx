import React from "react";
import {Composition} from "remotion";
import {Skit} from "./Video";
import {FPS, DURATION} from "./timeline";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="Skit"
      component={Skit}
      durationInFrames={DURATION}
      fps={FPS}
      width={1080}
      height={1920}
    />
  );
};
