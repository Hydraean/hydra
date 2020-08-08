import React from "react";
import "../styles/Map.scss";
import Sidebar from "./Sidebar";

const Devices = (props: any) => {
  return (
    <>
      <Sidebar active="Devices" />
      <div className="dashboard-content">
        <h1>Devices</h1>
      </div>
    </>
  );
};

export default Devices;
