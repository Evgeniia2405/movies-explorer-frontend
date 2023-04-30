import React from "react";
import "./SearchForm.css";

function SearchForm(props) {
  return (
    <div className="search__wrapper">
      <form name="movies" className="search__form" onSubmit={props.onSubmit}>
        <input
          value={props.value || ""}
          onChange={props.onChange}
          className="search__input"
          name="movies"
          type="text"
          placeholder="Фильм"
        />

        <button type="submit" className="search__btn">
          <span></span>
        </button>
      </form>
      <p className="search__span">{props.searchMessage}</p>
      <div className="search__checkbox">
        <>
          <label className="checkbox__label" htmlFor="checkbox">
            <input
              checked={props.checked}
              onChange={props.chengeCheckbox}
              className="checkbox__inp"
              name="isShorts"
              type="checkbox"
              id="checkbox"
            />
            <span className="checkbox__inner">Короткометражки</span>
          </label>
        </>
      </div>
    </div>
  );
}

export default SearchForm;
