import React, { Component } from 'react';
import Logo from './Timeplex.png';
import Gear from './gear.png';
import './Header.css';


function Header() {
    return (
        <header className="header">
                <img className="logo" src={Logo} alt={Logo}/>
                <ul className="nav">
                        <li className="list">
                            <a href="">All schedules</a>
                        </li>
                        <li className="list">
                            <a href="">New schedule</a>
                        </li>
                        <li className="list">
                            <a href="">Employees</a>
                        </li>
                        <li className="list">
                            <a href="">
                                <img className="gear" src={Gear} alt={Gear}/>
                            </a>
                        </li>
                </ul>
        </header>
    );
}

// const head = {
//     position: 'relative',
//     // backgroundColor: "blue",
//     width: 'auto',
//     height: '5em',
//     padding: '1.5em',
//     margin: 0,
//     borderBottom: '0.1em solid lightGray',
// }

// const logo = {
//     // backgroundColor: 'red',
//     height : '1.74em',
//     width : '7.74em',
//     position: 'absolute',
//     left: '5em',
// }

// const nav = {
//     // backgroundColor: 'green',
//     listStyleType: 'none',
//     position: 'relative',
//     right: '10em',
//     bottom: '1em',
// }
//
// const list = {
//     // backgroundColor: 'orange',
//     float: 'right',
//     position: 'relative',
//
// }
//
// const link = {
//     display: 'block',
//     padding: '1em',
//     // backgroundColor: 'lightgray',
//     position: 'relative',
//
// }
//
// const gear = {
//     width: '1em',
//     height: '1em',
//     position: 'relative',
//     left:'27em',
//     top: '0.3em',
//     float: 'right',
//
// }

export default Header;