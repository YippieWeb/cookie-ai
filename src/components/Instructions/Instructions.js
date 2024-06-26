import logo from '../assets/logo-blue.png'; 
import React, { useState, useEffect, useRef } from 'react';
import './Instructions.css';

function Instructions({ projectId }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [instructionText, setInstructionText] = useState('');
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [error, setError] = useState(null);
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);

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
        const handleClickOutside = (event) => {
            if (titleRef.current && !titleRef.current.contains(event.target)) {
                setIsEditingTitle(false);
            }
            if (descriptionRef.current && !descriptionRef.current.contains(event.target)) {
                setIsEditingDescription(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [titleRef, descriptionRef]);

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

    const debounce = (func, delay) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), delay);
        };
    };

    const updateTitle = debounce((newTitle) => {
        fetch(`/projects/${projectId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ projectName: newTitle }),
        })
        .then(response => response.json())
        .catch(error => console.error('Error updating title:', error));
    }, 1000);

    const updateDescription = debounce((newDescription) => {
        fetch(`/projects/${projectId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ description: newDescription }),
        })
        .then(response => response.json())
        .catch(error => console.error('Error updating description:', error));
    }, 1000);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        updateTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
        updateDescription(e.target.value);
    };

    const handleTitleBlur = () => {
        setIsEditingTitle(false);
    };

    const handleDescriptionBlur = () => {
        setIsEditingDescription(false);
    };

    const handleTitleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setIsEditingTitle(false);
        }
    };

    const handleDescriptionKeyDown = (e) => {
        if (e.key === 'Enter') {
            setIsEditingDescription(false);
        }
    };

    return (
        <div className='instructions'>
            <div className='wrapper'>
                <div className='logo'>
                    <img src={logo} className='cookie-logo' alt="logo" />
                    <span>Cookie AI</span>
                </div>
                <div className='header'>
                    <div className='title-container' ref={titleRef}>
                        {isEditingTitle ? (
                            <input
                                type='text' 
                                value={title} 
                                onChange={handleTitleChange}
                                onBlur={handleTitleBlur}
                                onKeyDown={handleTitleKeyDown}
                                autoFocus
                            />
                        ) : (
                            <h2 onClick={() => setIsEditingTitle(true)}>
                                {title || "Title"}
                            </h2>
                        )}
                    </div>
                    <div className='desc'>
                        <div className='left'>
                            <p>Description</p>
                        </div>
                        <div className='right' ref={descriptionRef}>
                            {isEditingDescription ? (
                                <textarea
                                    rows="1"
                                    value={description}
                                    onChange={handleDescriptionChange}
                                    onBlur={handleDescriptionBlur}
                                    onKeyDown={handleDescriptionKeyDown}
                                    autoFocus
                                />
                            ) : (
                                <p className='description' onClick={() => setIsEditingDescription(true)}>
                                    {description || "Add a description"}
                                </p>
                            )}
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