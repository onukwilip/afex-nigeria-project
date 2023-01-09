import React from "react";
import { Icon, Input } from "semantic-ui-react";
import css from "../styles/Menu/Menu.module.css";

const menuItems = [
  {
    icon: "chart line",
    title: "Product view",
  },
  {
    icon: "book",
    title: "Order book",
  },
  {
    icon: "history",
    title: "Price history",
  },
  {
    icon: "eye",
    title: "Open orders",
  },
  {
    icon: "check circle outline",
    title: "Closed trades",
  },
  {
    icon: "cancel",
    title: "Cancelled trades",
  },
];

const Menu = () => {
  return (
    <div className={css.menu}>
      <Input
        icon="search"
        iconPosition="left"
        placeholder="Search..."
        className={css.input}
      />
      {menuItems.map((eachMenu) => (
        <MenuItem icon={eachMenu.icon} title={eachMenu.title} />
      ))}
    </div>
  );
};

const MenuItem = (props) => {
  return (
    <div className={css["menu-item"]}>
      <Icon name={props.icon} />
      <em>{props.title}</em>
    </div>
  );
};

export default Menu;
