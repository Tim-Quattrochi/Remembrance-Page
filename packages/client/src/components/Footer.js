import {
  FaGithub,
  FaHandHoldingHeart,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer--pin">
      <div className="d-flex  align-items-center">
        <div className="text-center">
          Made with <FaHandHoldingHeart fill="#e65c4f" /> by Tim
          Quattrochi
        </div>

        <a
          href="https://github.com/Tim-Quattrochi"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub fill="#fdd037" size={35} />
        </a>
        <a
          href="https://github.com/Tim-Quattrochi"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin fill="#fdd037" size={35} />
        </a>
      </div>
    </div>
  );
};

export default Footer;
