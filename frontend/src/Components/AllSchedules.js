import React, { Component } from 'react';
import { Link } from 'react-router-dom';


function AllSchedules() {

    return (
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
    );
}

export default AllSchedules;