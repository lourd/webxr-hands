import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { App } from './app';

ReactDOM.render(
  <React.StrictMode>
    {/* Top-level Suspense to show nothing */}
    <Suspense fallback={null}>
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);
