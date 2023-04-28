import React, { useState, useEffect } from "react";
import Footer from "../../Footer/Footer";
import MoviesCardList from "../../MoviesCardList/MoviesCardList";
import SearchForm from "../../SearchForm/SearchForm";
import "./SavedMovies.css";
import api from "../../../utils/MainApi";
import Preloader from "../../Preloader/Preloader";

function SavedMovies() {
  const [value, setValue] = useState("");
  const [initialMovies, isInitialMovies] = useState(false);
  const [initialFilteredMovies, isInitialFilteredMovies] = useState(false);
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
    isInitialMovies(true);
  }, []);

  //если в первоначальных сохраненных фильмах есть короткометражки то setChecked(true);
  useEffect(() => {
    if (isShorts && initialMovies) {
      setChecked(true);
    }
  }, [initialMovies, isShorts]);

  //если в первоначальных отфильтрованных фильмах есть короткометражки то setChecked(true);
  useEffect(() => {
    if (isShorts && initialFilteredMovies) {
      setChecked(true);
    }
  }, [initialFilteredMovies, isShorts]);

  //в случае если удаляются фильмы из отфильтрованных, то показывать отфильтрованные фильмы до тех пор пока они есть
  useEffect(() => {
    if (onSuccess) {
      if (!checked) {
        if (savedMovies.length > 0) {
          if (isShorts) {
            setCurrentMovies(
              filteredMovies.filter((movie) => movie.duration <= 40)
            );
          } else {
            setCurrentMovies(filteredMovies);
            //если удалены все короткометражки, то переключаемся на оставшиеся отфильтрованные фильмы
          }
        } else {
          setCurrentMovies([]);
          setSearchMessage("Фильмы не найдены");
        }
      }
      if (checked) {
        setCurrentMovies(filteredMovies);
      }
    } else {
      setCurrentMovies([]);
    }
  }, [filteredMovies, isShorts, checked, onSuccess, savedMovies.length]);

  //в случае если удаляются фильмы из всех короткометражек, то оставаться в короткометражках пока они есть
  // если короткометражки закончились, то переключится на оставшиеся сохраненные фильмы
  useEffect(() => {
    if (!onSuccess && searchMessage === " ") {
      if (!checked) {
        if (savedMovies.length > 0) {
          if (isShorts) {
            setCurrentMovies(
              savedMovies.filter((movie) => movie.duration <= 40)
            );
          } else {
            setCurrentMovies(savedMovies);
          }
        } else {
          setCurrentMovies([]);
        }
      }
      if (checked) {
        setCurrentMovies(savedMovies);
      }
    }
  }, [savedMovies, isShorts, checked, onSuccess, searchMessage]);

  function getMoviesSaved() {
    setIsLoading(true);
    api
      .getSavedMovies()
      .then((data) => {
        if (data.length > 0) {
          setSavedMovies(data);
          checkIsShortsMovies(data);
          if (value && value !== " " && filteredMovies.length > 0) {
            isInitialFilteredMovies(false);
            filterMovies(data, value);
          }
        } else {
          setCurrentMovies([]);
          setSavedMovies([]);
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

  function handleToggle() {
    if (filteredMovies.length > 0) {
      if (checked) {
        const shotsMovies = filteredMovies.filter(
          (movie) => movie.duration <= 40
        );
        setCurrentMovies(shotsMovies);
        setChecked(false);
      } else {
        setCurrentMovies(filteredMovies);
        setChecked(true);
      }
    } else {
      if (checked) {
        const shotsMovies = savedMovies.filter((movie) => movie.duration <= 40);
        setCurrentMovies(shotsMovies);
        setChecked(false);
      } else {
        setCurrentMovies(savedMovies);
        setChecked(true);
      }
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
      setIsShorts(false);
      setChecked(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault(e);
    setChecked(false);
    if (savedMovies.length > 0) {
      if (value && value !== " ") {
        isInitialFilteredMovies(true);
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
        isInitialMovies(false);
        getMoviesSaved();
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
