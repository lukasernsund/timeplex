import React, { Component } from 'react';
import {useParams} from "react-router-dom";

function Schedule() {

    const { id } = useParams()

    return (
        <p> Schedule test - { id }</p>
    );
}

export default Schedule;