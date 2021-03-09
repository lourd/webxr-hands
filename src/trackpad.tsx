import React from 'react'
import { Sphere } from "@react-three/drei";

export function Trackpad(props) {
  return (
    <Sphere position={[0.5, 0, 0]} scale={[0.2, 0.2, 0.2]}>
      <meshBasicMaterial attach="material" color="blue" />
    </Sphere>
  );
}
