import logo from './logo.svg';
import './App.css';
import Staff from './Components/Staff';
import Create from './Components/Create';
import Header from './Components/Header';
import Settings from './Components/Settings';
import Start from './Components/Start';
import Schedule from './Components/Schedule';

import axios from "axios";
import React, { Component } from 'react';

function App() {
  return (
    <div className="App">
      <Header />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          Hej chrille, emil, simon, niklas, lukas och viktor!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
