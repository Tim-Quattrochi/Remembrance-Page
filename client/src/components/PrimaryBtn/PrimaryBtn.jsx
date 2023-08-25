import React from "react";
import PropTypes from "prop-types";
import "./primaryBtn.css";

/**
 *
 * @param {function } onClick - The onClick event handler.
 * @param {string} style - the className you want to use for styling.
 * @param {string} text - The text you want the button to display.
 * @param {React.ReactNode} icon -  The icon component to display.
 * @returns {JSX.Element}  A button element.
 */
const PrimaryBtn = ({ onClick, style, text, icon }) => {
  return (
    <div className="btn-container">
      <button className={style} onClick={onClick}>
        <span className="btn-icon">{icon}</span> {text}
      </button>
    </div>
  );
};

PrimaryBtn.propTypes = {
  text: PropTypes.string.isRequired,
};

export default PrimaryBtn;
