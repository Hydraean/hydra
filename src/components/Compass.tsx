import React, { useEffect, useState } from "react";
import { getBearing, measureCoordDistance } from "./utils";

const Compass = (props: any) => {
  const [bearing, setBearing] = useState<any>(0);
  const [distance, setDistance] = useState<any>("-");
  const [reached, setReached] = useState(false);

  var id, target, options;

  function tracking(pos) {
    var crd = pos.coords;

    console.log(crd);
    const targetLocation = JSON.parse(localStorage.currentLocation);

    let newBearing = getBearing(
      crd.latitude,
      crd.longitude,
      targetLocation.lat,
      targetLocation.long
    ).toFixed(2);

    let newDistance = measureCoordDistance(
      crd.latitude,
      crd.longitude,
      targetLocation.lat,
      targetLocation.long,
      "K"
    ).toFixed(2);

    setBearing(newBearing);
    setDistance(newDistance);

    // check if distance is less than 15 meters
    if (parseFloat(newDistance) < 0.015) {
      setReached(true);
    } else {
      setReached(false);
    }
  }

  function error(err) {
    console.warn("ERROR(" + err.code + "): " + err.message);
  }

  target = {
    latitude: 0,
    longitude: 0,
  };

  options = {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: 0,
  };

  useEffect(() => {
    id = navigator.geolocation.watchPosition(tracking, error, options);
  }, []);

  return (
    <div
      className={`compass-widget fade-in-bottom ${reached ? "reached" : ""}`}
    >
      <div
        className="compass-pointer"
        style={{ transform: `rotate(${bearing}deg)` }}
      >
        <i className="la la-location-arrow text-white la-4x" />
      </div>
      <div className="degree-info">
        <small className="text-info">{bearing}°</small>
        <br />
        <small className="text-info">DISTANCE: {distance} km</small>
        {reached && (
          <small className="badge badge-success py-2 px-2 mt-4 fade-in">
            Target Location Reached
          </small>
        )}
      </div>
    </div>
  );
};

export default Compass;
