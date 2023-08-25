import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BsQuestionLg } from "react-icons/bs";
import "./notFound.css";
import { PrimaryBtn } from "../../components";

const NotFound404 = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  useEffect(() => {
    console.log(`No routes found for ${location.pathname}`);
  }, [location.pathname]);

  return (
    <div className="not-found-container">
      <h1>
        Sorry, the page you are looking for is not found.{" "}
        <BsQuestionLg fill="#C8F3DF" />
      </h1>
      <PrimaryBtn
        onClick={handleClick}
        text="Go Back"
        style="reg-btn"
      />
    </div>
  );
};

export default NotFound404;
