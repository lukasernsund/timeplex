import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from './Timeplex.png';
import Gear from './gear.png';
import './Header.css';

// function Header() {
//     return (
//         <header className="header">
//                 <Link to="/"><img className="logo" src={Logo} alt={Logo}/></Link>
//                 <ul className="nav">
//                         <li className="list">
//                             <NavLink 
//                                 to="/AllSchedules" activeClassName="selected">All schedules</NavLink>
//                         </li>
//                         <li className="list">
//                             <NavLink to="/Create">New schedule</NavLink>
//                         </li>
//                         <li className="list">
//                             <NavLink to="/Employee">Employees</NavLink>
//                         </li>
//                         <li className="list">
//                             <NavLink to="/Settings">
//                                 <img className="gear" src={Gear} alt={Gear}/>
//                             </NavLink>
//                         </li>
//                 </ul>
//         </header>
//     );
// }

function Header() {
    return (
        <header className="header">
            <Link to="/"><img className="logo" src={Logo} alt={Logo}/></Link>
            <NavLink to="/AllSchedules" activeClassName="active"> All Schedules </NavLink>
            <NavLink to="/Create" activeClassName="active"> New Schedule </NavLink>            
            <NavLink to="/Employee" activeClassName="active"> All Employees </NavLink>
            <Link to="/Settings"><img className="gear" src={Gear} alt={Gear}/></Link>
        </header>
    );
}

export default Header;