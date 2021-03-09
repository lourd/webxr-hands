import { useMemo } from 'react';
import { useLoader } from 'react-three-fiber';
import { Group, Object3D, XRHandedness } from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { SkeletonUtils } from 'three/examples/jsm/utils/SkeletonUtils';

interface HandMeshOptions {
  quality: 'low' | 'high';
}

/**
 * Loads the 3D hand model from the Three.js website. Uses the experimental
 * `useLoader` hook from react-three-fiber, which is Suspense-enabled, aka
 * this hook suspends rendering until the models have been loaded.
 * @param handedness
 * @param options
 */
export function useHandModel(
  handedness: XRHandedness,
  options?: HandMeshOptions
) {
  const low = options?.quality === 'low' ? '_low' : '';
  const filename = `OculusHand_${handedness === 'right' ? 'R' : 'L'}${low}.fbx`;
  const model = useLoader(FBXLoader, filename, (loader) => {
    loader.setPath('https://threejs.org/examples/models/fbx/');
  });
  // Adjust the models as needed once, when they're first loaded
  return useMemo(() => {
    // Hack because of the scale of the skinnedmesh
    model.scale.setScalar(0.01);
    const mesh = model.getObjectByProperty('type', 'SkinnedMesh')!;
    mesh.frustumCulled = false;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    // Can't just use object's clone method because it doesn't handle the
    // skinned mesh correctly. If we don't clone it then everything shares the
    // same instance.
    return SkeletonUtils.clone(model) as Group;
  }, [model]);
}

/**
 * Names of the sub-objects within the hand FBX model.
 */
const bonesMapping = [
  'b_%_wrist', // XRHand.WRIST,

  'b_%_thumb1', // XRHand.THUMB_METACARPAL,
  'b_%_thumb2', // XRHand.THUMB_PHALANX_PROXIMAL,
  'b_%_thumb3', // XRHand.THUMB_PHALANX_DISTAL,
  'b_%_thumb_null', // XRHand.THUMB_PHALANX_TIP,

  null, //'b_%_index1', // XRHand.INDEX_METACARPAL,
  'b_%_index1', // XRHand.INDEX_PHALANX_PROXIMAL,
  'b_%_index2', // XRHand.INDEX_PHALANX_INTERMEDIATE,
  'b_%_index3', // XRHand.INDEX_PHALANX_DISTAL,
  'b_%_index_null', // XRHand.INDEX_PHALANX_TIP,

  null, //'b_%_middle1', // XRHand.MIDDLE_METACARPAL,
  'b_%_middle1', // XRHand.MIDDLE_PHALANX_PROXIMAL,
  'b_%_middle2', // XRHand.MIDDLE_PHALANX_INTERMEDIATE,
  'b_%_middle3', // XRHand.MIDDLE_PHALANX_DISTAL,
  'b_%_middlenull', // XRHand.MIDDLE_PHALANX_TIP,

  null, //'b_%_ring1', // XRHand.RING_METACARPAL,
  'b_%_ring1', // XRHand.RING_PHALANX_PROXIMAL,
  'b_%_ring2', // XRHand.RING_PHALANX_INTERMEDIATE,
  'b_%_ring3', // XRHand.RING_PHALANX_DISTAL,
  'b_%_ring_inull', // XRHand.RING_PHALANX_TIP,

  'b_%_pinky0', // XRHand.LITTLE_METACARPAL,
  'b_%_pinky1', // XRHand.LITTLE_PHALANX_PROXIMAL,
  'b_%_pinky2', // XRHand.LITTLE_PHALANX_INTERMEDIATE,
  'b_%_pinky3', // XRHand.LITTLE_PHALANX_DISTAL,
  'b_%_pinkynull', // XRHand.LITTLE_PHALANX_TIP
];

export function getJointsFromModel(
  model: Group,
  handedness: XRHandedness
): Array<Object3D | null> {
  return bonesMapping.map((boneName) => {
    if (!boneName) {
      return null;
    }
    const objectName = boneName.replace(
      /%/g,
      handedness === 'right' ? 'r' : 'l'
    );
    return model.getObjectByName(objectName)!;
  });
}
