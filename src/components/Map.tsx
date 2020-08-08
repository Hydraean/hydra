import React from "react";
import "../styles/Map.scss";
import Sidebar from "./Sidebar";
import EventThread from "./EventThread";

const Map = (props: any) => {
  return (
    <>
      <Sidebar active="Map" />
      <EventThread />

      <div className="map-content">
        <h1>Map</h1>
      </div>
    </>
  );
};

export default Map;
