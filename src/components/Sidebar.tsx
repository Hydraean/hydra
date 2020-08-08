import React from "react";
import { Link } from "react-router-dom";

const Links = [
  {
    name: "Home",
    link: "/",
    icon: "la-home"
  },
  {
    name: "Map",
    link: "/map",
    icon: "la-map"
  },
  {
    name: "Emergencies",
    link: "/incidents",
    icon: "la-exclamation-circle"
  },
  {
    name: "Advisories",
    link: "/advisories",
    icon: "la-broadcast-tower"
  },
  {
    name: "Devices",
    link: "/device-list",
    icon: "la-list"
  }
];

const Sidebar = (props: any) => {
  return (
    <div className="sidebar">
      <Link to="/">
        <img src="hlogo.png" alt="h-logo" className="landing-logo" />
      </Link>

      <div className="nav-items">
        {Links.map((item: any) => {
          return (
            <Link to={item.link}>
              <i
                className={`la la-2x ${item.icon} ${
                  item.name === props.active ? "active" : ""
                }`}
                title={item.name}
              />
            </Link>
          );
        })}
      </div>

      <div className="user-profile">
        <img
          src="https://avatars0.githubusercontent.com/u/29462205?s=460&u=2dfd08d765296669d4fc10ebecfc80a424298b75&v=4"
          alt="Profile"
        />
      </div>
    </div>
  );
};

export default Sidebar;
