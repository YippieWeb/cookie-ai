import React, { useState, useEffect } from 'react';
import './Subtasks.css';
import AddSubtaskPopUp from './AddSubtaskPopUp';

function Subtasks({ projectId }) {
    const [subtasks, setSubtasks] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log(projectId);
        if (projectId) {
            fetch(`/projects/${projectId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Failed to fetch project: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log("Full subtask object:", data);
                    setSubtasks(data.subtasks || []);  // set subtasks, defaulting to empty if none
                    setError(null);  // clear any previous errors
                })
                .catch(error => {
                    console.error('Fetch error:', error);
                    setError(error.message);  // set error message
                    setSubtasks([]);  // reset subtasks on error
                    console.log(error);
                });
        }
    }, [projectId]);

    const togglePopup = () => {
        setShowPopup(!showPopup); 
    };

    return (
        <div className='subtasks'>
            <div className='wrapper'>
                <div className='header'>
                    <div className='title'>
                        <i className="fa-solid fa-wand-magic-sparkles"></i>
                        <p>AI-generated subtasks</p>
                    </div>
                    <button className='add-task-button' onClick={togglePopup}>
                        <i className="fa-solid fa-circle-plus"></i>
                    </button>
                </div>
                <div className='subtasks-container'>
                    {subtasks.map((subtask, index) => (
                        <div key={index} className='subtask'>
                            <div className='stripe'></div>
                            <div className='wrapper'>
                                <p className='title'>{subtask.name}</p>
                                <p className='description'>{subtask.description}</p>
                                <div className='tools'>
                                    <div className='priority'>
                                        <div className={`level ${subtask.priority}`}>
                                            <p>{subtask.priority}</p>
                                        </div>
                                        <div className='time'>
                                            <i className="fa-regular fa-clock"></i>
                                            <p><span>{subtask.time}m</span> estimated</p>
                                        </div>
                                    </div>
                                    <div className='edit'>
                                        <i className="fa-regular fa-pen-to-square"></i>
                                        <i className='fa-solid fa-trash'></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='export'>
                    <button className='export-button'>
                        <p>Export</p>
                    </button>
                </div>
            </div>
            <AddSubtaskPopUp show={showPopup} onClose={togglePopup} />
        </div>
    );
}

export default Subtasks;