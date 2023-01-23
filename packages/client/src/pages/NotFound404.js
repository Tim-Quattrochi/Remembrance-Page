import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BsQuestionLg } from "react-icons/bs";

const NotFound404 = () => {
  const location = useLocation();

  useEffect(() => {
    console.log(`No routes found for ${location.pathname}`);
  }, [location.pathname]);

  return (
    <div style={{ height: "100vh", marginTop: "50px" }}>
      <h1>
        Sorry, the page you are looking for is not found.{" "}
        <BsQuestionLg fill="#C8F3DF" />
      </h1>
    </div>
  );
};

export default NotFound404;
