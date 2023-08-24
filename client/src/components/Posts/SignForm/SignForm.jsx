import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Login, Register } from "../../../pages";
import { PrimaryBtn, MyModal } from "../../../components";
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

  const handleToggle = () => {
    setToggleLogReg((prev) => !prev);
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

      <MyModal showModal={showModal} handleClose={handleClose}>
        {" "}
        {toggleLogReg ? (
          <Register toggle={handleToggle} />
        ) : (
          <Login toggle={handleToggle} />
        )}
      </MyModal>
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
