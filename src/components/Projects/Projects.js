import React, { useState, useEffect } from 'react';
import './Projects.css';
import ProjectPopUp from './ProjectPopUp';
import ConfirmationPopUp from './ConfirmationPopUp';

function Projects({ onSelectProject }) {
    const [projects, setProjects] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState(null);
    const [activeProjectId, setActiveProjectId] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3001/projects')
            .then(response => response.json())
            .then(data => {
                setProjects(data);
                if (data.length > 0) {
                    const mostRecentProjectId = data[0]._id;
                    setActiveProjectId(mostRecentProjectId);
                    onSelectProject(mostRecentProjectId);
                }
            })
            .catch(error => console.error('Error fetching projects:', error));
    }, [onSelectProject]);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const addProject = (project) => {
        fetch('http://localhost:3001/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        })
        .then(response => response.json())
        .then(newProject => {
            setProjects([newProject, ...projects]); // Add the new project at the beginning
            setActiveProjectId(newProject._id); // Automatically select the newly added project
            onSelectProject(newProject._id);
        })
        .catch(error => console.error('Error adding project:', error));
    };

    const handleDeleteClick = (projectId) => {
        setProjectToDelete(projectId);
        setShowConfirmation(true);
    };

    const confirmDelete = () => {
        fetch(`http://localhost:3001/projects/${projectToDelete}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                setProjects(projects.filter(project => project._id !== projectToDelete));
                if (activeProjectId === projectToDelete) {
                    setActiveProjectId(projects[0]?._id || null);
                    onSelectProject(projects[0]?._id || null);
                }
            } else {
                console.error('Error deleting project');
            }
        })
        .catch(error => console.error('Error deleting project:', error))
        .finally(() => {
            setShowConfirmation(false);
            setProjectToDelete(null);
        });
    };

    const handleProjectClick = (projectId) => {
        setActiveProjectId(projectId);
        onSelectProject(projectId);
    };

    return (
        <div className='projects'>
            <div className='header'>
                <h2>Projects</h2>
                <button className='add-project' onClick={togglePopup}>
                    <i className='fa-solid fa-plus'></i>
                </button>
            </div>
            <div className='projects-container'>
                {projects.map((project) => (
                    <div key={project._id} className='project-item'>
                        <button 
                            className={`title ${activeProjectId === project._id ? 'active' : ''}`} 
                            onClick={() => handleProjectClick(project._id)}
                        >
                            <p>{project.projectName}</p>
                        </button>
                        <button className='delete-button' onClick={() => handleDeleteClick(project._id)}>
                            <i className='fa-solid fa-trash'></i>
                        </button>
                    </div>
                ))}
            </div>
            <ProjectPopUp show={showPopup} onClose={togglePopup} onAddProject={addProject}/>
            <ConfirmationPopUp
                show={showConfirmation}
                onClose={() => setShowConfirmation(false)}
                onConfirm={confirmDelete}
            />
        </div>
    );
}

export default Projects;