import React, { useState, useEffect } from 'react';
import '../PopUp.css'

const AddProjectPopUp = ({ show, onClose, onAddProject }) => {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');

  // error handling
  const [nameError, setNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  useEffect(() => {
    if (show) {
      setProjectName('');
      setDescription('');
    }
  }, [show]);

  if (!show) return null;

  const handleSubmit = () => {
    let hasError = false;

    if (!projectName.trim()) {
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
              <div className='field name'>
                  <input
                      type="text"
                      placeholder="Project Name"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
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
                      placeholder="Project Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className={descriptionError ? 'error' : ''}
                  ></textarea>
                  {descriptionError && (
                      <div className="error-message">
                          <i className="fa-solid fa-exclamation-circle"></i> Please enter a description
                      </div>
                  )}
              </div>
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