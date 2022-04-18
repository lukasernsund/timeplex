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
import {Routes, Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<Start />}></Route>
          <Route path="/Create" element={<Create />}></Route>
      </Routes>
      <Header />
    </div>
  );
}

export default App;
