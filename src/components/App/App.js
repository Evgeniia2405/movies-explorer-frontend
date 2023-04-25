import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Main from "../pages/Main/Main";
import Movies from "../pages/Movies/Movies";
import SavedMovies from "../pages/SavedMovies/SavedMovies";
import Profile from "../pages/Profile/Profile";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import NotFound from "../pages/NotFound/NotFound";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import api from "../../utils/MainApi";
import * as auth from "../../utils/MainAuth";
import ProtectedUnAuthRoute from "../ProtectedRoute/ProtectedUnAuthRoute";
import ProtectedAuthRoute from "../ProtectedRoute/ProtectedAuthRoute";
import Header from "../Header/Header";

function App() {
  const [countCards, setCountCards] = useState({});
  const [windowWidth, setWindowWidth] = useState(window.screen.width);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  useEffect(() => {
    window.onresize = () => {
      setWindowWidth(window.screen.width);
    };
    if (windowWidth < 675) {
      setCountCards({ countRender: 5, moreFilms: 2 });
    }
    if (windowWidth >= 675) {
      setCountCards({ countRender: 8, moreFilms: 2 });
    }
    if (windowWidth >= 1233) {
      setCountCards({ countRender: 12, moreFilms: 3 });
    }
    return () => {
      window.onresize = false;
    };
  }, [windowWidth]);

  const navigate = useNavigate();
  let location = useLocation();

  function handleCheckToken() {
    const token = localStorage.getItem("jwt");
    auth
      .getContent(token)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setCurrentUser(res);
          navigate("/movies");
        }
      })
      .catch((err) => {
        setLoggedIn(false);
        setCurrentUser({});
        localStorage.removeItem("jwt");
        setServerMessage("Ошибка при получении token", err);
      });
  }

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      handleCheckToken();
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      api
        .getUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => {
          setServerMessage(`Ошибка: ${err}`);
        });
    }
  }, [loggedIn]);

  function handleRegistr(name, email, password) {
    setIsLoading(true);
    auth
      .register(name, email, password)
      .then((res) => {
        handleLogin(email, password);
      })
      .catch((err) => {
        if (err === 409) {
          setServerMessage("Такой пользователь уже существует");
        } else {
          setServerMessage(`Что-то пошло не так, код ошибки: ${err}`);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleLogin(email, password) {
    setIsLoading(true);
    auth
      .authorize(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          handleCheckToken();
        }
        navigate("/movies");
      })
      .catch((err) => {
        if (err === 401) {
          setServerMessage("Неправильные почта или пароль");
        } else {
          setServerMessage(`Что-то пошло не так, код ошибки: ${err}`);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateUser(name, email) {
    setIsLoading(true);
    api
      .editUserInfo(name, email)
      .then((res) => {
        setCurrentUser(res);
        setServerMessage("Вы успешно обновили данные");
      })
      .catch((err) => {
        if (err === 409) {
          setServerMessage("Такой пользователь уже существует");
        } else {
          setServerMessage(`Что-то пошло не так, код ошибки: ${err}`);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleSignOut() {
    setLoggedIn(false);
    localStorage.clear();
    navigate("/");
  }

  useEffect(() => {
    setServerMessage("");
  }, [location.pathname]);

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header loggedIn={loggedIn} />
          <Routes>
            <Route exact path="/" element={<Main />} />
            <Route
              path="/signup"
              element={
                <ProtectedAuthRoute
                  component={Register}
                  onRegistr={handleRegistr}
                  serverMessage={serverMessage}
                  isLoading={isLoading}
                  loggedIn={loggedIn}
                />
              }
            />
            <Route
              path="/signin"
              element={
                <ProtectedAuthRoute
                  component={Login}
                  onLogin={handleLogin}
                  serverMessage={serverMessage}
                  isLoading={isLoading}
                  loggedIn={loggedIn}
                />
              }
            />
            <Route
              path="/movies"
              element={
                <ProtectedUnAuthRoute
                  component={Movies}
                  countCards={countCards}
                  loggedIn={loggedIn}
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedUnAuthRoute
                  component={SavedMovies}
                  loggedIn={loggedIn}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedUnAuthRoute
                  component={Profile}
                  serverMessage={serverMessage}
                  loggedIn={loggedIn}
                  onEdit={handleUpdateUser}
                  onSignOut={handleSignOut}
                  isLoading={isLoading}
                />
              }
            />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
