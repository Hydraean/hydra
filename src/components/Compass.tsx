import React, { useEffect, useState } from "react";
import { getBearing } from "./utils";

const Compass = (props: any) => {
  const [bearing, setBearing] = useState(0);
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
    );

    setBearing(newBearing);

    if (
      target.latitude === crd.latitude &&
      target.longitude === crd.longitude
    ) {
      alert("Congratulations, you reached the target");
      // navigator.geolocation.clearWatch(id);
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
    <div className="compass-widget fade-in-bottom">
      <div
        className="compass-pointer"
        style={{ transform: `rotate(${bearing}deg)` }}
      >
        <i className="la la-location-arrow text-white la-4x" />
      </div>
      <div className="degree-info">
        <span className="text-info">{bearing}°</span>
      </div>
    </div>
  );
};

export default Compass;
