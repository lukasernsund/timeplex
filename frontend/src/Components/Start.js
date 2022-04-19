import React from 'react';
import startImg from './Viktor_omslag.png'
import { useHistory } from 'react-router-dom';
class Start extends React.Component {


    render(){
    return (
        <div>
            <img src={startImg} width="1000" height="500"/>
            <div>
            <button className="GeneralButton"> All schedules </button>
            <button className="GeneralButton"> New schedule </button>
            </div>

        </div>
        );
        }
    };



export default Start;