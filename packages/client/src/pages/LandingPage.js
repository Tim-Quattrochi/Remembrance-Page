import { useState } from "react";
import { Card } from "react-bootstrap";

import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import gbBtn from "../assets/gbBtn.svg";
import hoverGbBtn from "../assets/hoverGbBtn.svg";
import personalPara from "../assets/personalPara.svg";

const LandingPage = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="landing-container">
      <div className="landing-text-container">
        <div className="landing-text">Jerry's remembrance page.</div>
        <p className="landing-desc">
          Remember and honor Jerry's memory on this special landing
          page. Share your thoughts and memories in the guest book.
          Keep his legacy alive. We miss him.
        </p>
      </div>
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

      <Card bg="none" border="0" style={{ background: "#FAFAFA" }}>
        <Card.Body>
          <Card.Title
            style={{
              fontFamily: "Montserrat",
              fontWeight: "bold",
              fontSize: "38px",
              color: "gray",
              textAlign: "center",
            }}
          >
            Title
          </Card.Title>
          <Card.Text
            style={{
              fontFamily: "Montserrat",
              fontWeight: "regular",
              fontSize: "20px",
              textAlign: "center",
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Quis blandit turpis cursus in hac habitasse platea
            dictumst quisque. Fringilla urna porttitor rhoncus dolor.
            Sed velit dignissim sodales ut eu. Vitae congue mauris
            rhoncus aenean vel elit scelerisque mauris pellentesque.
            At volutpat diam ut venenatis tellus in metus vulputate
            eu. Vestibulum lorem sed risus ultricies tristique.
            Faucibus et molestie ac feugiat sed lectus vestibulum
            mattis. Rhoncus mattis rhoncus urna neque viverra. Dui
            vivamus arcu felis bibendum. Tempor id eu nisl nunc mi.
            Velit egestas dui id ornare.
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LandingPage;
