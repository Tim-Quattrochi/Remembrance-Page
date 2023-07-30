import { Button } from "react-bootstrap";
import { useProvideAuth } from "../hooks/useAuthProvider";

function LogoutButton() {
  const { signout } = useProvideAuth();

  return (
    <Button variant="info" onClick={signout}>
      Logout
    </Button>
  );
}

export default LogoutButton;
