import React, { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";
import "./Profile.css";
import { useInput } from "../../../hooks/useForm";
import Preloader from "../../Preloader/Preloader";

function Profile({ onEdit, onSignOut, serverMessage, isLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const [message, setMessage] = useState(serverMessage);
  const name = useInput(currentUser.name || "", {
    isEmpty: true,
    minLength: 2,
    maxLength: 30,
    isName: true,
  });
  const email = useInput(currentUser.email || "", {
    isEmpty: true,
    isEmail: true,
  });

  useEffect(() => {
    setMessage("");
  }, []);

  useEffect(() => {
    setMessage(serverMessage);
    setTimeout(clearMessage, 2500);
  }, [serverMessage]);

  function clearMessage() {
    setMessage("");
  }

  function signOut() {
    onSignOut();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit(name.value, email.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="profile__form">
        <h2 className="profile__title">Привет, {currentUser.name}!</h2>
        <div className="profile__inputs">
          <div className="profile__input">
            <label className="profile__label" htmlFor="name">
              Имя
            </label>
            <input
              value={name.value}
              onChange={(e) => name.onChange(e)}
              onBlur={(e) => name.onBlur(e)}
              dirty={name.isDirty ? 1 : 0}
              className={
                name.isDirty &&
                (name.isEmpty.state ||
                  name.minLengthError.state ||
                  name.nameError.state ||
                  name.maxLengthError.state)
                  ? "profile__placeholder profile__placeholder_invalid"
                  : "profile__placeholder"
              }
              name="name"
              type="text"
            />
            <span
              className={
                name.isDirty &&
                (name.isEmpty.state ||
                  name.minLengthError.state ||
                  name.nameError.state ||
                  name.maxLengthError.state)
                  ? "input__span input__span_visible"
                  : "input__span"
              }
            >
              {name.isEmpty.textError ||
                name.minLengthError.textError ||
                name.maxLengthError.textError ||
                name.nameError.textError ||
                " "}
            </span>
          </div>
          <div className="profile__input">
            <label className="profile__label" htmlFor="email">
              E-mail
            </label>
            <input
              value={email.value}
              onChange={(e) => email.onChange(e)}
              onBlur={(e) => email.onBlur(e)}
              dirty={email.isDirty ? 1 : 0}
              className={
                email.isDirty && (email.isEmpty.state || email.emailError.state)
                  ? "profile__placeholder profile__placeholder_invalid profile__placeholder_noborder"
                  : "profile__placeholder profile__placeholder_noborder"
              }
              name="email"
              type="text"
            />
            <span
              className={
                email.isDirty && (email.isEmpty.state || email.emailError.state)
                  ? "profile__span profile__span_visible"
                  : "profile__span"
              }
            >
              {email.emailError.textError || email.isEmpty.textError || " "}
            </span>
          </div>
        </div>
        {message ? <p className="form__text">{message}</p> : ""}
        <button
          className={
            (name.value === currentUser.name &&
              email.value === currentUser.email) ||
            !name.inputValid ||
            !email.inputValid
              ? "profile__button profile__button_disabled"
              : "profile__button"
          }
          disabled={
            (name.value === currentUser.name &&
              email.value === currentUser.email) ||
            !name.inputValid ||
            !email.inputValid
          }
          type="submit"
        >
          Редактировать
        </button>
      </form>
      <button onClick={signOut} className="profile__out">
        Выйти из аккаунта
      </button>
      <Preloader isLoading={isLoading} />
    </>
  );
}

export default Profile;
