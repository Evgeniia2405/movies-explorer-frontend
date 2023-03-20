import React from "react";
import { Link } from "react-router-dom";
import "./AccountIcon.css";

function AccountIcon() {
  return <Link to="/profile" className="account__link" >Аккаунт</Link>;
}

export default AccountIcon;
