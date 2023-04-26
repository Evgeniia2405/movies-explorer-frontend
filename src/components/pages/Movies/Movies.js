import React, { useEffect, useState } from "react";
import Footer from "../../Footer/Footer";
import MoviesCardList from "../../MoviesCardList/MoviesCardList";
import SearchForm from "../../SearchForm/SearchForm";
import moviesApi from "../../../utils/MoviesApi";
import api from "../../../utils/MainApi";
import "./Movies.css";
import Preloader from "../../Preloader/Preloader";

function Movies({ countCards }) {
  const allMoviesLS = JSON.parse(localStorage.getItem("allMovies"));
  const moviesFoundLS = JSON.parse(localStorage.getItem("moviesFound"));
  const textSearchLS = localStorage.getItem("textSearch");
  const isShortsLS = localStorage.getItem("isShorts");
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(textSearchLS);
  const [filteredMovies, setFilteredMovies] = useState(moviesFoundLS);
  const [currentMovies, setCurrentMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isShorts, setIsShorts] = useState(false);
  const [onSuccess, setOnSuccess] = useState(false);
  const [searchMessage, setSearchMessage] = useState(" ");
  const [onMore, setOnMore] = useState(false);
  const [checked, setChecked] = useState(false);

  function getMovies() {
    setIsLoading(true);
    moviesApi
      .getInitialData()
      .then((data) => {
        localStorage.setItem("allMovies", JSON.stringify(data));
      })
      .catch((err) => {
        setSearchMessage(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function getMoviesSaved() {
    setIsLoading(true);
    api
      .getSavedMovies()
      .then((data) => {
        localStorage.setItem("moviesSaved", JSON.stringify(data));
        localStorage.setItem("moviesSavedPM", JSON.stringify(data));
        setSavedMovies(data);
      })
      .catch((err) => {
        setSearchMessage(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  //если ранее уже был сделан поиск, то отрисовать найденные фильмы и не обращаться к серверу за исходными фильмамы, в ином случае делаем запрос к серверу за исходными фильмами
  useEffect(() => {
    if (allMoviesLS) {
      if (moviesFoundLS) {
        setCurrentMovies(moviesFoundLS.slice(0, countCards.countRender));
        if (isShortsLS) {
          setChecked(true);
          setIsShorts(true);
        } else {
          setChecked(false);
          setIsShorts(false);
        }
      }
    } else {
      getMovies();
    }
  }, []);

  //запрос к серверу за сохраненными фильмами если ранее это не делали
  useEffect(() => {
    if (
      !localStorage.getItem("moviesSaved") &&
      !localStorage.getItem("moviesSavedPM")
    ) {
      getMoviesSaved();
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("moviesSaved")) {
      setSavedMovies(JSON.parse(localStorage.getItem("moviesSaved")));
    }
  }, []);

  // если на странице /saved-movies были удалены фильмы то запрашиваем обновленные данные с сервера, в ином случае к серверу не обращаемся.
  useEffect(() => {
    if (
      localStorage.getItem("moviesSaved") &&
      localStorage.getItem("moviesSavedPM") &&
      JSON.parse(localStorage.getItem("moviesSaved")).length !==
        JSON.parse(localStorage.getItem("moviesSavedPM")).length
    ) {
      getMoviesSaved();
    }
  }, []);

  //проверка для визуализации кнопки "еще" при измении списка текущих фильмов
  useEffect(() => {
    if (currentMovies.length !== 0) {
      checkMore(currentMovies);
    }
  }, [currentMovies]);

  function handleChange(e) {
    setValue(e.target.value);
    setSearchMessage(" ");
  }

  //если найденных фильмов больше чем отрисовано на странице, то показываем кнопку "еще"
  //проверка для полнометражных и короткометражных фильмов
  function checkMore(movies) {
    if (checked) {
      if (movies.length < moviesFoundLS.length) {
        setOnMore(true);
      } else {
        setOnMore(false);
      }
    } else {
      if (
        movies.length <
        moviesFoundLS.filter((movie) => movie.duration <= 40).length
      ) {
        setOnMore(true);
      } else {
        setOnMore(false);
      }
    }
  }

  //проверка на наличие короткометражных фильмов
  function checkIsShortsMovies(movies) {
    if (movies.some((movie) => movie.duration <= 40)) {
      localStorage.setItem("isShorts", true);
      setChecked(true);
      setIsShorts(true);
    } else {
      localStorage.removeItem("isShorts");
      setChecked(false);
      setIsShorts(false);
    }
  }

  function handleToggle() {
    if (checked) {
      const shotsMoviesLS = moviesFoundLS.filter(
        (movie) => movie.duration <= 40
      );
      renderMovies(shotsMoviesLS);
      setChecked(false);
    } else {
      renderMovies(moviesFoundLS);
      setChecked(true);
    }
  }

  function renderMovies(movies) {
    setFilteredMovies(movies);
    setCurrentMovies(movies.slice(0, countCards.countRender));
  }

  function filterMovies(wordKey) {
    const filteredMovies = allMoviesLS.filter((movie) => {
      return (
        movie.nameRU.toLowerCase().includes(wordKey.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(wordKey.toLowerCase())
      );
    });
    if (filteredMovies.length > 0) {
      localStorage.setItem("textSearch", wordKey);
      localStorage.setItem("moviesFound", JSON.stringify(filteredMovies));
      renderMovies(filteredMovies);
      setOnSuccess(true);
      checkIsShortsMovies(filteredMovies);
    } else {
      setOnSuccess(false);
      setSearchMessage("Фильмы не найдены");
      setCurrentMovies([]);
    }
  }

  function handleMore() {
    const nextMovies = filteredMovies.slice(
      currentMovies.length,
      currentMovies.length + countCards.moreFilms
    );
    setCurrentMovies([...currentMovies, ...nextMovies]);
  }

  function handleSubmit(e) {
    e.preventDefault(e);
    setChecked(false);
    if (value && value !== " ") {
      filterMovies(value);
    } else {
      setSearchMessage("Нужно ввести ключевое слово");
    }
  }

  function handleMovieSaveOrDelete(movie) {
    // проверяем, добавлен ли фильм в избранные
    const isSaved = savedMovies.some((i) => i.movieId === movie.id);
    if (!isSaved) {
      api
        .saveMovie(
          movie.country,
          movie.director,
          movie.duration,
          movie.year,
          movie.description,
          `https://api.nomoreparties.co/${movie.image.url}`,
          movie.trailerLink,
          `https://api.nomoreparties.co/${movie.image.formats.thumbnail.url}`,
          movie.id,
          movie.nameRU,
          movie.nameEN
        )
        .then((newCard) => {
          getMoviesSaved();
          setCurrentMovies((state) =>
            state.map((c) => (c.movieId === movie.id ? newCard : c))
          );
          setSavedMovies((state) =>
            state.map((c) => (c.movieId === movie.id ? newCard : c))
          );
        })
        .catch((err) => {
          setSearchMessage(`Ошибка при добавлении фильма в избранные: ${err}`);
        });
    } else {
      // определяем фильм, который хотим удалить из избранных
      const fodDeleteMovie = savedMovies.find((c) => c.movieId === movie.id);
      api
        .deleteMovie(fodDeleteMovie._id)
        .then((newCard) => {
          getMoviesSaved();
          setCurrentMovies((state) =>
            state.map((c) => (c.movieId === movie.id ? newCard : c))
          );
          setSavedMovies((state) =>
            state.map((c) => (c.movieId === movie.id ? newCard : c))
          );
        })
        .catch((err) => {
          setSearchMessage(`Ошибка при удалении фильма из избранных: ${err}`);
        });
    }
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
          onMore={onMore}
          movies={currentMovies}
          onClickMore={handleMore}
          onCardClick={handleMovieSaveOrDelete}
        />
      </main>
      <Footer />
      <Preloader isLoading={isLoading} />
    </>
  );
}

export default Movies;
