import React, { useState } from 'react';
import './ProjectPopUp.css';

const ProjectPopUp = ({ show, onClose, onAddProject }) => {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');

  if (!show) return null;

  const handleSubmit = () => {
    onAddProject({ projectName, description });
    onClose();
  };

  return (
    <div className="popup-overlay">
        <div className="popup-content">
            <h2>Add Project</h2>
            <input
              type="text"
              placeholder="Project Name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
            <textarea
              placeholder="Project Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <div className='buttons'>
                <button className="close-button add" onClick={handleSubmit}>Add Project</button>
                <button className="close-button cancel" onClick={onClose}>Cancel</button>
            </div>
        </div>
    </div>
  );
};

export default ProjectPopUp;