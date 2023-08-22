import {
  FaGithub,
  FaHandHoldingHeart,
  FaLinkedin,
} from "react-icons/fa";
import "./footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="text-center">
        Made with <FaHandHoldingHeart fill="#e65c4f" /> by Tim
        Quattrochi
      </div>

      <div>
        <a
          href="https://github.com/Tim-Quattrochi"
          target="_blank"
          aria-label="Read the author's github profile."
          rel="noopener noreferrer"
          className="ml-auto"
        >
          <FaGithub fill="#181717" size={35} />
        </a>
        <a
          href="https://www.linkedin.com/in/timquattrochi/"
          target="_blank"
          aria-label="Read the author's LinkedIn profile."
          rel="noopener noreferrer"
          className="ml-auto"
        >
          <FaLinkedin fill="#0A66C2" size={35} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
