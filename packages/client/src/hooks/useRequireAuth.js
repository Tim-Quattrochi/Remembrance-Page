import { useEffect } from "react";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";

export function useRequireAuth(redirectUrl = "/login") {
  const auth = useAuth();
  let navigate = useNavigate();

  console.log(auth);
  useEffect(() => {
    if (auth.state.isAuthenticated === false) {
      navigate(redirectUrl);
    }
  }, [auth, navigate, redirectUrl]);

  return auth;
}
