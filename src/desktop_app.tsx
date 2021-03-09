import { OrbitControls, Sky, Stats } from "@react-three/drei";
import React, { Suspense } from "react";
import { Canvas } from "react-three-fiber";
import { DevtoolsAttachment } from "./devtools";
import { DiamondFun } from "./diamond_fun";
import { RecordedHands } from "./recorded_hands";

export function DesktopApp() {
  return (
    <div className="desktop-app">
      <Canvas>
        <Stats />
        <DevtoolsAttachment />
        <ambientLight />
        <Sky />
        {/* While things are loading, just show nothing */}
        <Suspense fallback={null}>
          {/* <Plane rotation={[-Math.PI / 2, 0, 0]} args={[10, 10]}>
            <meshBasicMaterial color="green" />
          </Plane> */}
          <group position={[0, 10, 0]}>
            <RecordedHands />
          </group>
          <DiamondFun />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
}
