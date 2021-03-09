import { useEffect, useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import { saveJsonFile } from './save_json_file';
import { ThreeHand } from './three_hand';

export interface SerializedHandDataFrame {
  left: StrippedDownHandData;
  right: StrippedDownHandData;
}

export interface StrippedDownHandData {
  joints: Array<{
    matrix: number[];
    jointRadius: number;
  }>;
}

export interface HandsData {
  left: ThreeHand;
  right: ThreeHand;
}

export function HandsRecorder({ left, right }: HandsData) {
  const data = useRef<SerializedHandDataFrame[]>([]);
  useFrame(() => {
    data.current.push({
      left: mapHandToFrame(left),
      right: mapHandToFrame(right),
    });
  });
  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const serializedData = JSON.stringify(data.current);
      console.log(`writing data, size is ${serializedData.length}`);
      saveJsonFile('hands.json', serializedData);
    };
  }, []);
  return null;
}

function mapHandToFrame(hand: ThreeHand): StrippedDownHandData {
  return {
    joints: hand.joints.map((joint) => {
      return {
        matrix: joint.matrixWorld.toArray(),
        jointRadius: joint.jointRadius,
      };
    }),
  };
}
