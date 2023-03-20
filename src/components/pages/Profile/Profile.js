import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import { dataMenu } from "../../../utils/dataMenu";

import "./Profile.css";

function Profile({ active, setActive }) {
  const [name, setName] = useState("Виталий");
  const [email, setEmail] = useState("pochta@yandex.ru");

  const [nameDirty, setNameDirty] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);

  const [nameError, setNameError] = useState("Обязательное поле");
  const [emailError, setEmailError] = useState("Обязательное поле");

  const [formValid, setFormValid] = useState(false);

  const history = useHistory();

  function signOut() {
    history.push("/signin");
  }

  useEffect(() => {
    if (nameError || emailError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [nameError, emailError]);

  const nameHandler = (e) => {
    setName(e.target.value);
    if (e.target.value.length < 2 || e.target.value.length > 30) {
      setNameError("Имя должно быть длиннее 2 и менее 30 знаков");
      if (!e.target.value) {
        setNameError("Обязательное поле");
      }
    } else {
      setNameError("");
    }
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
    const re =
      /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@"]+)*))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError("Некорректный email");
      if (!e.target.value) {
        setEmailError("Обязательное поле");
      }
    } else {
      setEmailError("");
    }
  };

  const blurHandler = (e) => {
    switch (e.target.name) {
      case "name":
        setNameDirty(true);
        break;
      case "email":
        setEmailDirty(true);
        break;
      default:
      // do nothing
    }
  };
  return (
    <>
      <Header menuActive={active} setMenuActive={setActive} />
      <form className="profile__form">
        <h2 className="profile__title">Привет, {name}!</h2>
        <div className="profile__inputs">
          <div className="profile__input">
            <label className="profile__label" htmlFor="name">
              Имя
            </label>
            <input
              value={name}
              onChange={(e) => nameHandler(e)}
              onBlur={(e) => blurHandler(e)}
              className={
                nameDirty && nameError
                  ? "profile__placeholder profile__placeholder_invalid"
                  : "profile__placeholder"
              }
              name="name"
              type="text"
            />
            <span
              className={
                nameDirty && nameError
                  ? "input__span input__span_visible"
                  : "input__span"
              }
            >
              {nameError || " "}
            </span>
          </div>
          <div className="profile__input">
            <label className="profile__label" htmlFor="email">
              E-mail
            </label>
            <input
              value={email}
              onChange={(e) => emailHandler(e)}
              onBlur={(e) => blurHandler(e)}
              className={
                emailDirty && emailError
                  ? "profile__placeholder profile__placeholder_invalid profile__placeholder_noborder"
                  : "profile__placeholder profile__placeholder_noborder"
              }
              name="email"
              type="text"
            />
            <span
              className={
                emailDirty && emailError
                  ? "profile__span profile__span_visible"
                  : "profile__span"
              }
            >
              {emailError || " "}
            </span>
          </div>
        </div>
        <button
          className={
            !formValid
              ? "profile__button profile__button_disabled"
              : "profile__button"
          }
          disabled={!formValid}
          type="submit"
        >
          Редактировать
        </button>
      </form>

      <button onClick={signOut} className="profile__button profile__out">
        Выйти из аккаунта
      </button>

      <Menu items={dataMenu} active={active} setActive={setActive} />
    </>
  );
}

export default Profile;
