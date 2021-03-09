import React from 'react';
import { Vector3 } from 'three';
import { Hand } from './hand';

export function ManyHands({ leftHand, rightHand }) {
  const hands = [];
  const gap = 0.5;
  for (let i = -5; i < 5; i++) {
    for (let j = -5; j < 5; j++) {
      const offset = gap * i;
      const offsetY = gap * j;
      hands.push(
        <Hand
          hand={leftHand}
          handedness="left"
          positionOffset={new Vector3(offset, offsetY, offsetY)}
          key={`l${i}${j}`}
        />
      );
      hands.push(
        <Hand
          hand={rightHand}
          handedness="right"
          positionOffset={new Vector3(offset, offsetY, offsetY)}
          key={`r${i}${j}`}
        />
      );
    }
  }
  return <>{hands}</>;
}
