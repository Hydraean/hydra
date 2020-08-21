import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import EventThread from "./EventThread";
import Mapbox from "./Mapbox";
import { loadChart } from "./utils";

const Map = (props: any) => {
  useEffect(() => {
    loadChart();
  }, []);

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
