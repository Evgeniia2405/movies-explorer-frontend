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
                <p className="student__subtitle">
                  курс &laquo;Фронтенд-разработчик&raquo;
                </p>
                <p className="student__paragraph">
                  В&nbsp;рамках учебной программы на&nbsp;курсе
                  &laquo;Веб-разработчик&raquo; в&nbsp;Яндекс Практикуме
                  пройдены следующие модули:
                </p>
                <ul className="student__list">
                  <li className="student__item">
                  &mdash;&nbsp;Основы HTML, CSS, JavaScript
                  </li>
                  <li className="student__item">
                  &mdash;&nbsp;Расширенные возможности HTML и&nbsp;CSS
                  </li>
                  <li className="student__item">
                  &mdash;&nbsp;HTML и&nbsp;CSS. Работа с&nbsp;макетом, построение сложных
                    сеток, адаптивная верстка
                  </li>
                  <li className="student__item">
                  &mdash;&nbsp;Базовый JavaScript и&nbsp;работа с&nbsp;браузером
                  </li>
                  <li className="student__item">
                  &mdash;&nbsp;JavaScript непростые концепции
                  </li>
                  <li className="student__item">
                  &mdash;&nbsp;Создание интерфейсов на&nbsp;React
                  </li>
                  <li className="student__item">&mdash;&nbsp;Основы бэкенд разработки</li>
                  <li className="student__item">&mdash;&nbsp;Выпускной проект</li>
                </ul>
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
