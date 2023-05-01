import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AccountIcon from "../AccountIcon/AccountIcon";
import Logo from "../Logo/Logo";
import "./Header.css";
import Menu from "../Menu/Menu";

function Header({ loggedIn }) {
  const [menuActive, setMenuActive] = useState(false);
  let location = useLocation();

  const closeMenu = () => {
    setMenuActive(false);
  };

  return (
    <>
      <div
        className={ 
          (loggedIn && location.pathname === "/movies" ) || (loggedIn && location.pathname === "/profile") || (loggedIn && location.pathname === "/saved-movies") || (location.pathname === "/")
            ? "header header_active"
            : "header"
        }
      >
        <Logo />
        <>
          {loggedIn ? (
            <>
              <div className="header__movies">
                <Link
                  to="/movies"
                  className={`${
                    location.pathname === "/movies"
                      ? "header__movie header__movie_active"
                      : "header__movie"
                  }`}
                >
                  Фильмы
                </Link>
                <Link
                  to="/saved-movies"
                  className={`${
                    location.pathname === "/saved-movies"
                      ? "header__movie header__movie_active"
                      : "header__movie"
                  }`}
                >
                  Сохранённые фильмы
                </Link>
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
                <Link to="/signup" className="header__signup">
                  Регистрация
                </Link>
                <Link to="/signin" className="header__signin">
                  Войти
                </Link>
              </div>
            </>
          )}
        </>
      </div>
      <Menu isOpenMenu={menuActive} isCloseMenu={closeMenu} />
    </>
  );
}

export default Header;
