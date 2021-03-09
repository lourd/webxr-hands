# WebXR Hands Study

An exploration of using hand tracking in WebXR.

Built for the Oculus Quest with web technologies, using:

- [The draft WebXR hand-tracking API](https://github.com/immersive-web/webxr-hand-input)
- [three.js](https://github.com/mrdoob/three.js)
- [react-three-fiber](https://github.com/react-spring/react-three-fiber)

## Usage

### Setup

- Enable USB debugging on your headset. Open the Oculus companion app on your phone, select your device in Settings, tap on More Settings, tap on Developer Mode, and toggle it on. See [here for more help](https://developer.oculus.com/documentation/oculus-browser/browser-remote-debugging/?locale=en_US).
- Enable hand tracking in Oculus Browser flags. In the browser, go to chrome://flags and enable the "WebXR experiences with joints tracking".
- Plug in your headset to your computer, open Chrome, go to chrome://inspect, make sure the Quest is a listed device, and then click the "Port forwarding..." button at the top of the page and forward from port 3000 to localhost:3000.

### Scripts

#### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

#### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
