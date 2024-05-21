import logo from '../assets/logo-blue.png';
import React from 'react';
import './Instructions.css';

function Instructions() {
    return (
        <div className='instructions'>
            <div className='wrapper'>
                <div className='logo'>
                    <img src={logo} className='cookie-logo' alt="logo" />
                    <span>Cookie AI</span>
                </div>
                <div className='header'>
                    <h2>CSCI-103 Project 3 - Connecting Components</h2>
                    <p>Paste your assignment instructions below.</p>
                </div>
                <textarea className='instruction'></textarea>
                <div className='upload'>
                    <p>or</p>
                    <button className='upload-button'>
                        <p>Upload PDF</p>
                        <i className="fa-solid fa-arrow-up-from-bracket"></i>
                    </button>
                    <button className='send-button'>
                    <i className="fa-solid fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Instructions;