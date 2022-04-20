import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Timeplex.png';
import Gear from './gear.png';
import './Header.css';

function Header() {
    return (
        <header className="header">
                <Link to="/"><img className="logo" src={Logo} alt={Logo}/></Link>
                <ul className="nav">
                        <li className="list">
                            <Link className="link" to="/Schedule">All schedules</Link>
                        </li>
                        <li className="list">
                            <Link className="link" to="/Create">New schedule</Link>
                        </li>
                        <li className="list">
                            <Link className="link" to="/Staff">Employees</Link>
                        </li>
                        <li className="list">
                            <Link to="/Settings">
                                <img className="gear" src={Gear} alt={Gear}/>
                            </Link>
                        </li>
                </ul>
        </header>
    );
}

export default Header;