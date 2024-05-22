import logo from '../assets/logo-blue.png';
import React from 'react';
import './Header.css';

function Header() {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <a href="/" className="logo">
                <img src={logo} className='logo' alt="logo" />
                </a>
                <ul className="nav-links">
                    <li>
                        <a href="/calendar">Calendar</a>
                    </li>
                    <li>
                        <a href="/to-do">To-do List</a>
                    </li>
                    <li className='active'>
                        <a href="/dashboard">Dashboard</a>
                    </li>
                </ul>
            </div>
            <div className="navbar-right">
                <p>Hi, Jasmine!</p>
                <a href="/account" className="user-icon">
                    <i className="fa-solid fa-circle-user"></i>
                </a>
            </div>
        </nav>
    );
}

export default Header;