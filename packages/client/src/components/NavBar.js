import Nav from "react-bootstrap/Nav";
import { Link, useLocation } from "react-router-dom";

function NavBar() {
  const location = useLocation();

  return (
    <Nav
      className="justify-content-center"
      variant="tabs"
      activeKey={location.pathname}
    >
      <Nav.Item>
        <Nav.Link eventKey="/" as={Link} to="/">
          Home
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1" as={Link} to="/post">
          Guest-Book
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2">About</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-3" as={Link} to="/register">
          Register
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default NavBar;
