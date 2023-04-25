import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ movies, onMore, onClickMore, onCardClick }) {
  const moviesSavedLS = JSON.parse(localStorage.getItem("moviesSaved"));

  return (
    <div className="cards__wrapper">
      <ul className="cards__list">
        {movies.map((data) => (
          <MoviesCard
            key={data.id || data._id}
            card={data}
            onCardClick={onCardClick}
            isSaved={
              moviesSavedLS
                ? moviesSavedLS.some((i) => i.movieId === data.id)
                : false
            }
          />
        ))}
      </ul>
      <button
        onClick={onClickMore}
        type="button"
        className={onMore ? "cards__btn" : "cards__btn_disactive"}
      >
        Ещё
      </button>
    </div>
  );
}

export default MoviesCardList;
