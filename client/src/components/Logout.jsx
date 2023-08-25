import { Button } from "react-bootstrap";
import { useProvideAuth } from "../hooks/useAuthProvider";

function LogoutButton() {
  const { signout } = useProvideAuth();

  return (
    <Button
      style={{
        backgroundColor: "#f4e3a5",
        color: "black",
        border: "none",
      }}
      onClick={signout}
    >
      Logout
    </Button>
  );
}

export default LogoutButton;
