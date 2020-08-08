import React from "react";
import "../styles/Map.scss";
import Sidebar from "./Sidebar";

const Advisories = (props: any) => {
  return (
    <>
      <Sidebar active="Announcements" />
      <div className="dashboard-content">
        <h1>Advisories</h1>
      </div>
    </>
  );
};

export default Advisories;
