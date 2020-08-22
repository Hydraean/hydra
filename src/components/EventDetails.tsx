import React from "react";
import moment from "moment";
import axios from "axios";
import { API_URL, Toast } from "./utils";

const EventDetails = (props: any) => {
  const event = props.data;

  const verifyReport = () => {
    let reportID = event.id;

    axios({
      method: "post",
      url: `${API_URL}/report/confirm`,
      data: {
        id: reportID,
      },
    })
      .then((res) => {
        if (res.data.message === "Successfully confirmed report") {
          Toast("Report Confirmed!", "/incidents");
          props.goBack();
        }
      })
      .catch((error) => console.log(error.response.data));
  };

  return (
    <div className="fade-in">
      <div className="events-header">
        <span className="text-active">
          <i className="la la-bars mr-2" />
          Event Details
        </span>
        <button className="btn btn-sm btn-dark" onClick={props.goBack}>
          Go Back <i className="ml-2 la la-arrow-right" />
        </button>
      </div>

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
          <i className="la la-map-marker mr-1 bg-primary" /> Geolocation Info
        </strong>
        <span>
          <strong>Long:</strong> {event.coordinates.long}
        </span>
        <span>
          <strong>Lat:</strong> {event.coordinates.lat}
        </span>
      </div>

      <div className="d-flex justify-content-center mt-4">
        <button className="btn btn-success mr-4" onClick={verifyReport}>
          <i className="la la-check mr-1" /> Verify
        </button>
        <button className="btn btn-warning" onClick={props.goBack}>
          <i className="la la-close mr-1" />
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EventDetails;
