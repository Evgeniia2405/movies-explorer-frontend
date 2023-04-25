import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";

function MoviesCard(props) {
  const data = props.card;
  let location = useLocation();

  const minutes = data.duration % 60;
  const hours = (data.duration - minutes) / 60;

  function handleButtonClick() {
    props.onCardClick(props.card);
  }

  return (
    <li className="card" key={props.id}>
      <div className="card__header">
        <h2 className="card__title">{data.nameRU}</h2>
        <div className="card__duration">
          {data.duration > 60 ? `${hours} ч ${minutes} мин` : `${minutes} мин`}
        </div>
      </div>
      <a
        className="card__link"
        href={data.trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img
          src={
            location.pathname === "/movies"
              ? `https://api.nomoreparties.co/${data.image.url}`
              : data.image
          }
          className="card__img"
          alt={data.nameRU}
        />
      </a>
      <button
        onClick={handleButtonClick}
        type="button"
        className={
          location.pathname === "/movies"
            ? `card__btn ${
                props.isSaved ? "card__btn_type_select" : "card__btn_type_save"
              }`
            : `card__btn card__btn_type_delete`
        }
        aria-label={props.isSaved}
      >
        {`${
          props.isSaved || location.pathname === "/saved-movies"
            ? " "
            : "Сохранить"
        }`}
      </button>
    </li>
  );
}

export default MoviesCard;
