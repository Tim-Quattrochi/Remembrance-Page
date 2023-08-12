import React, { useState } from "react";
import { gbBtn, hoverGbBtn } from "../../assets";

const LandingHeader = ({ Button }) => {
  const [isHovered, setIsHovered] = useState(false);
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
