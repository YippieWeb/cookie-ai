import React from 'react';
import './Projects.css'

function Projects() {
    return (
        <div className='projects'>
            <div className='header'>
                <h2>Projects</h2>
                <button className='add-project'>
                    <i className="fa-solid fa-plus"></i>
                </button>
            </div>
            <div className='projects-container'>
                <button className="title active">
                    <p>CSCI-103 Project 3 - Connecting Components</p>
                </button>
                <button className="title">
                    <p>WRIT-150 WP3 Card Game Design</p>
                </button>
                <button className="title">
                    <p>Develop Cookie AI for real</p>
                </button>
            </div>
        </div>
    );
}

export default Projects;