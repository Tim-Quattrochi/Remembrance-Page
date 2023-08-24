import { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { PiPuzzlePieceLight } from "react-icons/pi";
import { useProvideAuth } from "../../hooks/useAuthProvider";
import { validateFields } from "../../helpers/validateInputFields";
import { useNavigate } from "react-router-dom";
import { PrimaryBtn } from "../../components/index";
import { setAuthToken } from "../../hooks/useAxios";
import GoogleLoginBtn from "../../components/GoogleLoginBtn";
import "./register.css";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const initialTouched = {
  name: true,
  email: true,
  password: true,
  confirmPassword: true,
};

// eslint-disable-next-line react/prop-types
const SignUpPage = ({ toggle }) => {
  const [data, setData] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inputErrors, setInputErrors] = useState({});
  const [touched, setTouched] = useState(initialTouched);
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
        const res = await auth.signup(
          data.name,
          data.email,
          data.password,
          data.confirmPassword
        );

        if (res) {
          setAuthToken(res); //res has the token from response
          navigate("/");
        }
      }
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      // add server error
      handleSetData({ ...data, serverError: error.message });
    }
  };

  return (
    <div id="form-container">
      <Container className="d-flex justify-content-center align-items-center flex-column">
        <GoogleLoginBtn />
        <span className="secondary-reg-text">OR</span>
        <h1 className="reg-title">
          <PiPuzzlePieceLight size={32} color="green" /> Create an
          account
        </h1>
        <Form noValidate id="reg-form" onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group className="mb-3 name">
              <Form.Label htmlFor="name">Name</Form.Label>

              <Form.Control
                type="text"
                name="name"
                id="name"
                autoComplete="name"
                value={data.name}
                onChange={handleChange}
                onBlur={handleInputBlur}
                isValid={touched.name && data.name.length >= 3}
                isInvalid={!!inputErrors.name}
              />
              <Form.Control.Feedback type="invalid">
                {inputErrors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                value={data.email}
                onChange={handleChange}
                onBlur={handleInputBlur}
                isInvalid={!!inputErrors.email}
              />
              <Form.Control.Feedback type="invalid">
                {inputErrors.email}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="password">Password</Form.Label>
            <Row className="mb-3">
              <Col>
                <Form.Control
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="new-password"
                  maxLength={20}
                  minLength={8}
                  value={data.password}
                  onChange={handleChange}
                  onBlur={handleInputBlur}
                  isValid={
                    touched.password && data.password.length >= 7
                  }
                  isInvalid={!!inputErrors.password}
                />
              </Col>
            </Row>
            <Form.Control.Feedback type="invalid">
              {inputErrors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="confirmPassword">
              Confirm Password
            </Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              autoComplete="new-password"
              value={data.confirmPassword}
              maxLength={20}
              minLength={8}
              onChange={handleChange}
              onBlur={handleInputBlur}
              isValid={
                touched.confirmPassword &&
                data.password === data.confirmPassword &&
                data.confirmPassword.length >= 7
              }
              isInvalid={!!inputErrors.confirmPassword}
            />
            <Form.Control.Feedback type="invalid">
              {inputErrors.confirmPassword}
            </Form.Control.Feedback>
          </Form.Group>

          {data.serverError && (
            <span className="form-error">{data.serverError}</span>
          )}
          <PrimaryBtn
            text="Register"
            style="reg-btn"
            icon={isSubmitting && <Spinner />}
          />

          <Form.Text id="have-account">
            Already have an account?{" "}
            <span className="reg-toggle" onClick={toggle}>
              Log in
            </span>
          </Form.Text>
        </Form>
      </Container>
    </div>
  );
};

export default SignUpPage;
