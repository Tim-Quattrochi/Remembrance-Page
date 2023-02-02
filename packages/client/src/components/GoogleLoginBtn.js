import { FaGoogle } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useProvideAuth } from "../hooks/useAuth";

function GoogleLoginBtn() {
  const { signup } = useProvideAuth();
  const location = useLocation();

  return (
    <button
      onClick={(e) => {
        signup(e);
      }}
      style={{
        marginTop: "10px",
        backgroundColor: "#4285f4",
        color: "white",
        padding: "12px 24px",
        borderRadius: "50px",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        boxShadow: "0px 8px 15px rgba(66, 133, 244, 0.3)",
      }}
    >
      <FaGoogle style={{ width: "20px", marginRight: "10px" }} />
      {location.pathname === "/login"
        ? "Log in with Google"
        : "Sign up with Google"}
    </button>
  );
}

export default GoogleLoginBtn;
