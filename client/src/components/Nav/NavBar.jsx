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

  const {
    state: { user },
  } = useProvideAuth();

  const homePage = location.pathname === "/";
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="#C8F3DF"
      data-bs-theme="light"
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to={"/"}
          href="#home"
          aria-label="home page logo link"
        >
          <Logo />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto" activeKey={location.pathname}>
            {homePage && (
              <>
                <Nav.Link href="#guest-book" eventKey="/guest-book">
                  Guest-Book
                </Nav.Link>
                <Nav.Link href={"#gallery"} eventKey="/pictures">
                  Gallery
                </Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
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
