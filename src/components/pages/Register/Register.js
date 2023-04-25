import React from "react";
import Form from "../../Form/Form";
import Input from "../../Input/Input";
import Sign from "../../Sign/Sign";
import { useInput } from "../../../hooks/useForm";
import Preloader from "../../Preloader/Preloader";

function Register({ onRegistr, serverMessage, isLoading }) {
  const name = useInput("", {
    isEmpty: true,
    minLength: 2,
    maxLength: 30,
    isName: true,
  });
  const email = useInput("", { isEmpty: true, isEmail: true });
  const password = useInput("", { isEmpty: true, minLength: 3 });

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegistr(name.value, email.value, password.value);
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
            onSubmit={handleSubmit}
            serverMessage={serverMessage}
            children={
              <>
                <Input
                  title="Имя"
                  name="name"
                  value={name.value}
                  onChange={(e) => name.onChange(e)}
                  onBlur={(e) => name.onBlur(e)}
                  dirty={name.isDirty}
                  error={
                    (name.isDirty && name.isEmpty.state
                      ? name.isEmpty.textError
                      : "") ||
                    (name.isDirty && name.minLengthError.state
                      ? name.minLengthError.textError
                      : "") ||
                    (name.isDirty && name.maxLengthError.state
                      ? name.maxLengthError.textError
                      : "") ||
                    (name.isDirty && name.nameError.state
                      ? name.nameError.textError
                      : "")
                  }
                  type={"text"}
                />
                <Input
                  title="E-mail"
                  name="email"
                  value={email.value}
                  onChange={(e) => email.onChange(e)}
                  onBlur={(e) => email.onBlur(e)}
                  dirty={email.isDirty}
                  error={
                    (email.isDirty && email.isEmpty.state
                      ? email.isEmpty.textError
                      : "") ||
                    (email.isDirty && email.emailError.state
                      ? email.emailError.textError
                      : "")
                  }
                  type={"text"}
                />
                <Input
                  title="Пароль"
                  name="password"
                  value={password.value}
                  onChange={(e) => password.onChange(e)}
                  onBlur={(e) => password.onBlur(e)}
                  dirty={password.isDirty}
                  error={
                    (password.isDirty && password.isEmpty.state
                      ? email.isEmpty.textError
                      : "") ||
                    (password.isDirty && password.minLengthError.state
                      ? password.minLengthError.textError
                      : "")
                  }
                  type={"password"}
                />
              </>
            }
            formValid={
              name.inputValid && email.inputValid && password.inputValid
            }
            button="Зарегистрироваться"
          />
        }
      />
      <Preloader isLoading={isLoading} />
    </>
  );
}

export default Register;
