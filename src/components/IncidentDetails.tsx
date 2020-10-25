import React, { useEffect, useState } from "react";
import moment from "moment";
import { googleMapsAPIKEY } from "./utils";
import axios from "axios";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import nprogress from "nprogress";

const IncidentDetails = (props: any) => {
  const event = props.data;
  const [locationData, setlocationData] = useState(null);

  // const fetchLocationDetails = () => {
  //   nprogress.start();
  //   axios
  //     .get(`https://maps.googleapis.com/maps/api/geocode/json?`, {
  //       params: {
  //         latlng: `${event.coordinates.lat},${event.coordinates.long}`,
  //         key: googleMapsAPIKEY,
  //       },
  //     })
  //     .then((res) => {
  //       setlocationData(res.data);
  //       nprogress.done();
  //     });
  // };

  useEffect(() => {
    if (props.data) {
      nprogress.start();
      axios
        .get(`https://maps.googleapis.com/maps/api/geocode/json?`, {
          params: {
            latlng: `${props.data.coordinates.lat},${props.data.coordinates.long}`,
            key: googleMapsAPIKEY,
          },
        })
        .then((res) => {
          setlocationData(res.data);
          nprogress.done();
        });
    }
  }, [props]);

  return (
    <div className="event-thread slide-in-right">
      <>
        <div className="events-header">
          <span className="text-active">
            <i className="la la-exclamation-circle mr-2" />
            Incident Details
          </span>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => {
              props.setData(null);
            }}
          >
            <i className="mr-1 la la-times-circle" />
            Close
          </button>
        </div>

        <div className="fade-in">
          {event.type === "illegal_fishing" && (
            <div className="event-alert">
              <div className="pulse-alert p-2">
                <i className="la la-fish la-4x" />
              </div>
            </div>
          )}

          {event.type === "emergency" && (
            <div className="distress-alert">
              <div className="pulse-alert p-2">
                <i className="la la-bolt la-4x" />
              </div>
            </div>
          )}

          <strong className="text-warning">{event.name}</strong>
          <h2 className="pb-2 text-white">
            {locationData ? (
              locationData.plus_code.compound_code
            ) : (
              <SkeletonTheme color="#202020" highlightColor="#333">
                <p>
                  <Skeleton count={3} />
                </p>
              </SkeletonTheme>
            )}
          </h2>

          {event && (
            <div className="event-card">
              <strong
                className={`event-card-header ${
                  event.type === "emergency" ? "distress" : ""
                }`}
              >
                <i className="la la-exclamation-circle mr-1 text-red" />{" "}
                {event.title}
              </strong>
              {event.details.trim() !== "" ? (
                <span>
                  <strong>Details:</strong>{" "}
                  <span className="event-details">{event.details}</span>
                </span>
              ) : (
                ""
              )}
              <span>
                <strong>Reportee:</strong> {event.reportee}
              </span>
              <span>
                <strong>Date & Time:</strong>{" "}
                {moment(event.date).format("MMM D, YYYY - h:mm:ss A")}
              </span>
              <span>
                <strong>Duration</strong> {moment(event.date).fromNow()}
              </span>
            </div>
          )}

          <div className="event-card">
            <strong className="event-card-header">
              <i className="la la-map-marker mr-1 bg-primary" /> Geolocation
              Info
            </strong>
            <span>
              <strong>Long:</strong> {event.coordinates.long}
            </span>
            <span>
              <strong>Lat:</strong> {event.coordinates.lat}
            </span>
          </div>

          <div className="event-card">
            <strong className="event-card-header">
              <i
                className={`la la-bullseye mr-1 ${
                  event.status === "PENDING" ? "bg-warning" : "bg-success"
                }`}
              />{" "}
              Report Status
            </strong>

            <div className="d-flex justify-content-center py-3">
              <div className={`status-banner ${event.status}`}>
                {event.status === "PENDING" ? (
                  <i className="la la-exclamation-circle" />
                ) : (
                  <i className="la la-check-circle" />
                )}{" "}
                {event.status}
              </div>
            </div>

            {event.status === "PENDING" ? (
              <span className="text-center mb-2">
                This is pending for confirmation, and might require further
                investigation.
              </span>
            ) : (
              <span className="text-center mb-2">
                This report has been confirmed by:{" "}
                <b className="text-active">{event.verifier}</b>
              </span>
            )}
          </div>
        </div>
      </>
    </div>
  );
};

export default IncidentDetails;
