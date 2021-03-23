import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import {
  API_URL,
  Toast,
  googleMapsAPIKEY,
  getCurrentLocation,
  clearEventLinePath,
} from "./utils";
import nprogress from "nprogress";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import LocationUpdates from "./LocationUpdates";
import EventMast from "./EventMast";
import FmaCard from "./FmaCard";

const EventDetails = (props: any) => {
  const event = props.data;

  const [verfiying, setVerify] = useState(false);
  const [locationData, setlocationData] = useState(null);

  const verifyReport = () => {
    let reportID = event.id;
    nprogress.start();
    setVerify(true);
    axios({
      method: "post",
      url: `${API_URL}/report/confirm`,
      data: {
        id: reportID,
      },
    })
      .then((res) => {
        if (res.data.message === "Successfully confirmed report") {
          setVerify(false);
          clearEventLinePath();
          Toast("Report Confirmed!", "/incidents");
          props.goBack();
          nprogress.done();

          // remove html icon marker
          document.querySelector(`.inm-${event.id}`).remove();
        }
      })
      .catch((error) => {
        nprogress.done();
        setVerify(false);
      });
  };

  const fetchLocationDetails = () => {
    let loc = getCurrentLocation();
    axios
      .get(`https://maps.googleapis.com/maps/api/geocode/json?`, {
        params: {
          latlng: `${loc.lat},${loc.long}`,
          key: googleMapsAPIKEY,
        },
      })
      .then((res) => {
        setlocationData(res.data);
      });
  };

  const cancelEventReview = () => {
    clearEventLinePath();
    props.goBack();
  };

  useEffect(() => {
    fetchLocationDetails();
  }, []);

  return (
    <>
      <div className="fade-in">
        <div className="events-header">
          <span className="text-active">
            <i className="la la-bars mr-2" />
            Event Details
          </span>
          <button className="btn btn-sm btn-dark" onClick={cancelEventReview}>
            Go Back <i className="ml-2 la la-arrow-right" />
          </button>
        </div>

        <EventMast eventType={event.type} />

        <strong className="text-warning">{event.title}</strong>
        <h2 className="pb-2 text-white">
          {locationData ? (
            <>
              {event.fma && <span className="text-active">[{event.fma}]</span>}{" "}
              {locationData.plus_code.compound_code}
            </>
          ) : (
            <SkeletonTheme color="#202020" highlightColor="#333">
              <p>
                <Skeleton count={3} />
              </p>
            </SkeletonTheme>
          )}
        </h2>

        {event && (
          <div className="event-details-card">
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
              {moment(event.date_reported).format("MMM D, YYYY - h:mm:ss A")}
            </span>
            <span>
              <strong>Duration</strong> {moment(event.date_reported).fromNow()}
            </span>
          </div>
        )}

        <div className="event-details-card">
          <strong className="event-card-header">
            <i className="la la-map-marker mr-1 bg-primary" /> Geolocation Info
          </strong>
          <span>
            <strong>Longitude:</strong> {event.coordinates.long}
          </span>
          <span>
            <strong>Latitude:</strong> {event.coordinates.lat}
          </span>
        </div>

        <FmaCard />

        {event.updates && <LocationUpdates data={event.updates} />}
      </div>

      <div className="end-report-card">
        <span>
          <i className="la la-list" /> End of report
        </span>
      </div>

      <div className="event-action-buttons fade-in-bottom dl-2">
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-success mr-4"
            onClick={verifyReport}
            disabled={verfiying}
          >
            <i className="la la-check mr-1" /> Confirm
          </button>
          <button
            className="btn btn-warning"
            id="r-cancel"
            onClick={cancelEventReview}
          >
            <i className="la la-close mr-1" />
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default EventDetails;
