import './App.css';
import Create from './Components/Create';
import Header from './Components/Header';
import Start from './Components/Start';
import MainContent from "./Components/MainContent";
import Footer from "./Components/Footer";

import axios from "axios";
import React, { Component } from 'react';
import {Routes, Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
        <Header />
        <MainContent />
      <Routes>
          <Route path="/" element={<Start />}></Route>
          <Route path="/Create" element={<Create />}></Route>
      </Routes>
        <Footer />
    </div>
  );
}

export default App;
