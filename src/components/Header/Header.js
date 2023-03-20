import React from "react";
import { useLocation } from "react-router-dom";
import AccountIcon from "../AccountIcon/AccountIcon";
import Logo from "../Logo/Logo";
import "./Header.css";

function Header({ setMenuActive }) {
  let location = useLocation();
  return (
    <div className="header">
      <Logo />
      <>
        {location.pathname === "/movies" ||
        location.pathname === "/saved-movies" ||
        location.pathname === "/profile" ? (
          <>
            <div className="header__movies">
              <a
                href="/movies"
                className={`${
                  location.pathname === "/movies"
                    ? "header__movie header__movie_active"
                    : "header__movie"
                }`}
              >
                Фильмы
              </a>
              <a
                href="/saved-movies"
                className={`${
                  location.pathname === "/saved-movies"
                    ? "header__movie header__movie_active"
                    : "header__movie"
                }`}
              >
                Сохранённые фильмы
              </a>
            </div>
            <div className="header__account">
              <AccountIcon />
            </div>
            <button
              onClick={() => setMenuActive(true)}
              className="header__burger"
            >
              <span></span>
            </button>
          </>
        ) : (
          <>
            <div className="header__sign">
              <a href="/signup" className="header__signup">
                Регистрация
              </a>
              <a href="/signin" className="header__signin">
                Войти
              </a>
            </div>
          </>
        )}
      </>
    </div>
  );
}

export default Header;
