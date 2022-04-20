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
                            <a className="link" href="">All schedules</a>
                        </li>
                        <li className="list">
                            <a className="link" href="">New schedule</a>
                        </li>
                        <li className="list">
                            <a className="link" href="">Employees</a>
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

export default Header;