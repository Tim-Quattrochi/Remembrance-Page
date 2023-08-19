import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./modal.css";

/**
 * @param {boolean} showModal -  Determines whether to show or hide the modal.
 * @param {function} handleClose - function to close the modal.
 * @param {function} toggleLogReg -  function to toggle between register and login components.
 * @param {ReactNode} children - The content displayed within the modal.
 * @returns {JSX.Element} The rendered modal component.
 */
const MyModal = ({
  showModal,
  handleClose,
  toggleLogReg,
  children,
}) => {
  return (
    <Modal centered size="md" show={showModal} onHide={handleClose}>
      <Modal.Body id="reg-log-modal-body" className="modal-body">
        {children}
      </Modal.Body>
      <Button id="close-btn" onClick={handleClose}>
        Close
      </Button>
    </Modal>
  );
};

export default MyModal;
