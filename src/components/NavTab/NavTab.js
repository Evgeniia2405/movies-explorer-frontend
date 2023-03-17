import React from "react";
import "./NavTab.css";

function NavTab(props) {
  const data = props.data;

  return (
    <ul
      className={`nav__items ${
        props.isSmall ? "nav__items_small" : "nav__items_large"
      }`}
    >
      {data.map((item, idx) => (
        <li
          className={`nav__item ${
            props.isSmall ? "nav__item_small" : "nav__item_large"
          }`}
          key={`${idx}`}
        >
          <a
            className="nav__link"
            href={item.link}
            target={item.target}
            rel={item.rel}
          >
            {item.title}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default NavTab;
