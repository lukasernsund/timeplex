import React, { Component } from 'react';
import {Link, useParams} from "react-router-dom";

function Schedule() {

    const { id } = useParams()

    return (
        <div>
        <p> Here the Schedule for { id } will be shown</p>
        <Link to="/allschedules">
            <button>Go back to All schedules</button>
        </Link>
        </div>
    );
}

export default Schedule;