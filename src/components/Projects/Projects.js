import React, { useState, useEffect } from 'react';
import './Projects.css';

function Projects() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/projects')
            .then(response => response.json())
            .then(data => setProjects(data))
            .catch(error => console.error('Error fetching projects:', error));
    }, []);

    return (
        <div className='projects'>
            <div className='header'>
                <h2>Projects</h2>
                <button className='add-project'>
                    <i className='fa-solid fa-plus'></i>
                </button>
            </div>
            <div className='projects-container'>
                {projects.map((project) => (
                    <button key={project._id} className='title'>
                        <p>{project.projectName}</p>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Projects;