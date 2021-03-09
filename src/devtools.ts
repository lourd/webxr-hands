import { useEffect } from 'react';
import { useThree } from 'react-three-fiber';
import * as THREE from 'three';

declare global {
  interface Window {
    __THREE_DEVTOOLS__?: any;
  }
}

export function useThreejsDevtool() {
  const { scene, gl } = useThree();
  useEffect(() => {
    // Observe a scene or a renderer
    if (window.__THREE_DEVTOOLS__) {
      window.__THREE_DEVTOOLS__.dispatchEvent(
        new CustomEvent('observe', { detail: scene })
      );
      window.__THREE_DEVTOOLS__.dispatchEvent(
        new CustomEvent('observe', { detail: gl })
      );
    }
    (window as any).scene = scene;
    window.THREE = THREE;
  }, [scene, gl]);
}

export function DevtoolsAttachment() {
  useThreejsDevtool();
  return null;
}
