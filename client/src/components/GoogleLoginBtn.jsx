import { FaGoogle } from "react-icons/fa";
import { useProvideAuth } from "../hooks/useAuthProvider";

/**
 *
 * @param {string} regOrLog - String to pass to determine if the button renders with the
 * words login or register. "login" will render login, else register.
 * @returns {React.JSX}
 */
function GoogleLoginBtn({ regOrLog }) {
  const { signupWithGoogle } = useProvideAuth();

  return (
    <button
      onClick={(e) => signupWithGoogle(e)}
      style={{
        marginTop: "10px",
        backgroundColor: "#4285f4",
        color: "white",
        padding: "12px 24px",
        borderRadius: "2px",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        boxShadow: "0px 8px 15px rgba(66, 133, 244, 0.3)",
      }}
    >
      <FaGoogle style={{ width: "20px", marginRight: "10px" }} />
      {regOrLog === "login"
        ? "Log in with Google"
        : "Sign up with Google"}
    </button>
  );
}

export default GoogleLoginBtn;
