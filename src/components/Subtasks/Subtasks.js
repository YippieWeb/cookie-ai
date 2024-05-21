import React from 'react';
import './Subtasks.css'

function Subtasks() {
    return (
        <div className='subtasks'>
            <div className='wrapper'>
                <div className='header'>
                    <div className='title'>
                        <i class="fa-solid fa-wand-magic-sparkles"></i>
                        <p>AI-generated sub-tasks</p>
                    </div>
                    <div className='export'>
                        <p>Export to</p>
                        <select id="export-options" name="export-options">
                            <option value="calendar">Calendar</option>
                            <option value="todo">To-do List</option>
                        </select>
                    </div>
                </div>
                <div className='subtasks-container'>
                    <div className='subtask'>
                        <div className='stripe'></div>
                        <div className='wrapper'>
                            <p className='title'>Watch the assignment information session recording</p>
                            <p className='description'>Source Sans, designed for Adobe, is a sans-serif typeface that aligns with Inter in terms of clarity.</p>
                            <div className='tools'>
                                <div className='priority'>
                                    <i class="fa-solid fa-fire"></i>
                                    <div className='level'>
                                        <p>3</p>
                                    </div>
                                </div>
                                <div className='edit'>
                                    <i class="fa-regular fa-pen-to-square"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='subtask'>
                        <div className='stripe'></div>
                        <div className='wrapper'>
                            <p className='title'>Watch the assignment information session recording</p>
                            <p className='description'>Source Sans, designed for Adobe, is a sans-serif typeface that aligns with Inter in terms of clarity.</p>
                            <div className='tools'>
                                <div className='priority'>
                                    <i class="fa-solid fa-fire"></i>
                                    <div className='level'>
                                        <p>3</p>
                                    </div>
                                </div>
                                <div className='edit'>
                                    <i class="fa-regular fa-pen-to-square"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Subtasks;