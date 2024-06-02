import logo from '../assets/logo-blue.png';
import React, { useState, useEffect } from 'react';
import './Instructions.css';

function Instructions({ projectId }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [instructionText, setInstructionText] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        if (projectId) {
            fetch(`/projects/${projectId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error fetching project: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(data => {
                    setTitle(data.projectName);
                    setDescription(data.description);
                    setInstructionText(data.instructionText || '');
                    setError(null);
                })
                .catch(error => {
                    console.error('Error fetching project details:', error);
                    setError('Project not found');
                    setTitle('');
                    setDescription('');
                    setInstructionText('');
                });
        }
    }, [projectId]);

    async function updateInstructionText () {
        fetch(`/projects/${projectId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ instructionText }),
        })
        .then(response => response.json())
        .catch(error => console.error('Error saving instruction text:', error));
    }

    return (
        <div className='instructions'>
            <div className='wrapper'>
                <div className='logo'>
                    <img src={logo} className='cookie-logo' alt="logo" />
                    <span>Cookie AI</span>
                </div>
                <div className='header'>
                    <h2>{title || 'Add a new project'}</h2>
                    <div className='desc'>
                        <div className='left'>
                            <p>Description</p>
                        </div>
                        <div className='right'>
                            <p className='description'>
                                {description}
                            </p>
                        </div>
                    </div>
                </div>
                <textarea 
                    className='instruction'
                    placeholder="Paste in your assignment instructions."
                    value={instructionText}
                    onChange={(e) => setInstructionText(e.target.value)}
                    onBlur={updateInstructionText}
                    disabled={!!error}
                ></textarea>
                {error && <p className='error'>{error}</p>}
                <div className='generate'>
                    <button className='generate-button'>
                        <i className="fa-solid fa-wand-magic-sparkles"></i>
                        <p>Generate subtasks</p>
                    </button>
                </div>
                <div className='upload'>
                    {/* <p>or</p>
                    <button className='upload-button' disabled={!!error}>
                        <p>Upload PDF</p>
                        <i className="fa-solid fa-arrow-up-from-bracket"></i>
                    </button>
                    <button className='send-button' disabled={!!error}>
                        <i className="fa-solid fa-paper-plane"></i>
                    </button> */}
                </div>
            </div>
        </div>
    );
}

export default Instructions;