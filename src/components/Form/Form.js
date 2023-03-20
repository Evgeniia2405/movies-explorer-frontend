import React from "react";
import "./Form.css";

function Form(props) {
  return (
    <>
      <form className="form">
        <h2 className="form__title">{props.title}</h2>
        <div className="form__inputs">{props.children}</div>
        <button
          className={
            !props.formValid
              ? "form__button form__button_disabled"
              : "form__button"
          }
          disabled={!props.formValid}
          type="submit"
        >
          {props.button}
        </button>
      </form>
    </>
  );
}

export default Form;
