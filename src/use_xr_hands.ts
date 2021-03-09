import { useEffect, useReducer } from 'react';
import { useThree } from 'react-three-fiber';
import {
  ThreeHand,
  ThreeXRControllerConnectionEvent,
  ThreeXRManager,
} from './three_hand';

interface ThreeHandMap {
  left: ThreeHand | null;
  right: ThreeHand | null;
}

function reducer(state: ThreeHandMap, action: any) {
  switch (action.type) {
    case 'set_hand':
      return { ...state, [action.handedness]: action.hand };
    default:
      throw new Error('unexpected ');
  }
}

/**
 * The hand objects returned have their joint sub-objects updated on every
 * frame. See the update function of Three's WebXRController for the math of
 * going from the XRJoint poses to the Three object's transform.
 */
export const useXRHands = (): ThreeHandMap => {
  const [hands, dispatch] = useReducer(reducer, { left: null, right: null });
  useXRHand(0, dispatch);
  useXRHand(1, dispatch);
  return hands;
};

const useXRHand = (id: number, dispatch: (action: any) => void) => {
  const { scene, gl } = useThree();
  useEffect(() => {
    // getHand is what touches the platform XRHand class, through the
    // WebXRController class.
    const xrHand = (gl.xr as ThreeXRManager).getHand(id);
    function onConnect(event: ThreeXRControllerConnectionEvent) {
      // For some reason this event fires when the controllers connect as well
      // not just hands.
      if (!event.data?.hand) {
        return;
      }
      scene.add(xrHand);
      dispatch({
        type: 'set_hand',
        handedness: event.data.handedness,
        hand: xrHand,
      });
    }
    function onDisconnect(event: ThreeXRControllerConnectionEvent) {
      // For some reason this event fires when the controllers disconnect as
      // well, not just when the hands disconnect.
      if (!event.data?.hand) {
        return;
      }
      scene.remove(xrHand);
      dispatch({
        type: 'set_hand',
        handedness: event.data.handedness,
        hand: null,
      });
    }
    xrHand.addEventListener('connected', onConnect as any);
    xrHand.addEventListener('disconnected', onDisconnect as any);
    return () => {
      // Remove the hand group from the scene if it disconnects,
      // or if we unmount the component
      scene.remove(xrHand);
      xrHand.removeEventListener('connected', onConnect as any);
      xrHand.removeEventListener('disconnected', onDisconnect as any);
    };
  }, [scene, gl, dispatch, id]);
};
