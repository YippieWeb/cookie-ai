import logo from './assets/logo-blue.png';
import React from 'react';
import './Header.css';

function Header() {
    return (
        <div className='main-header'>
            <div className='logo'>
                <img src={logo} className='cookie-logo' alt="logo" />
                <span>Cookie AI</span>
            </div>
        </div>
    );
}

export default Header;