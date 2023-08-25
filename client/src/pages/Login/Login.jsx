import { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useProvideAuth } from "../../hooks/useAuthProvider";
import Spinner from "react-bootstrap/Spinner";
import { validateFields } from "../../helpers/validateInputFields";
import { PiPuzzlePieceLight } from "react-icons/pi";
import { setAuthToken } from "../../hooks/useAxios";
import { PrimaryBtn } from "../../components/index";
import GoogleLoginBtn from "../../components/GoogleLoginBtn";
import "./login.css";

const initialState = {
  email: "",
  password: "",
};

const initialTouched = {
  email: true,
  password: true,
};

const Login = ({ toggle }) => {
  const [data, setData] = useState(initialState);
  const [touched, setTouched] = useState(initialTouched);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inputErrors, setInputErrors] = useState({});
  const navigate = useNavigate();
  const auth = useProvideAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;

    handleSetData({ [name]: value });

    setInputErrors({
      ...inputErrors,
      [name]: validateFields(name, data, touched),
    });
  };

  const handleSetData = (formData) => {
    setData({ ...data, ...formData });
  };

  const handleInputBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });

    setInputErrors({
      ...inputErrors,
      [name]: validateFields(name, data, touched),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsSubmitting(true);

    setTouched({
      //all fields were touched
      name: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    try {
      // Validate all fields on form submission
      const newErrors = {};
      Object.keys(data).forEach((fieldName) => {
        newErrors[fieldName] = validateFields(
          fieldName,
          data,
          touched
        );
      });
      setInputErrors(newErrors);

      // Check if there are any errors before submitting
      const isFormValid = Object.values(newErrors).every(
        (error) => error === ""
      ); //  all empty strings(no errors)

      if (isFormValid) {
        const res = await auth.login(data.email, data.password);
        setAuthToken(res.token);
        navigate("/");
      }

      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      // add server error
      handleSetData({ ...data, serverError: error.message });
    }
  };

  return (
    <div id="form-log-container">
      <Container className="d-flex justify-content-center align-items-center flex-column">
        <GoogleLoginBtn regOrLog="login" />
        <span className="secondary-log-text">OR</span>
        <h1 className="log-title">
          {" "}
          <PiPuzzlePieceLight size={32} color="green" />
          Login
        </h1>
        <Form className="row" id="log-form" onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              name="email"
              value={data.email}
              autoComplete="email"
              onChange={handleChange}
              onBlur={handleInputBlur}
              isInvalid={!!inputErrors.email}
            />
            <Form.Control.Feedback type="invalid">
              {inputErrors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={data.password}
              autoComplete="password"
              onChange={handleChange}
              onBlur={handleInputBlur}
              isValid={touched.password && data.password.length >= 7}
              isInvalid={!!inputErrors.password}
            />
            <Form.Control.Feedback type="invalid">
              {inputErrors.password}
            </Form.Control.Feedback>
          </Form.Group>

          {data.serverError && (
            <span className="form-error">{data.serverError}</span>
          )}
          <span className="log-btn-container">
            <PrimaryBtn
              text="Login"
              style="login-btn"
              icon={isSubmitting && <Spinner />}
            />
          </span>

          <Form.Text id="log-form-text">
            Need an account?{" "}
            <span
              className="login-toggle"
              onClick={() => toggle(true)}
            >
              Register
            </span>
          </Form.Text>
        </Form>
      </Container>
    </div>
  );
};

export default Login;
