import React from "react";
import gbBtn from "../../assets/gbBtn.svg";
import hoverGbBtn from "../../assets/hoverGbBtn.svg";

const LandingHeader = ({ setIsHovered, isHovered, Button }) => {
  return (
    <div className="responsive-mobile">
      <div className="landing-text">Jerry's remembrance page.</div>
      <a href="#posts-container">
        <Button
          variant="none"
          type="submit"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={isHovered ? hoverGbBtn : gbBtn}
            alt="hover state"
          />
        </Button>
      </a>
    </div>
  );
};

export default LandingHeader;
