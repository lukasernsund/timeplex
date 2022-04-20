import React from 'react';
import { useHistory } from 'react-router-dom';
import './Start.css';
class Start extends React.Component {
    render(){
    return (
        <div className="Body">
            <div className="ButtonsDiv">
                <button className="AllButton">All schedules</button>
                <button className="NewButton">New Schedule</button>
            </div>
        </div>
        );
        }
    };



export default Start;