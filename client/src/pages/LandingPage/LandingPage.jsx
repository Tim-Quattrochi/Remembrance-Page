import { Button } from "react-bootstrap";
import LandingHeader from "./LandingHeader";
import "./landingPage.css";
import CreatePost from "../../components/Posts/CreatePost/CreatePost";
import { ImageWall } from "../../components";
import LandingContent from "./LandingContent";
import { useProvideAuth } from "../../hooks/useAuthProvider";
import { useEffect } from "react";

const LandingPage = () => {
  const { getUser } = useProvideAuth();

  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="landing-container">
      <LandingHeader Button={Button} />
      <div className="my-card">
        <LandingContent />
      </div>
      <div id="guest-book">
        <CreatePost />
      </div>
      <div id="gallery">
        <ImageWall />
      </div>
    </div>
  );
};

export default LandingPage;
