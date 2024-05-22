import React, { useState } from 'react';

import Header from "../components/Header/Header";
import Projects from "../components/Projects/Projects";
import Instructions from "../components/Instructions/Instructions";
import Subtasks from "../components/Subtasks/Subtasks";

function Dashboard() {
    const [selectedProjectId, setSelectedProjectId] = useState(null);

    return (
        <div className='dashboard'>
            <Header />
            <div className='columns'>
                <div className='project-column'>
                    <Projects onSelectProject={setSelectedProjectId} />
                </div>
                <div className='instruction-column'>
                    <Instructions projectId={selectedProjectId} />
                </div>
                <div className='subtask-column'>
                    <Subtasks />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
