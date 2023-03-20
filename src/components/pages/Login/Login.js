import React, { useEffect, useState } from "react";
import Form from "../../Form/Form";
import Input from "../../Input/Input";
import Sign from "../../Sign/Sign";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);

  const [emailError, setEmailError] = useState("Обязательное поле");
  const [passwordError, setPasswordError] = useState("Что-то пошло не так...");

  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (emailError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, passwordError]);

  const emailHandler = (e) => {
    setEmail(e.target.value);
    const re =
      /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@"]+)*))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError("Некорректный email");
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
      text="Ещё не зарегистрированы? "
      path="/signup"
      link="Регистрация"
      children={
        <Form
          title="Рады видеть!"
          children={
            <>
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
          button="Войти"
        />
      }
    />
  </>
  );
}

export default Login;
