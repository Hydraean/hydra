import React from "react";
import "../styles/Map.scss";
import Sidebar from "./Sidebar";

const Incidents = (props: any) => {
  return (
    <>
      <Sidebar active="Emergencies" />
      <div className="dashboard-content">
        <h1>Incidents</h1>
      </div>
    </>
  );
};

export default Incidents;
