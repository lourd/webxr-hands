import { Line } from "@react-three/drei";
import React from "react";
import { interpolateRainbow, interpolateSinebow } from "d3-scale-chromatic";

const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];

export function DiamondFun() {
  const numLines = 35;
  const lines = Array(numLines)
    .fill(undefined)
    .map((_, i) => {
      const rotation = ((2 * Math.PI) / numLines) * i;
      // const color = colors[i % colors.length];
      const t = i / (numLines - 1);
      const color = interpolateRainbow(t);
      // const color = interpolateSinebow(t);
      return (
        <Line
          key={i}
          points={[
            [0, 0, 0],
            [1, 2, 1],
            [0, 0, 5],
            [0, 5, 0],
          ]}
          lineWidth={1}
          rotation={[0, rotation, 0]}
          color={color}
        />
      );
    });
  return (
    <>
      <group>{lines}</group>
      <group rotation={[0, 0, Math.PI]}>{lines}</group>
    </>
  );
}
