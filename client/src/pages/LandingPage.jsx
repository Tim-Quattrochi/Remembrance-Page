import { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import gbBtn from "../assets/gbBtn.svg";
import hoverGbBtn from "../assets/hoverGbBtn.svg";
import LandingCard from "../components/LadingCard";

const LandingPage = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="landing-container">
      <div
        className="responsive-mobile"
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "flex-end",
          alignContent: "flex-start",
          marginTop: "30px",
        }}
      >
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
              alt="SVG Button"
            />
          </Button>
        </Link>
      </div>

      <LandingCard>
        <div className="card-header">Tribute to Jerry Krikava</div>
        <div className="card-body">
          I am honored to present my tribute page for my beloved
          brother, Jerry Krikava.
        </div>
        <div className="card-section-header">Jerry's Life</div>
        <div className="card-section-body">
          {" "}
          Jerry was born on March 9th, 1990 and unfortunately passed
          away in March 2021. He had non-verbal autism and was a huge
          fan of 80's music, particularly Madonna and Journey. Purpose
          of this website In honor of Jerry's memory, I have created
          this website as a way for friends and family to come
          together and share their memories of Jerry. Visitors can
          post on Jerry's guest book and view photos of him. Keeping
          Jerry's Memory Alive This website is a way for us to keep
          Jerry's memory alive and to remember the joy and love he
          brought into our lives. I hope that this website will be a
          source of comfort and support for those who knew and loved
          Jerry.
        </div>
      </LandingCard>
    </div>
  );
};

export default LandingPage;
