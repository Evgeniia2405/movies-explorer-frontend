import React, { useState, useEffect, useCallback } from "react";
import Footer from "../../Footer/Footer";
import MoviesCardList from "../../MoviesCardList/MoviesCardList";
import SearchForm from "../../SearchForm/SearchForm";
import "./SavedMovies.css";
import api from "../../../utils/MainApi";
import Preloader from "../../Preloader/Preloader";

function SavedMovies() {
  const [value, setValue] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentMovies, setCurrentMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isShorts, setIsShorts] = useState(false);
  const [onSuccess, setOnSuccess] = useState(false);
  const [searchMessage, setSearchMessage] = useState(" ");
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    getMoviesSaved();
  }, []);

  useEffect(() => {
    if (filteredMovies.length === 0) {
      setOnSuccess(false);
    }
  }, [filteredMovies]);

  const renderFilteredMovies = useCallback(() => {
    if (checked) {
      if (savedMovies.length > 0) {
        if (isShorts) {
          setCurrentMovies(
            filteredMovies.filter((movie) => movie.duration <= 40)
          );
        }
      }
    }
    if (!checked) {
      setCurrentMovies(filteredMovies);
    }
  }, [checked, savedMovies, filteredMovies, isShorts]);

  const renderSavedMovies = useCallback(() => {
    if (checked) {
      if (savedMovies.length > 0) {
        if (isShorts) {
          setCurrentMovies(savedMovies.filter((movie) => movie.duration <= 40));
        }
      }
    }
    if (!checked) {
      setCurrentMovies(savedMovies);
    }
  }, [checked, savedMovies, isShorts]);

  //в случае если удаляются фильмы из отфильтрованных, то показывать отфильтрованные фильмы до тех пор пока они есть
  useEffect(() => {
    if (onSuccess && searchMessage === " ") {
      renderFilteredMovies();
    }
  }, [onSuccess, searchMessage, renderFilteredMovies]);

  //в случае если удаляются фильмы из всех короткометражек, то оставаться в короткометражках пока они есть
  // если короткометражки закончились, то переключится на оставшиеся сохраненные фильмы
  useEffect(() => {
    if (!onSuccess && searchMessage === " ") {
      renderSavedMovies();
    }
  }, [onSuccess, searchMessage, renderSavedMovies]);

  function getMoviesSaved() {
    setIsLoading(true);
    api
      .getSavedMovies()
      .then((data) => {
        if (data.length > 0) {
          setSavedMovies(data);
          checkIsShortsMovies(data);
          if (value && value !== " " && filteredMovies.length > 0) {
            filterMovies(data, value);
          }
        } else {
          setCurrentMovies([]);
          setSavedMovies([]);
          setFilteredMovies([]);
          setIsShorts(false);
          setChecked(false);
        }
      })
      .catch((err) => {
        setSearchMessage(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleChange(e) {
    setValue(e.target.value);
    setSearchMessage(" ");
  }

  function checkIsShortsMovies(movies) {
    if (movies.some((movie) => movie.duration <= 40)) {
      setIsShorts(true);
    } else {
      setIsShorts(false);
      setChecked(false);
    }
  }

  function renderMovies(movies) {
    if (isShorts && !checked) {
      const shotsMovies = movies.filter((movie) => movie.duration <= 40);
      setCurrentMovies(shotsMovies);
      setChecked(true);
    }
    if (isShorts && checked) {
      setCurrentMovies(movies);
      setChecked(false);
    }
    if (!isShorts && !checked) {
      setSearchMessage("Короткометражки не найдены");
      setChecked(false);
    }
  }

  function handleToggle() {
    if (filteredMovies.length > 0) {
      renderMovies(filteredMovies);
    } else {
      renderMovies(savedMovies);
    }
  }

  function filterMovies(movies, wordKey) {
    const filteredMovies = movies.filter((movie) => {
      return (
        movie.nameRU.toLowerCase().includes(wordKey.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(wordKey.toLowerCase())
      );
    });
    if (filteredMovies.length > 0) {
      setFilteredMovies(filteredMovies);
      setOnSuccess(true);
      checkIsShortsMovies(filteredMovies);
    } else {
      setOnSuccess(false);
      setSearchMessage("Фильмы не найдены");
      setCurrentMovies([]);
      setFilteredMovies([]);
      setIsShorts(false);
      setChecked(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault(e);
    setChecked(false);
    if (savedMovies.length > 0) {
      if (value && value !== " ") {
        filterMovies(savedMovies, value);
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
    setIsLoading(true);
    api
      .deleteMovie(data._id)
      .then(() => {
        getMoviesSaved();
        setSearchMessage(" ");
      })
      .catch((err) => {
        setSearchMessage(`Ошибка при удалении фильма из избранных: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
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
