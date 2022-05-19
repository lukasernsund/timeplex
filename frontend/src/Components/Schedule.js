import React, { Component } from 'react';
import {Link, useParams} from "react-router-dom";
import startImg from"././schedulesPicture.jpg"
function Schedule() {

    const { id } = useParams()

    return (
        <div>
            <h1>{ id }</h1>
        <p> Here the Schedule for { id } will be shown</p>
        <div>
        <img src={startImg} alt="Picture of schedule"></img>
        </div>
        <Link to="/allschedules">
            <button className="btn btn-primary mr-2">Go back to All schedules</button>
        </Link>
        </div>
    );
}

export default Schedule;