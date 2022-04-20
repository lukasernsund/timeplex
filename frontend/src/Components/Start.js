import React from 'react';
import { useHistory } from 'react-router-dom';
import './Start.css';
import startImg from "./Viktor_omslag.png";
class Start extends React.Component {
    render(){
    return (
        <div className="Body">
            <img className="StartImg" src={startImg} width="1000" height="500"/>
            <div className="ButtonsDiv">
                <button className="AllButton">All schedules</button>
                <button className="NewButton">New Schedule</button>
            </div>
        </div>
        );
        }
    };



export default Start;