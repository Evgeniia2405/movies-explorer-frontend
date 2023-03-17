import React from "react";
import NavTab from "../NavTab/NavTab";
import Section from "../Section/Section";
import "./Techs.css";
import { dataTechs } from "../../utils/dataTechs";

function Techs() {
  return (
    <div className="techs__wrapper">
    <Section
      title="Технологии"
      id="sec2"
      isColorChange={true}
      children={
        <>
          <div className="techs__info">
            <h2 className="techs__title">7 технологий</h2>
            <p className="techs__paragraph">
              На&nbsp;курсе веб-разработки мы&nbsp;освоили технологии, которые
              применили в&nbsp;дипломном проекте.
            </p>
            <div className="techs__navtab">
              <NavTab data={dataTechs} />
            </div>
          </div>
        </>
      }
    />
    </div>
  );
}

export default Techs;
