import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";

function MoviesCard(props) {
  const data = props.card;
  let location = useLocation();

  const minutes = data.duration % 60;
  const hours = (data.duration - minutes) / 60;
  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__title">{data.nameRU}</h2>
        <div className="card__duration">
          {data.duration > 60
            ? `${hours} ч ${minutes} минут`
            : `${minutes} минут`}
        </div>
      </div>
      <img src={data.image} className="card__img" alt={data.nameRU} />
      <button
        type="button"
        className={
          location.pathname === "/movies"
            ? `card__btn ${
                data.owner ? "card__btn_type_select" : "card__btn_type_save"
              }`
            : `card__btn card__btn_type_delete`
        }
        aria-label="Delete"
      >
        {`${data.owner || location.pathname === "/saved-movies" ? " " : "Сохранить"}`}
      </button>
    </li>
  );
}

export default MoviesCard;
