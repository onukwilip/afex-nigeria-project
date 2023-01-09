import React from "react";
import css from "../styles/Button/Button.module.css";

const Button = (props) => {
  return (
    <button
      style={{ ...props.style }}
      {...props.properties}
      className={`${
        props.buttonType === "Dark"
          ? css.dark
          : props.buttonType === "Success"
          ? css.success
          : props.buttonType === "Danger"
          ? css.danger
          : null
      } ${props.className}`}
    >
      {props.children}
    </button>
  );
};

export default Button;
