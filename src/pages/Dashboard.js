import React from 'react';

import Project from "../components/Project";
import Assignment from "../components/Assignment"
import Subtask from "../components/Subtask"

function Dashboard() {
    return (
        <div className="dashboard">
            <div className="project-column">
                <Project />
            </div>
            <div className="assignment-column">
                <Assignment />
            </div>
            <div className="subtask-column">
                <Subtask />
            </div>
        </div>
    );
}

export default Dashboard;