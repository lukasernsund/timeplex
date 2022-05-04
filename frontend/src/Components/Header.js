import React, { Component } from 'react';
import Logo from './Timeplex.png';
import Gear from './gear.png';
import './Header.css';
import { Link, NavLink } from 'react-router-dom';

// function Header() {
//     return (
//         <header className="header">
//                 <Link to="/"><img className="logo" src={Logo} alt={Logo}/></Link>
//                 <ul className="nav">
//                         <li className="list">
//                             <Link className="link" to="/AllSchedules">All schedules</Link>
//                         </li>
//                         <li className="list">
//                             <Link className="link" to="/Create">New schedule</Link>
//                         </li>
//                         <li className="list">
//                             <Link className="link" to="/Employee">Employees</Link>
//                         </li>
//                         <li className="list">
//                             <Link to="/Settings">
//                                 <img className="gear" src={Gear} alt={Gear}/>
//                             </Link>
//                         </li>
//                 </ul>
//         </header>
//     );
// }

// export default Header;

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