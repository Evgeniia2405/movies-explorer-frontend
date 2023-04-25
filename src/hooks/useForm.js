import React, { useEffect, useState, useCallback } from "react";

export const useValidation = (value, validations) => {
  const [isEmpty, setEmpty] = useState({ state: true, textError: "" });
  const [minLengthError, setMinLengthError] = useState({
    state: false,
    textError: "",
  });
  const [maxLengthError, setMaxLengthError] = useState({
    state: false,
    textError: "",
  });
  const [emailError, setEmailError] = useState({ state: false, textError: "" });
  const [nameError, setNameError] = useState({ state: false, textError: "" });
  const [inputValid, setInputValid] = useState(false);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case "isName":
          const regName = /^[а-яА-ЯёЁa-zA-Z /-]+$/;
          regName.test(String(value).toLowerCase())
            ? setNameError({ state: false, textError: "" })
            : setNameError({ state: true, textError: "Недопустимый символ" });
          break;
        case "minLength":
          value.length < validations[validation]
            ? setMinLengthError({
                state: true,
                textError: `Минимально допустимое количество знаков: ${validations[validation]}`,
              })
            : setMinLengthError({ state: false, textError: "" });
          break;
          case "maxLength":
            value.length > validations[validation]
              ? setMaxLengthError({
                  state: true,
                  textError: `Максимально допустимое количество знаков: ${validations[validation]}`,
                })
              : setMaxLengthError({ state: false, textError: "" });
            break;
        case "isEmpty":
          value
            ? setEmpty({ state: false, textError: "" })
            : setEmpty({ state: true, textError: "Обязательное поле" });
          break;
        case "isEmail":
          const re =
            /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@"]+)*))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          re.test(String(value).toLowerCase())
            ? setEmailError({ state: false, textError: "" })
            : setEmailError({
                state: true,
                textError: "Некорректный формат email",
              });
          break;
        default:
        // do nothing
      }
    }
  }, [value]);

  useEffect(() => {
    if (
      isEmpty.state ||
      minLengthError.state ||
      maxLengthError.state ||
      emailError.state ||
      nameError.state
    ) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmpty, minLengthError, maxLengthError, emailError, nameError]);

  // const resetForm = useCallback(
  //   (newValues = { state: false, textError: "" }, newIsValid = false) => {
  //     setEmpty(newValues);
  //     setMinLengthError(newValues);
  //     setEmailError(newValues);
  //     setNameError(newValues);
  //     setInputValid(newIsValid);
  //   },
  //   [setEmpty, setMinLengthError, setEmailError, setNameError, setInputValid]
  // );

  return { isEmpty, emailError, nameError, minLengthError, maxLengthError, inputValid};
};

export const useInput = (initialValue, validations) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setDirty] = useState(false);

  const valid = useValidation(value, validations);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onBlur = (e) => {
    setDirty(true);
  };

  return { value, onChange, onBlur,isDirty, ...valid };
};
