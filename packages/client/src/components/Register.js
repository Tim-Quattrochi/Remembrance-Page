import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { useProvideAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { setAuthToken } from "../hooks/useAxios";

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

  const auth = useProvideAuth();

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
      toast.error("Passwords must match");
      return;
    }
    if (
      data.confirmPassword.length < 8 ||
      data.password.length > 20
    ) {
      toast.error("password must be between 8 and 20 characters");
      data.error = "password must be between 8 and 20 characters";
      return;
    }

    if (form.checkValidity() === false) {
    }

    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    });

    try {
      const res = await auth.signup(
        data.name,
        data.email,
        data.password,
        data.confirmPassword
      );
      setData({
        ...data,
        error: null,
        isSubmitting: false,
      });
      setAuthToken(res.token);

      navigate("/guest-book");
    } catch (error) {
      setData({
        ...data,
        isSubmitting: false,
        error: error ? error.message || error.statusText : null,
      });
      console.log(error);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center flex-column">
      <h1>Register</h1>
      <Form
        noValidate
        className="row"
        style={{
          width: "50%",
          maxWidth: "400px",
        }}
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
            type="email"
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
          variant="none"
          disabled={data.isSubmitting}
          style={{ backgroundColor: "#FDD037" }}
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
