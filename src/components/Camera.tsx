import React from "react";
import {useCurrentFrame, interpolate, Easing} from "remotion";

/** Simple keyframe camera: list of [frame, zoom, x, y] stops, smoothed. */
export const Camera: React.FC<{
  stops: Array<[number, number, number, number]>; // [frame, zoom, offsetX, offsetY]
  shakeAt?: [number, number]; // [startFrame, endFrame] camera shake
  shakeAmp?: number;
  children: React.ReactNode;
}> = ({stops, shakeAt, shakeAmp = 10, children}) => {
  const f = useCurrentFrame();
  const frames = stops.map((s) => s[0]);
  const zoom = interpolate(
    f,
    frames,
    stops.map((s) => s[1]),
    {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad)},
  );
  const ox = interpolate(
    f,
    frames,
    stops.map((s) => s[2]),
    {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad)},
  );
  const oy = interpolate(
    f,
    frames,
    stops.map((s) => s[3]),
    {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad)},
  );
  let sx = 0;
  let sy = 0;
  if (shakeAt && f >= shakeAt[0] && f <= shakeAt[1]) {
    const decay = interpolate(f, [shakeAt[0], shakeAt[1]], [1, 0.2]);
    sx = Math.sin(f * 2.1) * shakeAmp * decay;
    sy = Math.cos(f * 1.7) * shakeAmp * 0.7 * decay;
  }
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        scale: String(zoom),
        translate: `${ox}px ${oy + sy}px`,
        left: sx,
      }}
    >
      {children}
    </div>
  );
};
