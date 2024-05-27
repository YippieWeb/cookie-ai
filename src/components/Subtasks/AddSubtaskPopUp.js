import React from 'react';
import '../PopUp.css';

const AddSubtaskPopUp = ({ show, onClose }) => {
    if (!show) {
        return null;
    }
    
    return (
        <div className='add-subtask'>
            <div className="popup-overlay" onClick={onClose}>
                <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                    <div className='top'>
                        <h2>Add a subtask</h2>
                        <button className='close' onClick={onClose}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                    <input
                        type="text"
                        placeholder="Subtask name"
                    />
                    <textarea
                        placeholder="Subtask description"
                    ></textarea>
                    <div className='priority'>
                        <i className="fa-solid fa-fire"></i>
                        <div className='level'>
                            <select id="priority-options" name="priority-options">
                                <option value="critical">Critical</option>
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </select>
                        </div>
                        <div className='time'>
                            <i className="fa-solid fa-stopwatch"></i>
                            <select id="hours-options" name="hours-options" className="time-selector">
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            <span>hours</span>
                            <select id="minutes-options" name="minutes-options" className="time-selector">
                                <option value="00">00</option>
                                <option value="15">15</option>
                                <option value="30">30</option>
                                <option value="45">45</option>
                            </select>
                            <span>minutes</span>
                        </div>
                    </div>
                    <div className='buttons'>
                        <button className="confirm-button">Add Subtask</button>
                        <button className="cancel-button" onClick={onClose}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddSubtaskPopUp;