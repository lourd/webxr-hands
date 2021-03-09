import { Html } from "@react-three/drei";
import React, { useState } from 'react';
import { useFrame } from 'react-three-fiber';
import { Hand } from './hand';
import { ManyHands } from './many_hands';
import { Trackpad } from './trackpad';
import { useRecordedHandData } from './use_recorded_hand_data';

export function RecordedHands() {
  const [frameId, setFrameId] = useState(0);
  const [manual, setManual] = useState(false);
  const { leftHand, rightHand, frames } = useRecordedHandData(
    '/hands.json',
    frameId
  );
  useFrame(() => {
    if (manual) return;
    setFrameId((frameId + 1) % frames.length);
  });
  return (
    <>
      {/* <ManyHands leftHand={leftHand} rightHand={rightHand} /> */}
      <Hand hand={leftHand} handedness="left" />
      <Hand hand={rightHand} handedness="right" />
      {/* <Trackpad /> */}
      <Html>
        <input
          type="range"
          min={0}
          max={frames.length - 1}
          style={{ width: '400px' }}
          value={frameId}
          onChange={(e) => setFrameId(e.target.valueAsNumber)}
          onMouseDown={() => setManual(true)}
          onMouseUp={() => setManual(false)}
        />
      </Html>
    </>
  );
}
