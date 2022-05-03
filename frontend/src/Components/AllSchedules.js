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
        </div>
    );
}

export default AllSchedules;