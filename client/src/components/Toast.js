// src/components/Toast.js
import React, { useEffect } from 'react';
import './Toast.css';

function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Auto close after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast-container ${type}`}>
      <p>{message}</p>
      <span className="close-btn" onClick={onClose}>&times;</span>
    </div>
  );
}

export default Toast;
