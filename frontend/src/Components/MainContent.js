import React, { Component } from 'react';
import Schedule from './Schedule';
import Employee from './Employee';
import Settings from './Settings';
import Start from "./Start";
import Create from "./Create";
import {Route, Routes} from "react-router-dom";
import AllSchedules from "./AllSchedules";


function MainContent() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Start />}></Route>
                <Route path="/Create" element={<Create />}></Route>
                <Route path="/Settings" element={<Settings />}></Route>
                <Route path="/Employee" element={<Employee />}></Route>
                <Route path="/AllSchedules/" element={<AllSchedules />}></Route>
                <Route path="/Schedule/:id" element={<Schedule />}></Route>
            </Routes>
        </div>
    );
}

export default MainContent;