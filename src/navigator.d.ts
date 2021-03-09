import { XR } from 'three';

declare global {
  interface Navigator {
    xr?: XR;
  }
}
