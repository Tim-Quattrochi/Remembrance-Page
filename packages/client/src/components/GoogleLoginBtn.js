import axios from "axios";
import { useState, useEffect } from "react";
import { API_URL } from "../utils.js/constants";

function GoogleLoginBtn() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const handleGoogleLogin = () => {
    window.open(`http://localhost:3001/google`, "_self");
  };

  useEffect(() => {
    //...
    axios
      .get("http://localhost:3000/google/callback", {})
      .then((response) => {
        console.log(response);
        const { access_token, user } = response.data;
        // Use the access token to authenticate the user and set their session
        // Use the user information to show the user profile
        console.log(user);
        console.log(access_token);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <button onClick={handleGoogleLogin}>Login with Google</button>
    </div>
  );
}

export default GoogleLoginBtn;
