import React, { useState } from "react";
import { Link } from "react-router-dom";
import Compass from "./Compass";
import { fetchUser, clearSession } from "./utils";

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

  // {
  //   name: "Device Registry",
  //   link: "/device-registry",
  //   icon: "la-layer-group",
  // },
  {
    name: "Report Demo",
    link: "/report/",
    icon: "la-broadcast-tower",
  },
];

const actionIcons = [
  {
    name: "Locate Current Incident",
    link: "#",
    icon: "la-compass",
  },
];

const Sidebar = (props: any) => {
  const [selectedTool, selectTool] = useState("");

  const toggleProfile = () => {
    window.location.href = "/admin/login";
  };

  return (
    <>
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

        {/* {props.active === "Map" && ( */}
        <div className="nav-items">
          {actionIcons.map((item: any) => {
            return (
              <i
                className={`la la-1x nav-icon  ${item.icon} ${
                  item.name === selectedTool ? "active-tool" : ""
                }`}
                title={item.name}
                onClick={() => {
                  if (selectedTool === item.name) {
                    selectTool("");
                  } else {
                    selectTool(item.name);
                  }
                }}
              />
            );
          })}
        </div>
        {/*  )} */}

        <div className="user-profile" onClick={toggleProfile}>
          <img
            src={fetchUser().imageUrl ? fetchUser().imageUrl : "hlogo.png"}
            alt="Profile"
          />
        </div>
      </div>

      {selectedTool === "Locate Current Incident" && <Compass />}

      {fetchUser().name && (
        <div className="modal-card fade-in-bottom">
          <div className="row">
            <img
              className="avatar"
              src={fetchUser().imageUrl ? fetchUser().imageUrl : "hlogo.png"}
              alt="profile"
            />
            <span className="ml-3 text-white">
              {fetchUser().name ? fetchUser().name : "Public User"} <br />
              <small className="text-active">
                {fetchUser().name
                  ? "Verified User"
                  : "All the data is available to everyone."}

                <div
                  className="badge btn-default px-2 ml-1 btn-sm fade-in"
                  onClick={clearSession}
                >
                  Log Out
                </div>
              </small>
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
