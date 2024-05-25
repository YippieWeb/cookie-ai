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

    useEffect(() => {
        const saveInterval = setInterval(() => {
            if (instructionText && projectId) {
                fetch(`/projects/${projectId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ instructionText }),
                })
                .then(response => response.json())
                .then(data => console.log('Instruction text saved:', data))
                .catch(error => console.error('Error saving instruction text:', error));
            }
        }, 5000); // save text every 5 seconds

        return () => clearInterval(saveInterval); // clear interval on component unmount
    }, [instructionText, projectId]);

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
                    <p>Paste your assignment instructions below.</p>
                </div>
                <textarea 
                    className='instruction'
                    value={instructionText}
                    onChange={(e) => setInstructionText(e.target.value)}
                    disabled={!!error}
                ></textarea>
                {error && <p className='error'>{error}</p>}
                <div className='upload'>
                    <p>or</p>
                    <button className='upload-button' disabled={!!error}>
                        <p>Upload PDF</p>
                        <i className="fa-solid fa-arrow-up-from-bracket"></i>
                    </button>
                    <button className='send-button' disabled={!!error}>
                        <i className="fa-solid fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Instructions;