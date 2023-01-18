import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "../hooks/useAxios";
import Spinner from "react-bootstrap/Spinner";
import { setAuthToken } from "../hooks/useAuth";
import { toast } from "react-toastify";

const initialState = {
  email: "",
  password: "",
  isSubmitting: false,
  error: null,
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
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    e.preventDefault();
    e.stopPropagation();
    setData({
      ...data,
      isSubmitting: true,
      error: null,
    });
    try {
      const res = await axios.post("/users/login", {
        email: data.email,
        password: data.password,
      });
      setAuthToken(res.token);
      navigate("/");
    } catch (error) {
      setData({
        ...data,
        isSubmitting: false,
        error: error
          ? error.response.data.message || error.statusText
          : null,
      });
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center flex-column">
      <h1>Log in</h1>
      <Form
        noValidate
        validated
        className="row"
        style={{ width: "50%", maxWidth: "400px" }}
        onSubmit={handleSubmit}
      >
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            value={data.email}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
          />
        </Form.Group>
        {data.error && (
          <span className="form-error text-info">{data.error}</span>
        )}

        <Button type="submit" variant="primary">
          {data.isSubmitting ? <Spinner /> : "Login"}
        </Button>
        <Form.Text>
          Need an account? <Link to="/register">Register</Link>
        </Form.Text>
      </Form>
    </Container>
  );
};

export default SignUpPage;
