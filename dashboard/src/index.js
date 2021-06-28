import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Loading from './ui/Loading';
import { App } from './ui/App';

window.devicePixelRatio = 1;

ReactDOM.render(
  <React.Suspense fallback={<Loading />}>
    <App />
  </React.Suspense>,
  document.getElementById('root')
);
