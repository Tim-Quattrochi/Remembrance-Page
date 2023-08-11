import React from "react";
import gbBtn from "../../assets/gbBtn.svg";
import hoverGbBtn from "../../assets/hoverGbBtn.svg";

const LandingHeader = ({ setIsHovered, isHovered, Button, Link }) => {
  return (
    <div className="responsive-mobile">
      <div className="landing-text">Jerry's remembrance page.</div>
      <Link to="/guest-book">
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
      </Link>
    </div>
  );
};

export default LandingHeader;
