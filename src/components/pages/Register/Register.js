import React, { useEffect, useState } from "react";
import Form from "../../Form/Form";
import Input from "../../Input/Input";
import Sign from "../../Sign/Sign";

function RegisterI() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [nameDirty, setNameDirty] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);

  const [nameError, setNameError] = useState("Обязательное поле");
  const [emailError, setEmailError] = useState("Обязательное поле");
  const [passwordError, setPasswordError] = useState("Что-то пошло не так...");

  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (nameError || emailError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [nameError, emailError, passwordError]);

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

  const passwordHandler = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 6) {
      setPasswordError("Пароль должен быть более 6 знаков");
      if (!e.target.value) {
        setPasswordError("Обязательное поле");
      }
    } else {
      setPasswordError("");
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
      case "password":
        setPasswordDirty(true);
        break;
      default:
      // do nothing
    }
  };
  return (
    <>
      <Sign
        text="Уже зарегистрированы? "
        path="/signin"
        link="Войти"
        children={
          <Form
            title="Добро пожаловать!"
            children={
              <>
                <Input
                  title="Имя"
                  name="name"
                  value={name}
                  onChange={(e) => nameHandler(e)}
                  onBlur={(e) => blurHandler(e)}
                  dirty={nameDirty}
                  error={nameError}
                  type={"text"}
                />
                <Input
                  title="E-mail"
                  name="email"
                  value={email}
                  onChange={(e) => emailHandler(e)}
                  onBlur={(e) => blurHandler(e)}
                  dirty={emailDirty}
                  error={emailError}
                  type={"text"}
                />
                <Input
                  title="Пароль"
                  name="password"
                  value={password}
                  onChange={(e) => passwordHandler(e)}
                  onBlur={(e) => blurHandler(e)}
                  dirty={passwordDirty}
                  error={passwordError}
                  type={"password"}
                />
              </>
            }
            formValid={formValid}
            button="Зарегистрироваться"
          />
        }
      />
    </>
  );
}

export default RegisterI;
