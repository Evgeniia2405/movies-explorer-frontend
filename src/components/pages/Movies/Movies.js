import React from "react";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import MoviesCardList from "../../MoviesCardList/MoviesCardList";
import { dataMenu } from "../../../utils/dataMenu"

import SearchForm from "../../SearchForm/SearchForm";
import "./Movies.css";

function Movies({active, setActive}) {

  return (
    <>
      <Header menuActive={active} setMenuActive={setActive} />
      <main className="movies">
        <SearchForm />
        <MoviesCardList />
      </main>
      <Menu items={dataMenu} active={active} setActive={setActive}/>
      <Footer />
    </>
  );
}

export default Movies;
