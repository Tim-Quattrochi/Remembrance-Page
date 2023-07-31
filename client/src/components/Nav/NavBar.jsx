import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useProvideAuth } from "../../hooks/useAuthProvider";
import { Link, useLocation } from "react-router-dom";
import Logo from "../Logo";
import LogoutButton from "../Logout";

import "./navBar.css";

function NavBar() {
  const location = useLocation();

  const { getCurrentUser } = useProvideAuth();

  let user = getCurrentUser();

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="#C8F3DF"
      data-bs-theme="light"
    >
      <Container>
        <Navbar.Brand as={Link} to={"/"} href="#home">
          <Logo />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto" activeKey={location.pathname}>
            <Nav.Link
              as={Link}
              to={"/guest-book"}
              eventKey="/guest-book"
            >
              Guest-Book
            </Nav.Link>
            <Nav.Link as={Link} to={"/pictures"} eventKey="/pictures">
              Gallery
            </Nav.Link>
          </Nav>
          <Nav>
            {!user && (
              <NavDropdown
                title="Register/Login"
                id="collapsible-nav-dropdown"
              >
                <NavDropdown.Item as={Link} to={"/login"}>
                  Login
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={"/register"}>
                  Register
                </NavDropdown.Item>
              </NavDropdown>
            )}
            {user && (
              <Nav.Item>
                <Nav.Link
                  eventKey={location.pathname}
                  as={Link}
                  to="/"
                  className="navbar-text"
                >
                  <LogoutButton />
                </Nav.Link>
              </Nav.Item>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
