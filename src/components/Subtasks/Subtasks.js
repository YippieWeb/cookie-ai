import React, { useState, useEffect } from 'react';
import './Subtasks.css';
import AddSubtaskPopUp from './AddSubtaskPopUp';
import DeleteSubtaskPopUp from './DeleteSubtaskPopUp';

function Subtasks({ projectId }) {
    const [subtasks, setSubtasks] = useState([]);
    const [showAddPopup, setShowAddPopup] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [subtaskToDelete, setSubtaskToDelete] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (projectId) {
            fetch(`/projects/${projectId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Failed to fetch project: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(data => {
                    setSubtasks(data.subtasks || []);  // set subtasks, defaulting to empty if none
                    setError(null);  // clear any previous errors
                })
                .catch(error => {
                    setError(error.message);  // set error message
                    setSubtasks([]);  // reset subtasks on error
                });
        }
    }, [projectId]);

    // toggle add subtask popup
    const toggleAddPopup = () => {
        setShowAddPopup(!showAddPopup); 
    };

    // toggle delete subtask popup
    const toggleDeletePopup = (subtask) => {
        setShowDeletePopup(!showDeletePopup);
        setSubtaskToDelete(subtask);
    };

    // capitalize the first letter
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    // convert the time from minutes to [] hours [] minutes
    const formatTime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        if (hours > 0) {
            return `${hours}h ${remainingMinutes > 0 ? `${remainingMinutes}m` : ''}`;
        }
        return `${minutes}m`;
    };   
    
    const handleDelete = () => {
        if (!subtaskToDelete) return;

        fetch(`/projects/${projectId}/subtasks/${subtaskToDelete._id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to delete subtask: ${response.statusText}`);
            }
            // remove the deleted subtask from the state
            setSubtasks(prevSubtasks => prevSubtasks.filter(subtask => subtask._id !== subtaskToDelete._id));
            setShowDeletePopup(false);
            setSubtaskToDelete(null);
        })
        .catch(error => {
            setError(error.message);  // set error message
        });
    };

    return (
        <div className='subtasks'>
            <div className='wrapper'>
                <div className='header'>
                    <div className='title'>
                        <i className="fa-solid fa-wand-magic-sparkles"></i>
                        <p>AI-generated subtasks</p>
                    </div>
                    <button className='add-task-button' onClick={toggleAddPopup}>
                        <i className="fa-solid fa-circle-plus"></i>
                    </button>
                </div>
                <div className='subtasks-container'>
                    {subtasks.map((subtask) => (
                        <div key={subtask._id} className='subtask'>
                            <div className='stripe'></div>
                            <div className='wrapper'>
                                <p className='title'>{subtask.name}</p>
                                <p className='description'>{subtask.description}</p>
                                <div className='tools'>
                                    <div className='priority'>
                                        <div className={`level ${subtask.priority}`}>
                                            <p>{capitalizeFirstLetter(subtask.priority)}</p>
                                        </div>
                                        <div className='time'>
                                            <i className="fa-regular fa-clock"></i>
                                            <p><span>{formatTime(subtask.timeEstimated)}</span> estimated</p>
                                        </div>
                                    </div>
                                    <div className='edit'>
                                        <i className="fa-regular fa-pen-to-square"></i>
                                        <i className="fa-regular fa-trash-can" onClick={() => toggleDeletePopup(subtask)}></i>
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
            <AddSubtaskPopUp show={showAddPopup} onClose={toggleAddPopup} />
            <DeleteSubtaskPopUp 
                show={showDeletePopup} 
                onClose={() => setShowDeletePopup(false)} 
                onConfirm={handleDelete} 
            />
        </div>
    );
}

export default Subtasks;