import React from 'react';
import { DesktopApp } from './desktop_app';
import { HeadsetApp } from './headset_app';
import { wrapPromise } from './wrap_promise';
import './styles.scss';

const vrSupportedResource = wrapPromise(
  new Promise<boolean>((resolve) => {
    if (!navigator.xr) {
      resolve(false);
      return;
    }
    navigator.xr.isSessionSupported('immersive-vr').then(resolve);
  })
);

export function App() {
  const vrSupported = vrSupportedResource.read();
  if (!vrSupported) {
    // we're on desktop
    return <DesktopApp />
  }
  return <HeadsetApp />
}
