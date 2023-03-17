import React from "react";
import { Link } from "react-router-dom";
import Preloader from "../../Preloader/Preloader";
import "./NotFound.css";

function NotFound() {

  return (
    <>
      <div className="content">
        <h2 className="content__title">404</h2>
        <p className="content__text">Страница не найдена</p>
        </div>
        <Link to="/" className="content__link">
        Назад
        </Link>
    </>
  );
}

export default NotFound;