import logo from '../assets/logo-blue.png';
import React from 'react';
import './Header.css';

function Header() {
    return (
        <div className='main-header'>
            <div className='left'>
                <div className='logo'>
                    <img src={logo} className='cookie-logo' alt="logo" />
                </div> 
                <div className='navbar'>
                    <p>Dashboard</p>
                    <p>Calendar</p>
                    <p>To-do List</p>
                </div>
            </div>
            <div className='right'>
                <p>Hi, Jasmine!</p>
                <i class="fa-solid fa-circle-user"></i>
            </div>
        </div>
    );
}

export default Header;