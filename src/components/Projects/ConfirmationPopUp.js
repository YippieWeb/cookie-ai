import React from 'react';
import './PopUp.css';

const ConfirmationPopUp = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div className='delete-project'>
      <div className="popup-overlay">
        <div className="popup-content">
          <h2>Delete project</h2>
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

export default ConfirmationPopUp;