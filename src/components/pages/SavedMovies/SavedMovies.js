import React, { useState, useEffect } from "react";
import Footer from "../../Footer/Footer";
import MoviesCardList from "../../MoviesCardList/MoviesCardList";
import SearchForm from "../../SearchForm/SearchForm";
import "./SavedMovies.css";
import api from "../../../utils/MainApi";
import Preloader from "../../Preloader/Preloader";

function SavedMovies() {
  const moviesSavedLS = JSON.parse(localStorage.getItem("moviesSaved"));
  const moviesFoundSavedLS = JSON.parse(
    localStorage.getItem("moviesFoundSaved")
  );
  const textSearchSavedLS = localStorage.getItem("textSearchSaved");

  const [value, setValue] = useState(textSearchSavedLS);
  const [isLoading, setIsLoading] = useState(false);
  const [currentMovies, setCurrentMovies] = useState([]);
  const [isShorts, setIsShorts] = useState(false);

  const [onSuccess, setOnSuccess] = useState(false);
  const [searchMessage, setSearchMessage] = useState(" ");

  const [checked, setChecked] = useState(false);

  function getMoviesSaved() {
    setIsLoading(true);
    api
      .getSavedMovies()
      .then((data) => {
        if (data.length === 0) {
          localStorage.removeItem("textSearchSaved");
          localStorage.removeItem("moviesSaved");
          setIsShorts(false);
          setChecked(false);
          setValue("");
        } else {
          localStorage.setItem("moviesSaved", JSON.stringify(data));
          localStorage.setItem("moviesSavedPageSM", JSON.stringify(data));
          checkIsShortsMovies(data);
        }
      })
      .catch((err) => {
        setSearchMessage(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    if (
      !localStorage.getItem("moviesSaved") ||
      !localStorage.getItem("moviesSavedPageSM")
    ) {
      getMoviesSaved();
    }
  }, []);

  // если на странице /movies были добавлены/удалены фильмы то запрашиваем обновленные данные с сервера, в ином случае к серверу не обращаемся.
  useEffect(() => {
    if (
      localStorage.getItem("moviesSaved") &&
      localStorage.getItem("moviesSavedPageSM") &&
      JSON.parse(localStorage.getItem("moviesSaved")).length !==
        JSON.parse(localStorage.getItem("moviesSavedPageSM")).length
    ) {
      getMoviesSaved();
    }
  }, []);

  useEffect(() => {
    if (
      localStorage.getItem("moviesSaved") &&
      JSON.parse(localStorage.getItem("moviesSaved")).length !== 0 &&
      textSearchSavedLS
    ) {
      filterMovies(textSearchSavedLS);
    }
  }, []);

  function handleChange(e) {
    setValue(e.target.value);
    setSearchMessage(" ");
  }

  function checkIsShortsMovies(movies) {
    if (movies.some((movie) => movie.duration <= 40)) {
      setIsShorts(true);
      setChecked(true);
    } else {
      setIsShorts(false);
      setChecked(false);
    }
  }

  function handleToggle() {
    if (checked) {
      const shotsMovies = moviesFoundSavedLS.filter(
        (movie) => movie.duration <= 40
      );
      renderMovies(shotsMovies);
      setChecked(false);
    } else {
      renderMovies(moviesFoundSavedLS);
      setChecked(true);
    }
  }

  function renderMovies(movies) {
    setCurrentMovies(movies);
  }

  function filterMovies(wordKey) {
    const filteredMovies = JSON.parse(
      localStorage.getItem("moviesSaved")
    ).filter((movie) => {
      return (
        movie.nameRU.toLowerCase().includes(wordKey.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(wordKey.toLowerCase())
      );
    });
    if (filteredMovies.length > 0) {
      localStorage.setItem("textSearchSaved", wordKey);
      localStorage.setItem("moviesFoundSaved", JSON.stringify(filteredMovies));
      renderMovies(filteredMovies);
      setOnSuccess(true);
      checkIsShortsMovies(filteredMovies);
    } else {
      setOnSuccess(false);
      setSearchMessage("Фильмы не найдены");
      setCurrentMovies([]);
      setIsShorts(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault(e);
    setChecked(false);
    if (moviesSavedLS && moviesSavedLS.length > 0) {
      if (value && value !== " ") {
        filterMovies(value);
      } else {
        setSearchMessage("Нужно ввести ключевое слово");
      }
    } else {
      if (value && value !== " ") {
        setSearchMessage("У вас пока нет сохраненных фильмов");
      } else {
        setSearchMessage("У вас пока нет сохраненных фильмов");
      }
    }
  }

  function handleMovieDelete(data) {
    api
      .deleteMovie(data._id)
      .then(() => {
        getMoviesSaved();
        setCurrentMovies((state) => state.filter((c) => c._id !== data._id));
      })
      .catch((err) => {
        setSearchMessage(`Ошибка при удалении фильма из избранных: ${err}`);
      });
  }

  return (
    <>
      <main className="movies">
        <SearchForm
          value={value}
          onChange={(e) => handleChange(e)}
          onSubmit={handleSubmit}
          onSuccess={onSuccess}
          isShorts={isShorts}
          chengeCheckbox={handleToggle}
          checked={checked}
          searchMessage={searchMessage}
        />
        <MoviesCardList
          onMore={false}
          movies={currentMovies}
          onCardClick={handleMovieDelete}
        />
      </main>
      <Footer />
      <Preloader isLoading={isLoading} />
    </>
  );
}

export default SavedMovies;
