import React from "react";
import { Button } from "semantic-ui-react";
import css from "../styles/Footer/Footer.module.css";

const items = [
  { name: "Soybean(SBSS)", price: "N 30,834.00" },
  { name: "Sorghum(SSBM)", price: "N 30,834.00" },
  { name: "Maize(SMAZ)", price: "N 30,834.00" },
  { name: "Paddy rice(SPRL)", price: "N 30,834.00" },
  { name: "Cocoa(SPAC)", price: "N 30,834.00" },
];

const Footer = () => {
  return (
    <div className={css.footer}>
      <Button secondary className={css.button}>
        Live Market
      </Button>
      {items.map((eachItem, i) => (
        <div className={css.item} key={i}>
          <em>{eachItem.name}</em>
          <em>{eachItem.price}</em>
        </div>
      ))}
    </div>
  );
};

export default Footer;
