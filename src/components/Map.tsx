import React from "react";
import "../styles/Map.scss";
import Sidebar from "./Sidebar";

const Map = (props: any) => {
  return (
    <>
      <Sidebar active="Map" />
      <div className="dashboard-content">
        <h1>Map</h1>
      </div>
    </>
  );
};

export default Map;
