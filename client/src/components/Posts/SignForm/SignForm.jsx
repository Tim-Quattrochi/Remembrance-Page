import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import signBtn from "../../../assets/signBtn.svg";
import pressedBtn from "../../../assets/pressedBtn.svg";
import { Login } from "../../../pages";
import "./signForm.css";

const SignForm = ({
  handleSubmit,
  handleChange,
  content,
  userNow,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  //if the user is a guest, show the login button, else show the text area

  return userNow === "Guest" ? (
    <>
      <Button onClick={handleClick}>Sign In to post</Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Body className="modal-body">
          <Login />
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
        marginBottom: "50px",
        marginTop: "30px",
      }}
    >
      <Form.Group controlId="content">
        <Form.Control
          as="textarea"
          rows="3"
          placeholder={`Hi ${userNow}. Feel free to make a post`}
          value={content}
          size="lg"
          required
          onChange={handleChange}
        />
      </Form.Group>
      <Button
        variant="none"
        type="submit"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={isHovered ? pressedBtn : signBtn}
          alt="SVG Button"
          style={{ height: "50px", width: "224px" }}
        />
      </Button>
    </Form>
  );
};

export default SignForm;
