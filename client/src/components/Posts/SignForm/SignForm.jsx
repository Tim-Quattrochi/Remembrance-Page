import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { Login, Register } from "../../../pages";
import { PrimaryBtn } from "../../../components";
import { FaUnlockAlt } from "react-icons/fa";
import { TfiPencil } from "react-icons/tfi";
import "./signForm.css";

const SignForm = ({
  handleSubmit,
  handleChange,
  content,
  userNow,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [toggleLogReg, setToggleLogReg] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  //if the user is a guest, show the login button, else show the text area

  return userNow === "Guest" ? (
    <>
      <div className="sign-btn-container">
        <PrimaryBtn
          style="sign-in-btn"
          onClick={handleClick}
          text={"SIGN IN TO POST"}
          icon={<FaUnlockAlt />}
        />
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Body className="modal-body">
          {toggleLogReg ? (
            <Register toggle={setToggleLogReg} />
          ) : (
            <Login toggle={setToggleLogReg} />
          )}
        </Modal.Body>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal>
    </>
  ) : (
    <Form
      onSubmit={handleSubmit}
      style={{
        marginBottom: "60px",
        marginTop: "30px",
      }}
    >
      <Form.Group>
        <Form.Control
          as="textarea"
          rows={3}
          id="text-area"
          placeholder={`Hi ${userNow}. Feel free to make a post`}
          value={content}
          size="lg"
          required
          onChange={handleChange}
        />
      </Form.Group>
      <span id="sign-gb-btn-container">
        <PrimaryBtn
          style="sign-in-btn"
          text="SIGN GUEST BOOK"
          icon={<TfiPencil />}
        />
      </span>
    </Form>
  );
};

export default SignForm;
