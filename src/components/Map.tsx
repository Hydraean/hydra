import React from "react";
import "../styles/Map.scss";

const Map = (props: any) => {
  return (
    <div>
      <div className="sidebar">
        <img src="hlogo.png" alt="h-logo" className="landing-logo" />

        <div className="nav-items">
          <i className="la la-2x la-map active" />
          <i className="la la-2x la-exclamation-circle" />
          <i className="la la-2x la-list" />
          <i className="la la-2x la-broadcast-tower"></i>
        </div>

        <div className="user-profile">
          <img
            src="https://avatars0.githubusercontent.com/u/29462205?s=460&u=2dfd08d765296669d4fc10ebecfc80a424298b75&v=4"
            alt="Profile"
          />
        </div>
      </div>
    </div>
  );
};

export default Map;
