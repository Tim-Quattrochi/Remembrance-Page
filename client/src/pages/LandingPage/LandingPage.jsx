import { Button } from "react-bootstrap";
import LandingHeader from "./LandingHeader";
import "./landingPage.css";
import CreatePost from "../../components/CreatePost";
import { ImageWall } from "../../components";
import LandingContent from "./LandingContent";

const LandingPage = () => {
  return (
    <div className="landing-container">
      <LandingHeader Button={Button} />
      <div className="my-card">
        <LandingContent />
      </div>
      <CreatePost />
      <ImageWall />
    </div>
  );
};

export default LandingPage;
