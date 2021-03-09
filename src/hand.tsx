import React from 'react';
import { useMemo } from 'react';
import { useFrame } from 'react-three-fiber';
import { Vector3, XRHandedness } from 'three';
import { ThreeHand } from './three_hand';
import { getJointsFromModel, useHandModel } from './use_hand_model';

interface HandProps {
  hand: ThreeHand;
  handedness: XRHandedness;
  rotationOffset?: Vector3;
  positionOffset?: Vector3;
}

export function Hand({
  hand,
  handedness,
  rotationOffset = new Vector3(0, 0, 0),
  positionOffset = new Vector3(0, 0, 0),
}: HandProps) {
  const model = useHandModel(handedness);
  const bones = useMemo(() => {
    return getJointsFromModel(model, handedness);
  }, [model, handedness]);

  useFrame(() => {
    for (let i = 0; i < bones.length; i++) {
      const bone = bones[i];
      const joint = hand.joints[i];

      if (joint && bone && joint.visible) {
        const scaledPos = joint.position.clone().multiplyScalar(100);
        bone.position.copy(scaledPos);
        bone.quaternion.copy(joint.quaternion);
      }
    }
    model.rotation.setFromVector3(rotationOffset);
    model.position.copy(positionOffset);
  });

  return <primitive object={model} />;
}
