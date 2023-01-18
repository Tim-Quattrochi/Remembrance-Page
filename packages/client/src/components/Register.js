import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import axios from "../hooks/useAxios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  error: null,
  isSubmitting: false,
};

const SignUpPage = () => {
  const [data, setData] = useState(initialState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    e.stopPropagation();

    if (data.password !== data.confirmPassword) {
      data.error = "passwords must match";
    }
    if (
      data.confirmPassword.length < 8 ||
      data.password.length > 20
    ) {
      data.error = "password must be between 8 and 20 characters.";
    }

    if (form.checkValidity() === false) {
    }

    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    });

    try {
      const res = await axios.post("/users", {
        name: data.name,
        password: data.password,
        confirmPassword: data.confirmPassword,
        email: data.email,
      });
      setData({
        ...data,
        errorMessage: null,
        isSubmitting: false,
      });

      navigate("/");
    } catch (error) {
      setData({
        ...data,
        isSubmitting: false,
        errorMessage: error
          ? error.message || error.statusText
          : null,
      });
      console.log(error);
    }
    console.log(data.email);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center flex-column">
      <h1>Register</h1>
      <Form
        noValidate
        className="row"
        style={{ width: "50%", maxWidth: "400px" }}
        onSubmit={handleSubmit}
      >
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            value={data.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            maxLength={20}
            minLength={8}
            value={data.password}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            value={data.confirmPassword}
            maxLength={20}
            minLength={8}
            onChange={handleChange}
            required
          />
        </Form.Group>
        {data.error && (
          <span className="form-error text-info">{data.error}</span>
        )}

        <Button
          type="submit"
          variant="primary"
          disabled={data.isSubmitting}
        >
          {data.isSubmitting ? <Spinner /> : "Register"}
        </Button>
        <Form.Text>
          Already have an account? <Link to="/login">Log in</Link>
        </Form.Text>
      </Form>
    </Container>
  );
};

export default SignUpPage;
