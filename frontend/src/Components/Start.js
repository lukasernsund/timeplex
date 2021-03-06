import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import './Start.css';
import startImg from"./Omslag.png";
class Start extends React.Component {
    render(){
    return (
        <div className="Body">
            <img className="StartImg" alt="start bild" src={startImg} />
            <div className="ButtonsDiv">
                <Link to="/AllSchedules"><button className="AllButton btn btn-outline-primary ">All schedules</button></Link>
                <Link to="/Create"><button className="AllButton btn btn-outline-primary">New Schedule</button></Link>
            </div>
        </div>
        );
        }
    };



export default Start;