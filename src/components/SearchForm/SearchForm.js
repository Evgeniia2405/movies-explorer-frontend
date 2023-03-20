import React from "react";
import "./SearchForm.css";

function SearchForm(props) {
  return (
    <div className="search__wrapper">
      <form name="movies" className="search__form" onSubmit={props.onSubmit}>
        <input
          className="search__input"
          type="text"
          placeholder="Фильм"
          onChange={props.handleChange}
        />
        <button type="submit" className="search__btn">
          <span></span>
        </button>
      </form>
      <div className="search__checkbox">
        <label className="checkbox__label" htmlFor="checkbox">
          <input className="checkbox__inp" type="checkbox" id="checkbox" />
          <span className="checkbox__inner">Короткометражки</span>
        </label>
      </div>
    </div>
  );
}

export default SearchForm;
