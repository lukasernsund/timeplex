import './App.css';
import Header from './Components/Header';
import MainContent from "./Components/MainContent";
import Footer from "./Components/Footer";
import LoggaIn from './Components/LoggaIn';

import axios from "axios";
import React, { Component } from 'react';


function App() {
  return (
    <div className="App">
        {/* <LoggaIn /> */}
        <Header />
        <MainContent />
        <Footer />
    </div>
  );
}

export default App;
