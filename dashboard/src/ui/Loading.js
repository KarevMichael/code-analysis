import React from 'react';
import logo from './logo.svg';
import './Loading.css';

function Loading() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Loading report tree.</p>
      </header>
    </div>
  );
}

export default Loading;
