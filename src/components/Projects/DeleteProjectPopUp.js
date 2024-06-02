import React from 'react';
import '../PopUp.css'

const DeleteProjectPopUp = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div className='delete project'>
      <div className="popup-overlay" onClick={onClose}>
        <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <div className='top'>
            <h2>Delete project</h2>
            <button className='close' onClick={onClose}>
                <i className="fa-solid fa-xmark"></i>
            </button>
        </div>
          <p>Once deleted, this project will no longer be accessible. This process cannot be undone.</p>
          <div className='buttons'>
            <button className="confirm-button" onClick={onConfirm}>Delete</button>
            <button className="cancel-button" onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteProjectPopUp;