import React from "react";
import css from "../styles/Options/Options.module.css";

const Options = (props) => {
  return (
    <div className={css.options}>
      <em>{props.title}</em>
      {props.menus?.map((eachItem) => (
        <em className={css.item}>{eachItem}</em>
      ))}
    </div>
  );
};

export default Options;
