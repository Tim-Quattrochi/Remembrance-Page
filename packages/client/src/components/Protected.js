import { useProvideAuth } from "../hooks/useAuth";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Protected = () => {
  const {
    state: { user },
  } = useProvideAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      toast.error("You must be logged in to view this page");
      return navigate("/login");
    }
  });

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default Protected;
