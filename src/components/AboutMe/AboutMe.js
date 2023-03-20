import React from "react";
import Section from "../Section/Section";
import AboutMeImage from "../../images/AboutMe.jpg";
import "./AboutMe.css";
import Portfolio from "../Portfolio/Portfolio";

function AboutMe() {
  return (
    <div className="student__wrapper">
      <Section
        title="Студент"
        id="sec3"
        isColorChange={false}
        children={
          <>
            <div className="student__about">
              <img
                src={AboutMeImage}
                className="student__img"
                alt="фото студента"
              />
              <article className="student__text">
                <h2 className="student__title">Евгения</h2>
                <p className="student__subtitle">Фронтенд-разработчик</p>
                <p className="student__paragraph">
                  Я&nbsp;родилась в&nbsp;Самаре, закончила факультет двигателей
                  летательных аппаратов СГАУ им. С.&nbsp;П.&nbsp;Королёва.
                  Сейчас живу в&nbsp;Москве, замужем и&nbsp;у&nbsp;меня двое
                  детей. Я&nbsp;люблю слушать музыку, а&nbsp;ещё увлекаюсь
                  бегом. Прохожу курс по&nbsp;веб-разработке, планирую
                  заниматься фриланс-заказами и&nbsp;найти постоянную работу.
                </p>
                <a
                  className="student__link"
                  href="https://github.com/evgeniia2405"
                  target="_blank"
                  rel="noreferrer"
                >
                  Github
                </a>
              </article>
            </div>
            <Portfolio />
          </>
        }
      />
    </div>
  );
}

export default AboutMe;
