import React, { useState, useEffect } from 'react';
import '../PopUp.css'

const AddProjectPopUp = ({ show, onClose, onAddProject }) => {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (show) {
      setProjectName('');
      setDescription('');
    }
  }, [show]);

  if (!show) return null;

  const handleSubmit = () => {
    onAddProject({ projectName, description });
    onClose();
  };

  return (
    <div className='add-project'>
      <div className="popup-overlay" onClick={onClose}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
              <div className='top'>
                <h2>Add Project</h2>
                <button className='close' onClick={onClose}>
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </div>
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
                  <button className="confirm-button" onClick={handleSubmit}>Add Project</button>
                  <button className="cancel-button" onClick={onClose}>Cancel</button>
              </div>
          </div>
      </div>
    </div>
  );
};

export default AddProjectPopUp; 