import React from "react";
import "./landingPage.css";

const LandingContent = () => {
  return (
    <div className="landing-card-container">
      <div className="card-header">Tribute to Jerry Krikava</div>
      <div className="personalPara">
        I am honored to present this tribute page for my beloved
        brother, Jerry Krikava.
      </div>
      <div className="card-section-header">Jerry's Life</div>
      <div className="card-section-body">
        {" "}
        <p className="firstPara">
          Jerry was born on March 9, 1990 and unfortunately passed
          away in March 2021. He had non-verbal autism and was a huge
          fan of 80's music, particularly Madonna and Journey. Purpose
          of this website: In honor of Jerry's memory, I have created
          this website as a way for friends and family to come
          together and share their memories of Jerry.
        </p>
        <p className="personalPara">
          Visitors can post on Jerry's guestbook and view photos of
          him, keeping Jerry's memory alive. This website is a way for
          us to preserve Jerry's memory and remember the joy and love
          he brought into our lives. I hope that this website will be
          a source of comfort and support for those who knew and loved
          Jerry.
        </p>
      </div>
    </div>
  );
};

export default LandingContent;
