import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import "./Sign.css";

function Sign(props) {
  return (
    <>
      <div className="sign__header">
        <Logo />
      </div>
      {props.children}
      <div className="sign__text">
        <p>{props.text}</p>
        <Link to={props.path} className="sign__link">
        {props.link}
        </Link>
      </div>
    </>
  );
}

export default Sign;
