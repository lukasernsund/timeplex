import React, { Component } from 'react';
import Logo from './Timeplex.png';
import Gear from './gear.png';


function Header() {
    return (
        <header style={head}>
            <img src={Logo} alt={Logo} style={logo}/>
            <ul style={nav}>
                <li style={list}><a style={link} href="">All schedules</a></li>
                <li style={list}><a style={link} href="">New schedule</a></li>
                <li style={list}><a style={link} href="">Employees</a></li>
                <a style={link} href=""> <img src={Gear} alt={Gear} style={gear}/> </a>
            </ul>
        </header>
    );
}

const head = {
    position: 'relative',
    // backgroundColor: "blue",
    width: 'auto',
    height: '5em',
    padding: '1.5em',
    margin: 0,
    borderBottom: '0.1em solid lightGray',
}

const logo = {
    // backgroundColor: 'red',
    height : '1.74em',
    width : '7.74em',
    position: 'absolute',
    left: '5em',

}

const nav = {
    // backgroundColor: 'green',
    listStyleType: 'none',
    position: 'relative',
    right: '10em',
    bottom: '1em',
}

const list = {
    // backgroundColor: 'orange',
    float: 'right',
    position: 'relative',

}

const link = {
    display: 'block',
    padding: '1em',
    // backgroundColor: 'lightgray',
    position: 'relative',

}

const gear = {
    width: '1em',
    height: '1em',
    position: 'relative',
    left:'27em',
    top: '0.3em',
    float: 'right',

}

export default Header;