import React from "react";
import "../styles/Map.scss";
import Sidebar from "./Sidebar";
import EventThread from "./EventThread";
import Mapbox from "./Mapbox";

const Map = (props: any) => {
  return (
    <>
      <Sidebar active="Map" />
      <EventThread />

      <div className="map-content">
        <Mapbox />
      </div>
    </>
  );
};

export default Map;
