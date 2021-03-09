import { Text } from "@react-three/drei";
import React, { useState } from 'react';
import { useFrame } from 'react-three-fiber';
import { ThreeHand } from './three_hand';
import { XRHandJoints } from './xr_hand_joints';

export function ThumbKnuckleDistance({ hand }: { hand: ThreeHand | null }) {
  const [distance, setDistance] = useState('0');
  useFrame(() => {
    if (!hand) {
      return;
    }
    const thumbTip = hand.joints[XRHandJoints.THUMB_PHALANX_TIP];
    const forefinger = hand.joints[XRHandJoints.INDEX_PHALANX_INTERMEDIATE]!;
    const distance =
      thumbTip.position.distanceTo(forefinger?.position) -
      (thumbTip.jointRadius + forefinger.jointRadius);
    setDistance(distance.toFixed(4));
  });
  return (
    <Text fontSize={0.1} position={[0, 1, -1]}>
      The distance is {distance}
    </Text>
  );
}
