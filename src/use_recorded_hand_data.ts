import useFetch from 'fetch-suspense';
import { useEffect, useState } from 'react';
import { Group, Quaternion } from 'three';
import { SerializedHandDataFrame } from './hands_recorder';
import { HandJoint, ThreeHand } from './three_hand';
import { XRHandJoints } from './xr_hand_joints';

export function useRecordedHandData(filename: string, frameId: number) {
  const response = useFetch(filename) as SerializedHandDataFrame[];
  // do I need to add these to the scene, too?
  const [leftHand] = useState(makeHand);
  const [rightHand] = useState(makeHand);
  useEffect(() => {
    const dataFrame = response[frameId];
    for (const handedness of ['left', 'right'] as ['left', 'right']) {
      const hand = handedness === 'left' ? leftHand : rightHand;
      const handDataFrame = dataFrame[handedness];
      for (let i = 0; i < XRHandJoints.length; i++) {
        const jointFrame = handDataFrame.joints[i];
        const joint = hand.joints[i];
        joint.matrixWorld.fromArray(jointFrame.matrix);
        joint.matrixWorld.decompose(
          joint.position,
          // It's concerning that this is a type error
          (joint.rotation as any) as Quaternion,
          joint.scale
        );
        joint.jointRadius = jointFrame.jointRadius;
      }
    }
  }, [frameId, response, leftHand, rightHand]);
  return { leftHand, rightHand, frames: response };
}

function makeHand() {
  const hand = new Group() as ThreeHand;
  hand.matrixAutoUpdate = false;
  hand.joints = [];
  for (let i = 0; i < XRHandJoints.length; i++) {
    // The transform of this joint will be updated with the joint pose on each frame
    const joint = new Group() as HandJoint;
    joint.matrixAutoUpdate = false;
    hand.joints.push(joint);
    hand.add(joint);
  }
  return hand;
}
