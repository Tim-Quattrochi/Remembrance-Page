import axios from "axios";
import { useState, useEffect } from "react";
import { FaGoogle } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { API_URL } from "../utils.js/constants";

function GoogleLoginBtn() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const googleCallbackUser = async () => {
      const res = await axios.get("/user");
      setUser(res.data);
      setAuthenticated(true);
      console.log(res);
    };
    googleCallbackUser();
  }, []);

  const handleGoogleLogin = () => {
    window.open(`http://localhost:3001/google`, "_self");
  };

  return (
    <button
      onClick={handleGoogleLogin}
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
