import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "../fonts/ITCKRIST.TTF";
import { useProvideAuth } from "../hooks/useAuth";
import { Link, useLocation } from "react-router-dom";
import logoAlt from "../assets/logoAlt.svg";

function NavBar() {
  const location = useLocation();

  const {
    state: { user },
    signout,
  } = useProvideAuth();

  return (
    <Nav
      className="navbar justify-content-center border-bottom-0"
      variant="tabs"
      activeKey={location.pathname}
    >
      <Container>
        <Navbar.Brand
          href="#home"
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
        </Navbar.Brand>
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
            onClick={(e) => signout(e)}
            className="navbar-text"
          >
            Logout
          </Nav.Link>
        </Nav.Item>
      ) : (
        <Nav.Item>
          <Nav.Link
            eventKey="link-3"
            as={Link}
            to="/register"
            className="navbar-text"
          >
            Register
          </Nav.Link>
        </Nav.Item>
      )}
    </Nav>
  );
}

export default NavBar;
