import React from "react";
import NavTab from "../NavTab/NavTab";
import "./Promo.css";
import { dataPromo } from "../../utils/dataPromo";
function Promo() {
  return (
    <section className="promo">
      <h1 className="promo__title">
        Учебный проект студента факультета Веб-разработки.
      </h1>
      <nav className="promo__navtab">
        <NavTab data={dataPromo} isSmall={true} />
      </nav>
    </section>
  );
}

export default Promo;
