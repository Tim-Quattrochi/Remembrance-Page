import { useState } from "react";
import h1 from "../assets/landingText.svg";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import gbBtn from "../assets/gbBtn.svg";
import hoverGbBtn from "../assets/hoverGbBtn.svg";
import personalPara from "../assets/personalPara.svg";

const LandingPage = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <>
      <div className="landing-text"></div>
      <p className="landing-desc">
        Remember and honor Jerry's memory on this special landing
        page. Share your thoughts and memories in the guest book. Keep
        his legacy alive. We miss him.
      </p>

      <Link to="/post">
        <Button
          variant="none"
          type="submit"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={isHovered ? hoverGbBtn : gbBtn}
            alt="SVG Button"
          />
        </Button>
      </Link>

      <img src={personalPara} alt="" />
    </>
  );
};

export default LandingPage;
