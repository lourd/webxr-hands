import { Sky } from "@react-three/drei";
import React, { Suspense, useEffect, useState } from "react";
import { Canvas, useThree } from "react-three-fiber";
import { XRSession } from "three";
import { DevtoolsAttachment } from "./devtools";
import { DiamondFun } from "./diamond_fun";
import { InteractiveHands } from "./interactive_hands";

export function HeadsetApp() {
  const [xrSession, setSession] = useState<XRSession>();

  const startVR = async () => {
    const session = await navigator.xr.requestSession("immersive-vr", {
      optionalFeatures: ["local-floor", "bounded-floor", "hand-tracking"],
    });
    setSession(session);
    // If the session is ended from elsewhere, like the device menu
    session.addEventListener(
      "end",
      () => {
        setSession(null);
      },
      { once: true }
    );
  };

  let button;
  // in the headset, not gone immersive yet
  if (!xrSession) {
    button = (
      <button className="start" onClick={startVR}>
        Start VR
      </button>
    );
  }

  return (
    <>
      {button}
      {/* We have to render the canvas before the XR session has started so
          that there's a WebGL layer for the session to attach to. See
          https://github.com/pmndrs/react-three-fiber/issues/767 */}
      <Canvas vr>
        <DevtoolsAttachment />
        <ambientLight />
        {xrSession && <ImmersiveApp session={xrSession} />}
      </Canvas>
    </>
  );
}

function ImmersiveApp(props: { session: XRSession }) {
  const { gl } = useThree();

  useEffect(() => {
    gl.xr.setSession(props.session);
  }, [gl.xr, props.session]);

  return (
    <>
      <Sky />
      {/* While things are loading, just show nothing */}
      <Suspense fallback={null}>
        <InteractiveHands />
      </Suspense>
      {/* <DiamondFun /> */}
    </>
  );
}
