import React, { useState, useEffect } from 'react';
import '../PopUp.css';

const EditSubtaskPopUp = ({ show, onClose, onEditSubtask, subtask }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('medium');
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);

    // error handling
    const [nameError, setNameError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);

    useEffect(() => {
        if (subtask) {
            setName(subtask.name);
            setDescription(subtask.description);
            setPriority(subtask.priority);
            const estimatedHours = Math.floor(subtask.timeEstimated / 60);
            const estimatedMinutes = subtask.timeEstimated % 60;
            setHours(estimatedHours);
            setMinutes(estimatedMinutes);
        }
    }, [subtask]);

    if (!show || !subtask) {
        return null;
    }

    const handleEditSubtask = () => {
        let hasError = false;

        if (!name.trim()) {
            setNameError(true);
            hasError = true;
        } else {
            setNameError(false);
        }

        if (!description.trim()) {
            setDescriptionError(true);
            hasError = true;
        } else {
            setDescriptionError(false);
        }

        if (hasError) {
            return;
        }

        const timeEstimated = parseInt(hours) * 60 + parseInt(minutes);
        const updatedSubtask = { ...subtask, name, description, priority, timeEstimated };
        onEditSubtask(updatedSubtask);
        onClose();
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
        if (nameError) {
            setNameError(false);
        }
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
        if (descriptionError) {
            setDescriptionError(false);
        }
    };

    return (
        <div className='edit-subtask'>
            <div className="popup-overlay" onClick={onClose}>
                <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                    <div className='top'>
                        <h2>Edit subtask</h2>
                        <button className='close' onClick={onClose}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                    <div className='field name'>
                        <input
                            type="text"
                            placeholder="Subtask name"
                            value={name}
                            onChange={handleNameChange}
                            onFocus={() => setNameError(false)}
                            className={nameError ? 'error' : ''}
                        />
                        {nameError && (
                            <div className="error-message">
                                <i className="fa-solid fa-exclamation-circle"></i> Please enter a name
                            </div>
                        )}
                    </div>
                    <div className='field description'>
                        <textarea
                            placeholder="Subtask description"
                            value={description}
                            onChange={handleDescriptionChange}
                            onFocus={() => setDescriptionError(false)}
                            className={descriptionError ? 'error' : ''}
                        ></textarea>
                        {descriptionError && (
                            <div className="error-message">
                                <i className="fa-solid fa-exclamation-circle"></i> Please enter a description
                            </div>
                        )}
                    </div>
                    <div className='priority'>
                        <i className="fa-solid fa-fire"></i>
                        <div className='level'>
                            <select id="priority-options" name="priority-options" value={priority} onChange={(e) => setPriority(e.target.value)}>
                                <option value="critical">Critical</option>
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </select>
                        </div>
                        <div className='time'>
                            <i className="fa-solid fa-stopwatch"></i>
                            <select id="hours-options" name="hours-options" className="time-selector" value={hours} onChange={(e) => setHours(e.target.value)}>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            <span>hours</span>
                            <select id="minutes-options" name="minutes-options" className="time-selector" value={minutes} onChange={(e) => setMinutes(e.target.value)}>
                                <option value="00">00</option>
                                <option value="15">15</option>
                                <option value="30">30</option>
                                <option value="45">45</option>
                            </select>
                            <span>minutes</span>
                        </div>
                    </div>
                    <div className='buttons'>
                        <button className="confirm-button" onClick={handleEditSubtask}>Save Changes</button>
                        <button className="cancel-button" onClick={onClose}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditSubtaskPopUp;