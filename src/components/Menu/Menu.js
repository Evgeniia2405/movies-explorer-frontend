import React from "react";
import { Link, useLocation } from "react-router-dom";
import AccountIcon from "../AccountIcon/AccountIcon";
import { dataMenu } from "../../utils/dataMenu";
import "./Menu.css";

function Menu({ isOpenMenu, isCloseMenu }) {
  let location = useLocation();

  return (
    <div className={isOpenMenu ? "menu menu_active" : "menu"}>
      <div className={isOpenMenu ? "menu__background menu__background_active" : "menu__background"} onClick={isCloseMenu}/>
      <div className="menu__content">
        <button className="menu__close" type="button" onClick={isCloseMenu}></button>
        <div className="menu__main">
          <ul className="menu__items">
            {dataMenu.map((item) => (
              <li className="menu__item" key={`${item.id}`} onClick={isCloseMenu}>
                <Link
                  className={`menu__link ${ location.pathname === item.href ? "menu__link_active"
                      : ""
                  }`}
                  to={item.href}
                >
                  {item.value}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="menu__footer" onClick={isCloseMenu}>
          <AccountIcon />
        </div>
      </div>
    </div>
  );
}

export default Menu;
