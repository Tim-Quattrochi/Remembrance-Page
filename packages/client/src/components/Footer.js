import { useEffect, useState } from "react";
import bottonRect from "../assets/bottomRect.svg";
import scrollTop from "../assets/scrollTop.svg";

const Footer = () => {
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
      }}
    >
      <img
        src={scrollTop}
        alt=""
        style={{ marginBottom: "10px" }}
        onClick={handleClick}
      />
      <div className="bottom-rect text-center">
        Made by Tim Quattrochi
      </div>
    </div>
  );
};

export default Footer;
