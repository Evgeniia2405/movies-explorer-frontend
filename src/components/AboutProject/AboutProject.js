import React from "react";
import Section from "../Section/Section";
import "./AboutProject.css";

function AboutProject() {
  return (
    <div className="prj__wrapper">
      <Section
        title="О проекте"
        id="sec1"
        isColorChange={false}
        children={
          <>
            <div className="prj__articles">
              <article className="prj__text">
                <h3 className="prj__title">
                  Дипломный проект включал 5 этапов
                </h3>
                <p className="prj__paragraph">
                  Составление плана, работу над бэкендом, вёрстку, добавление
                  функциональности и&nbsp;финальные доработки.
                </p>
              </article>
              <article className="prj__text">
                <h3 className="prj__title">
                  На выполнение диплома ушло 5 недель
                </h3>
                <p className="prj__paragraph">
                  У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн,
                  которые нужно было соблюдать, чтобы успешно защититься.
                </p>
              </article>
            </div>
            <div className="prj__tab">
              <p className="prj__cell">1 неделя</p>
              <p className="prj__cell">4 недели</p>
              <p className="prj__cell">Back-end</p>
              <p className="prj__cell">Front-end</p>
            </div>
          </>
        }
      />
    </div>
  );
}

export default AboutProject;
