import React from "react";
import "./Input.css";

function Input(props) {

  return (
    <>
      <label className="input__label" htmlFor={props.name}>{props.title}
      </label>
      <input
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        className={
          props.dirty && props.error
            ? "input__placeholder input__placeholder_invalid"
            : "input__placeholder"
        }
        name={props.name}
        type={props.type}
      />
      <span
        className={
          props.dirty && props.error
            ? "input__span input__span_visible"
            : "input__span"
        }
      >
        {props.error || " "}
      </span>
    </>
  );
}

export default Input;
