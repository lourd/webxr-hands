import { Event, Group, XRHandedness, XRInputSource } from 'three';
import { WebXRManager } from 'three/src/renderers/webxr/WebXRManager';

/**
 * Custom interface to add on a type for method that's missing from Three for
 * some reason.
 */
export interface ThreeXRManager extends WebXRManager {
  getHand(id: number): ThreeHand;
}

/**
 * Filling in the missing type declaration from Three
 */
export interface ThreeXRControllerConnectionEvent extends Event {
  data?: XRInputSource;
  type: 'connected' | 'disconnected';
}

export interface ThreeHandPinchEvent extends Event {
  type: 'pinchstart' | 'pinchend';
  handedness: XRHandedness;
}

export interface HandJoint extends Group {
  jointRadius: number;
}

/**
 * The way the XRHand is wired up in Three with the WebXRController class.
 * Added here because the types are not part of the Three core, yet.
 */
export interface ThreeHand extends Group {
  joints: HandJoint[];
  /**
   * Custom state setup by Three innards. There are no gesture events as part
   * of the platform API spec.
   */
  // inputState: {
  //   pinching: boolean;
  // };
}
