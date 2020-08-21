import React, { useState, useEffect } from "react";
import EventDetails from "./EventDetails";
import moment from "moment";
import { seCurrentLocation } from "./utils";
import EventSkeleton from "./EventSkeleton";
import { API_URL, eventSpike } from "./utils";
import axios from "axios";
import nprogress from "nprogress";
import io from "socket.io-client";
import { Link } from "react-router-dom";

const socket = io(API_URL);

const EventThread = (props: any) => {
  const [details, setDetails] = useState(false);
  const [report, setReport] = useState(null);
  const [events, setEvents] = useState(null);

  socket.on("feedUpdate", (data) => {
    eventSpike();
    setEvents(data.data);
  });

  const fetchIncidents = () => {
    nprogress.set(0.4);
    axios.get(`${API_URL}/incidents`).then((res) => {
      setEvents(res.data);
      nprogress.done();
    });
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  const toggleDetails = () => {
    setDetails(!details);
  };

  const viewIncident = (data: any) => {
    let mapBtn = document.getElementById("mapJump") as HTMLButtonElement;
    seCurrentLocation(data.coordinates);
    setReport(data);
    toggleDetails();

    // mapBtn.click();
  };

  return (
    <div className="event-thread">
      {!details && (
        <>
          <div className="events-header">
            <span className="text-active">
              <i className="la la-bars mr-2" />
              Recent Events
            </span>
            <Link to="/incidents">
              <button className="btn btn-sm btn-dark">
                <i className="mr-2 la la-ellipsis-h" />
                View All
              </button>
            </Link>
          </div>

          {events ? (
            events.map((event: any) => {
              return (
                <div
                  className="event-card"
                  onClick={() => {
                    viewIncident(event);
                  }}
                >
                  <strong
                    className={`event-card-header ${
                      event.type === "emergency" ? "distress" : ""
                    }`}
                  >
                    <i
                      className={`la ${
                        event.type === "emergency" ? "la-bolt" : "la-fish"
                      } mr-1 text-red`}
                    />{" "}
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
              );
            })
          ) : (
            <EventSkeleton />
          )}
        </>
      )}
      {details && <EventDetails goBack={toggleDetails} data={report} />}
    </div>
  );
};

export default EventThread;
