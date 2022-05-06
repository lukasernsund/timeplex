import './App.css';
import Header from './Components/Header';
import MainContent from "./Components/MainContent";

import axios from "axios";
import React, { Component } from 'react';

function App() {
  return (
    <div className="App">
        <Header />
        <MainContent />
    </div>
  );
}

export default App;
