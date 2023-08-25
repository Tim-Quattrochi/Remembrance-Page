import { useState, useEffect } from "react";
import { scrollTop } from "../../assets";
import { Button } from "react-bootstrap";
import "./scrollToTop.css"

const ScrollToTop = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "fixed",
        bottom: "20px",
      }}
    >
      {showButton && (
        <Button id="scrollTopBtn" variant="none" onClick={handleClick}>
          <img src={scrollTop} alt="scroll to top icon" />
        </Button>
      )}
    </div>
  );
};

export default ScrollToTop;
