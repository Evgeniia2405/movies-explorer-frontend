import React from "react";
import { Link, useLocation } from "react-router-dom";
import AccountIcon from "../AccountIcon/AccountIcon";
import "./Menu.css";

function Menu({ items, active, setActive }) {
  let location = useLocation();

  return (
    <div className={active ? "menu menu_active" : "menu"}>
      <div className={active ? "menu__background menu__background_active" : "menu__background"} onClick={()=>setActive(!active)}/>
      <div className="menu__content">
        <button className="menu__close" type="button" onClick={()=>setActive(!active)}></button>
        <div className="menu__main">
          <ul className="menu__items">
            {items.map((item) => (
              <li className="menu__item" key={`${item.id}`} onClick={()=>setActive(!active)}>
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
        <div className="menu__footer" onClick={()=>setActive(!active)}>
          <AccountIcon />
        </div>
      </div>
    </div>
  );
}

export default Menu;
