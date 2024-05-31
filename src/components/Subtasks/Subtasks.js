import React, { useState, useEffect } from 'react';
import './Subtasks.css';
import AddSubtaskPopUp from './AddSubtaskPopUp';
import EditSubtaskPopUp from './EditSubtaskPopUp';
import DeleteSubtaskPopUp from './DeleteSubtaskPopUp';

function Subtasks({ projectId }) {
    const [subtasks, setSubtasks] = useState([]);
    const [showAddPopup, setShowAddPopup] = useState(false);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [subtaskToDelete, setSubtaskToDelete] = useState(null);
    const [subtaskToEdit, setSubtaskToEdit] = useState(null);
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
                    setSubtasks(data.subtasks || []);
                    setError(null);
                })
                .catch(error => {
                    setError(error.message);
                    setSubtasks([]);
                });
        }
    }, [projectId]);

    const toggleAddPopup = () => {
        setShowAddPopup(!showAddPopup);
    };

    const toggleEditPopup = (subtask) => {
        setShowEditPopup(!showEditPopup);
        setSubtaskToEdit(subtask);
    };

    const toggleDeletePopup = (subtask) => {
        setShowDeletePopup(!showDeletePopup);
        setSubtaskToDelete(subtask);
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

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
            setSubtasks(prevSubtasks => prevSubtasks.filter(subtask => subtask._id !== subtaskToDelete._id));
            setShowDeletePopup(false);
            setSubtaskToDelete(null);
        })
        .catch(error => {
            setError(error.message);
        });
    };

    const handleAddSubtask = (newSubtask) => {
        fetch(`/projects/${projectId}/subtasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newSubtask),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to add subtask: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            setSubtasks(prevSubtasks => [...prevSubtasks, data]);
        })
        .catch(error => {
            setError(error.message);
        });
    };

    const handleEditSubtask = (updatedSubtask) => {
        fetch(`/projects/${projectId}/subtasks/${updatedSubtask._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedSubtask),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to update subtask: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            setSubtasks(prevSubtasks => prevSubtasks.map(subtask => subtask._id === data._id ? data : subtask));
        })
        .catch(error => {
            setError(error.message);
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
                                        <i className="fa-regular fa-pen-to-square" onClick={() => toggleEditPopup(subtask)}></i>
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
            <AddSubtaskPopUp show={showAddPopup} onClose={toggleAddPopup} onAddSubtask={handleAddSubtask} />
            <EditSubtaskPopUp show={showEditPopup} onClose={() => setShowEditPopup(false)} onEditSubtask={handleEditSubtask} subtask={subtaskToEdit} />
            <DeleteSubtaskPopUp 
                show={showDeletePopup} 
                onClose={() => setShowDeletePopup(false)} 
                onConfirm={handleDelete} 
            />
        </div>
    );
}

export default Subtasks;