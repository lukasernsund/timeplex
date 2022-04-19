import React, { Component } from 'react';
import Schedule from './Schedule';
import Staff from './Staff';
import Settings from './Settings';
import Start from "./Start";
import Create from "./Create";

import {Route, Routes} from "react-router-dom";



function MainContent() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Start />}></Route>
                <Route path="/Create" element={<Create />}></Route>
            </Routes>
        </div>
    );
}

export default MainContent;