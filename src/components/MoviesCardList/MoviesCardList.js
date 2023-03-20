import React from "react";
import "./MoviesCardList.css";
import { initialCards } from "../../utils/initialCards";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
  return (
    <div className="cards__wrapper">
      <ul className="cards__list">
        {initialCards.map((data) => (
          <MoviesCard
            key={ data.movieId }
            card={ data }
            // onCardClick={props.onCardClick}
            // onCardLike={props.handleCardLike}
            // onCardDelete={props.handleCardDelete}
          />
        ))}
      </ul>
      <button type="button" className="cards__btn">Ещё</button>
    </div>
  );
}

export default MoviesCardList;
