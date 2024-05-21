import { React } from 'react';

import Header from "../components/Header/Header"
import Projects from "../components/Projects/Projects";
import Instructions from "../components/Instructions/Instructions"
import Subtasks from "../components/Subtasks/Subtasks"

function Dashboard() {
    return (
        <div className='dashboard'>
            <Header />
            <div className='columns'>
                <div className='project-column'>
                    <Projects />
                </div>
                <div className='instruction-column'>
                    <Instructions />
                </div>
                <div className='subtask-column'>
                    <Subtasks />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;