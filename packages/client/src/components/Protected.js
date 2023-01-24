import { useProvideAuth } from "../hooks/useAuth";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Protected = () => {
  const { getCurrentUser } = useProvideAuth();
  const navigate = useNavigate();

  const user = getCurrentUser();

  useEffect(() => {
    if (!user) {
      toast.error("You must be logged in to view this page");
      return navigate("/login");
    }
  }, [user]);

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default Protected;
