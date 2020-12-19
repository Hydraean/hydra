import React from "react";
import moment from "moment";

const LocationUpdates = (props: any) => {
  const eventUpdates = props.data;

  return (
    <>
      <p className="geolocation-header-text mt-2">
        <i className="la la-map-marker" /> Report Location Updates
      </p>
      <div className="event-location-updates pl-3">
        <i className="la la-expand line-end top" />

        {eventUpdates.map((data: any, index: number) => {
          return (
            <div className="event-location-card">
              <i className="la la-angle-double-down delta-circle" />
              <strong className="event-card-header">
                <i className="la la-bullseye mr-1 bg-warning" /> Report Location
                Update: #{index + 1}
              </strong>
              <span>
                <strong>Longitude:</strong> {data.coordinates.long}
              </span>
              <span>
                <strong>Latitude:</strong> {data.coordinates.lat}
              </span>
              <span>
                <strong>Date:</strong>{" "}
                {moment(data.date).format("MMM. D, YYYY - hh:mm:ss A")}
              </span>
            </div>
          );
        })}
        <i className="la la-expand line-end bottom" />
      </div>
    </>
  );
};

export default LocationUpdates;
