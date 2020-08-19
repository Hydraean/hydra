import React, { useEffect } from "react";
import "../styles/Map.scss";
import Sidebar from "./Sidebar";
import { loadChart } from "./utils";

const Incidents = (props: any) => {
  useEffect(() => {
    loadChart();
  }, []);

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
