import React from "react";
import { Hand } from "./hand";
import { HandsRecorder } from "./hands_recorder";
import { ThumbKnuckleDistance } from "./thumb_knuckle_distance";
import { useXRHands } from "./use_xr_hands";

export function InteractiveHands() {
  const { left: leftHand, right: rightHand } = useXRHands();

  let leftHandModel;
  if (leftHand) {
    leftHandModel = <Hand hand={leftHand} handedness="left" />;
  }
  let rightHandModel;
  if (rightHand) {
    rightHandModel = <Hand hand={rightHand} handedness="right" />;
  }
  return (
    <>
      {leftHandModel}
      {rightHandModel}
      {/* {Array(12)
        .fill(undefined)
        .map((_, i) => {
          const rotation = ((2 * Math.PI) / 12) * i;
          return (
            <group key={i} rotation={[0, rotation, 0]}>
              <group position={[0, 0, -1.5]} rotation={[0, Math.PI, 0]}>
                {leftHandModel}
                {rightHandModel}
              </group>
            </group>
          );
        })} */}
      {/* <ThumbKnuckleDistance hand={leftHand} /> */}
      {/* {leftHand && rightHand && (
        <HandsRecorder left={leftHand} right={rightHand} />
      )} */}
    </>
  );
}
