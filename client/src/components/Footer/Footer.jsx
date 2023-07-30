import {
  FaGithub,
  FaHandHoldingHeart,
  FaLinkedin,
} from "react-icons/fa";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer--pin d-flex justify-content-between">
      <div className="text-center">
        Made with <FaHandHoldingHeart fill="#e65c4f" /> by Tim
        Quattrochi
      </div>

      <div>
        <a
          href="https://github.com/Tim-Quattrochi"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto"
        >
          <FaGithub fill="#fdd037" size={35} />
        </a>
        <a
          href="https://www.linkedin.com/in/timquattrochi/"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto"
        >
          <FaLinkedin fill="#fdd037" size={35} />
        </a>
      </div>
    </div>
  );
};

export default Footer;
