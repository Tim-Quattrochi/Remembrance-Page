import React from "react";
import { PrimaryBtn } from "../../components";
import { TfiPencil } from "react-icons/tfi";

const LandingHeader = ({}) => {
  return (
    <div className="responsive-mobile">
      <div className="landing-text">Jerry's remembrance page.</div>
      <a href="#gallery">
        <PrimaryBtn
          variant="none"
          type="submit"
          icon={<TfiPencil />}
          style="sign-in-btn"
          text="GO TO GUEST BOOK"
        />
      </a>
    </div>
  );
};

export default LandingHeader;
