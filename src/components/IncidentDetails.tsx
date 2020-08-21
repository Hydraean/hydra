import React from "react";
import moment from "moment";

const IncidentDetails = (props: any) => {
  const event = props.data;

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
              <div className="pulse-alert">
                <i className="la la-fish la-5x" />
              </div>
            </div>
          )}

          {event.type === "emergency" && (
            <div className="distress-alert">
              <div className="pulse-alert">
                <i className="la la-bolt la-5x" />
              </div>
            </div>
          )}

          <strong className="text-warning">{event.name}</strong>
          <h2 className="pb-2 text-white">{event.title}</h2>

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

          <div className="d-flex justify-content-center mt-4">
            <div className={`status-banner ${event.status}`}>
              {event.status === "PENDING" ? (
                <i className="la la-exclamation-circle" />
              ) : (
                <i className="la la-check-circle" />
              )}{" "}
              {event.status}
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default IncidentDetails;