import React from "react";
import { Link } from "react-router-dom";

const Links = [
  {
    name: "Home",
    link: "/",
    icon: "la-home",
  },
  {
    name: "Map",
    link: "/map",
    icon: "la-map",
  },
  {
    name: "Analytics",
    link: "/analytics",
    icon: "la-line-chart",
  },
  {
    name: "Devices",
    link: "/device-list",
    icon: "la-list",
  },
  {
    name: "Device Registry",
    link: "/device-registry",
    icon: "la-layer-group",
  },
  // {
  //   name: "Report Demo",
  //   link: "/report/demo",
  //   icon: "la-broadcast-tower",
  // },
];

const Sidebar = (props: any) => {
  return (
    <div className="sidebar">
      <div className="logo-polygon" />
      <Link to="/">
        <img src="hlogo.png" alt="h-logo" className="landing-logo" />
      </Link>

      <div className="nav-items">
        {Links.map((item: any) => {
          return (
            <Link to={item.link}>
              <i
                className={`la la-1x nav-icon ${item.icon} ${
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
          src="https://pbs.twimg.com/profile_images/1249007824002154498/ImpuC4Np.jpg"
          alt="Profile"
        />
      </div>
    </div>
  );
};

export default Sidebar;
