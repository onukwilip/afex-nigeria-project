import React from "react";
import css from "../styles/SideBarIcons/SideBarIcons.module.css";
const SideBarIcons = (props) => {
  return (
    <div className={css["icon-container"]}>
      <i className={`${props.icon} ${props.className}`}></i>
      <em>{props.title}</em>
    </div>
  );
};

export default SideBarIcons;
