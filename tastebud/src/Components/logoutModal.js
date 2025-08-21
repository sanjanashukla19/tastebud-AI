import React from 'react';
import Modal from 'react-modal';
import styles from '../css/LogoutModal.module.css';
import { useNavigate } from 'react-router-dom';

const LogoutModal = ({ isOpen, closeModal, onConfirm }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout actions
    localStorage.clear();
    onConfirm(); 
    navigate('/');
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} className={styles.modal} overlayClassName={styles.overlay}>
      <h3>Are you sure you want to logout?</h3>
      <button onClick={handleLogout} className={styles.confirmButton}>
        Yes
      </button>
      <button onClick={closeModal} className={styles.cancelButton}>
        No
      </button>
    </Modal>
  );
};

export default LogoutModal;
