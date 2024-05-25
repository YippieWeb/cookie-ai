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
                            <p className='title'>Sample subtask</p>
                            <p className='description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            <div className='tools'>
                                <div className='priority'>
                                    <i className="fa-solid fa-fire"></i>
                                    <div className='level'>
                                        <p>3</p>
                                    </div>
                                    <div className='time'>
                                        <p><span>1h</span> estimated</p>
                                    </div>
                                </div>
                                <div className='edit'>
                                    <i className="fa-regular fa-pen-to-square"></i>
                                    <i className='fa-solid fa-trash'></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className='subtask'>
                        <div className='stripe'></div>
                        <div className='wrapper'>
                            <p className='title'>Test out ability to add subtask to subtasks array</p>
                            <p className='description'>Make sure that the subtask data structure is already defined.</p>
                            <div className='tools'>
                                <div className='priority'>
                                    <i className="fa-solid fa-fire"></i>
                                    <div className='level'>
                                        <p>3</p>
                                    </div>
                                    <div className='time'>
                                        <p><span>15m</span> estimated</p>
                                    </div>
                                </div>
                                <div className='edit'>
                                    <i className="fa-regular fa-pen-to-square"></i>
                                    <i className='fa-solid fa-trash'></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='subtask'>
                        <div className='stripe'></div>
                        <div className='wrapper'>
                            <p className='title'>Try CRUD operations on some subtasks</p>
                            <p className='description'>Add ability to add, edit, and delete subtask. This ability will be there in the future anyway so we can do this first.</p>
                            <div className='tools'>
                                <div className='priority'>
                                    <i className="fa-solid fa-fire"></i>
                                    <div className='level'>
                                        <p>2</p>
                                    </div>
                                    <div className='time'>
                                        <p><span>1h</span> estimated</p>
                                    </div>
                                </div>
                                <div className='edit'>
                                    <i className="fa-regular fa-pen-to-square"></i>
                                    <i className='fa-solid fa-trash'></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='subtask'>
                        <div className='stripe'></div>
                        <div className='wrapper'>
                            <p className='title'>Integrate ChatGPT API into the app and use a simple prompt</p>
                            <p className='description'>E.g. break down this task into manageable subtasks, provide title, desc, priority, and time. Oh future feature! Let user define how "mini" do they want the tasks to be.</p>
                            <div className='tools'>
                                <div className='priority'>
                                    <i className="fa-solid fa-fire"></i>
                                    <div className='level'>
                                        <p>3</p>
                                    </div>
                                    <div className='time'>
                                        <p><span>2h</span> estimated</p>
                                    </div>
                                </div>
                                <div className='edit'>
                                    <i className="fa-regular fa-pen-to-square"></i>
                                    <i className='fa-solid fa-trash'></i>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default Subtasks;