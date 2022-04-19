import './App.css';
import Header from './Components/Header';
import MainContent from "./Components/MainContent";
import Footer from "./Components/Footer";

import axios from "axios";
import React, { Component } from 'react';

function App() {
  return (
    <div className="App">
        <Header />
        <MainContent />
        <Footer />
    </div>
  );
}

export default App;
