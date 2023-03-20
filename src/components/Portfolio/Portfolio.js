import React from "react";
import "./Portfolio.css";
import { dataPortfolio } from "../../utils/dataPortfolio";
function Portfolio() {
  return (
    <div className="portfolio__wrapper">
      <h2 className="portfolio__title">Портфолио</h2>
      <nav className="portfolio__nav">
        <ul className="portfolio__items">
          {dataPortfolio.map((item, idx) => (
            <li className="portfolio__item" key={`${idx}`}>
              <a
                className="portfolio__link"
                href={item.link}
                target="_blank"
                rel="noreferrer"
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Portfolio;
