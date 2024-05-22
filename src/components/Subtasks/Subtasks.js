import React from 'react';
import './Subtasks.css'

function Subtasks() {
    return (
        <div className='subtasks'>
            <div className='wrapper'>
                <div className='header'>
                    <div className='title'>
                        <i className="fa-solid fa-wand-magic-sparkles"></i>
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
                                <p className='title'>Finalize the instructions column front-end and userflow</p>
                                <p className='description'>Decide on how to handle and display multiple files and text input.</p>
                                <div className='tools'>
                                    <div className='priority'>
                                        <i className="fa-solid fa-fire"></i>
                                        <div className='level'>
                                            <p>3</p>
                                        </div>
                                        <div className='time'>
                                            <p><span>45m</span> estimated</p>
                                        </div>
                                    </div>
                                    <div className='edit'>
                                        <i className="fa-regular fa-pen-to-square"></i>
                                        <i className="fa-solid fa-trash-can"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <div className='subtask'>
                        <div className='stripe'></div>
                        <div className='wrapper'>
                            <p className='title'>Integrate backend into the instructions column</p>
                            <p className='description'>Ensure project name and description are updated depending on which project is selected.</p>
                            <div className='tools'>
                                <div className='priority'>
                                    <i className="fa-solid fa-fire"></i>
                                    <div className='level'>
                                        <p>3</p>
                                    </div>
                                    <div className='time'>
                                        <p><span>45m</span> estimated</p>
                                    </div>
                                </div>
                                <div className='edit'>
                                    <i className="fa-regular fa-pen-to-square"></i>
                                    <i className="fa-solid fa-trash-can"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='subtask'>
                        <div className='stripe'></div>
                        <div className='wrapper'>
                            <p className='title'>Set up Instruction.js in models folder</p>
                            <p className='description'>Source Sans, designed for Adobe, is a sans-serif typeface that aligns with Inter in terms of clarity.</p>
                            <div className='tools'>
                                <div className='priority'>
                                    <i className="fa-solid fa-fire"></i>
                                    <div className='level'>
                                        <p>2</p>
                                    </div>
                                    <div className='time'>
                                        <p><span>15m</span> estimated</p>
                                    </div>
                                </div>
                                <div className='edit'>
                                    <i className="fa-regular fa-pen-to-square"></i>
                                    <i className="fa-solid fa-trash-can"></i>
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