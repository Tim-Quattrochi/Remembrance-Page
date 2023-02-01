import React, { useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    localStorage.clear("Remembrance-User");
    try {
      await axios.post("http://localhost:3001/logout");

      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button variant="info" disabled={loading} onClick={handleLogout}>
      Logout
    </Button>
  );
}

export default LogoutButton;
