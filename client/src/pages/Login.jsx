import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useProvideAuth } from "../hooks/useAuthProvider";
import Spinner from "react-bootstrap/Spinner";
import { setAuthToken } from "../hooks/useAxios";
import GoogleLoginBtn from "../components/GoogleLoginBtn";

const initialState = {
  email: "",
  password: "",
  isSubmitting: false,
  error: null,
};

const Login = () => {
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
      const res = await auth.login(data.email, data.password);
      setAuthToken(res.token);
      navigate("/");
    } catch (error) {
      setData({
        ...data,
        isSubmitting: false,
        error: error ? error.message || error.statusText : null,
      });
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center flex-column">
      <h1>Log in</h1>
      <Form
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
            autoComplete="email"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={data.password}
            autoComplete="password"
            onChange={handleChange}
          />
        </Form.Group>
        {data.error && (
          <span className="form-error text-info">{data.error}</span>
        )}

        <Button
          type="submit"
          variant="none"
          style={{ backgroundColor: "#FDD037" }}
        >
          {data.isSubmitting ? <Spinner /> : "Login"}
        </Button>
        <Form.Text>
          Need an account? <Link to="/register">Register</Link>
        </Form.Text>
      </Form>

      <GoogleLoginBtn />
    </Container>
  );
};

export default Login;
