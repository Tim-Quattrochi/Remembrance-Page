import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

import { useProvideAuth } from "../hooks/useAuthProvider";
import { Link, useLocation } from "react-router-dom";
import logoAlt from "../assets/logoAlt.svg";
import LogoutButton from "./Logout";

function NavBar() {
  const location = useLocation();

  const { getCurrentUser } = useProvideAuth();

  let user = getCurrentUser();

  return (
    <Nav
      className="navbar justify-content-center border-bottom-0"
      variant="tabs"
      activeKey={location.pathname}
    >
      <Container>
        <Link
          to="/"
          className="logo-container"
          style={{ fontFamily: "Kristen ITC" }}
        >
          <img
            src={logoAlt}
            width="204"
            height="100"
            className="logo"
            alt="React Bootstrap logo"
          />
        </Link>
      </Container>
      <Nav.Item>
        <Nav.Link
          eventKey="/"
          as={Link}
          to="/"
          className="navbar-text"
        >
          Home
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          eventKey="/guest-book"
          as={Link}
          to="/guest-book"
          className="navbar-text"
        >
          Guest Book
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link
          eventKey="/pictures"
          as={Link}
          to="/pictures"
          className="navbar-text"
        >
          Gallery
        </Nav.Link>
      </Nav.Item>
      {user ? (
        <Nav.Item>
          <Nav.Link
            eventKey="link-4"
            as={Link}
            to="/"
            className="navbar-text"
          >
            <LogoutButton />
          </Nav.Link>
        </Nav.Item>
      ) : (
        <>
          <Nav.Item>
            <Nav.Link
              eventKey="/register"
              as={Link}
              to="/register"
              className="navbar-text"
            >
              Register
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="/login"
              as={Link}
              to="/login"
              className="navbar-text"
            >
              Login
            </Nav.Link>
          </Nav.Item>
        </>
      )}
    </Nav>
  );
}

export default NavBar;
