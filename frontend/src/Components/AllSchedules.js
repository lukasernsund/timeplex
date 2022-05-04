import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import VirtualizedList from "./ListAllSchedule";
import './AllSchedules.css'


function AllSchedules() {

    return (
        <div>
            <div className='List'>
            <VirtualizedList />
            </div>
            <div>
            <p> AllSchedule test</p>
            <ul style={{    listStyleType: "none"}}>
                <Link to="/Schedule/1"><li> A scehdule</li></Link>
                <Link to="/Schedule/2"><li> A scehdule</li></Link>
                <Link to="/Schedule/3"><li> A scehdule</li></Link>
                <Link to="/Schedule/4"><li> A scehdule</li></Link>
                <Link to="/Schedule/5"><li> A scehdule</li></Link>
            </ul>
        </div>
        </div>
    );
}

export default AllSchedules;
