import React from "react";
import "./Section.css";

function Section(props) {
  return (
    <section id={props.id} className="section">
      <div className="section__header">
        <h2
          className={`section__title ${
            props.isColorChange
              ? "section__border_dark"
              : "section__border_light"
          }`}
        >
          {props.title}
        </h2>
      </div>
      {props.children}
    </section>
  );
}

export default Section;
