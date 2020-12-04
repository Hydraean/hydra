import React, { useState, useEffect } from "react";
import EventDetails from "./EventDetails";
import moment from "moment";
import { seCurrentLocation, soundNotif, setCurrentIncident } from "./utils";
import EventSkeleton from "./EventSkeleton";
import { API_URL, eventSpike } from "./utils";
import axios from "axios";
import nprogress from "nprogress";
import io from "socket.io-client";
import { Link } from "react-router-dom";
import Wave from "../assets/wave.png";

const socket = io(API_URL);

const EventThread = (props: any) => {
  const [details, setDetails] = useState(false);
  const [report, setReport] = useState(null);
  const [events, setEvents] = useState(null);

  const updateMapPoints = () => {
    let laterTrigger = document.getElementById(
      "incidents-btn"
    ) as HTMLButtonElement;

    if (laterTrigger) {
      laterTrigger.click();
    }
  };

  const global: any = window;

  socket.on("feedUpdate", (data) => {
    eventSpike();
    setEvents(data.data);
    global.incidents = data.data;
    updateMapPoints();
    soundNotif();

    let pending = data.data.filter((x) => x.status === "PENDING");

    if (pending.length === 0) {
      setDetails(null);
    }
  });

  // const fetchIncidents = () => {
  //   nprogress.set(0.4);
  //   axios.get(`${API_URL}/incidents`).then((res) => {
  //     setEvents(res.data);
  //     nprogress.done();

  //     setTimeout(() => {
  //       updateMapPoints();
  //     }, 1000);
  //   });
  // };

  useEffect(() => {
    nprogress.set(0.4);
    axios.get(`${API_URL}/incidents`).then((res) => {
      setEvents(res.data);
      nprogress.done();
      global.incidents = res.data;
      setTimeout(() => {
        updateMapPoints();
      }, 1000);
    });
  }, [global]);

  const toggleDetails = () => {
    setDetails(!details);
  };

  const viewIncident = (data: any) => {
    let mapBtn = document.getElementById("mapJump") as HTMLButtonElement;
    seCurrentLocation(data.coordinates);
    setReport(data);
    setCurrentIncident(data);

    toggleDetails();

    if (document.contains(mapBtn)) {
      mapBtn.click();

      let targetMarker = document.querySelector(`.inm-${data.id}`);
      if (document.getElementsByClassName("marker-selected").length !== 0) {
        document
          .querySelector(".marker-selected")
          .classList.remove("marker-selected");
        targetMarker.classList.add("marker-selected");
      } else {
        targetMarker.classList.add("marker-selected");
      }
    }
  };

  const showSidebar = () => {
    let sidebar = document.getElementById("event-thread") as HTMLElement;
    sidebar.style.display = "block";
  };

  const hideSidebar = () => {
    let sidebar = document.getElementById("event-thread") as HTMLElement;
    sidebar.style.display = "none";
  };

  return (
    <>
      <div className="sidebar-mobile-toggle" onClick={showSidebar}>
        <i className="la la-bars la-2x" />
      </div>
      <div className="event-thread slide-in-right" id="event-thread">
        {!details && (
          <>
            <div className="events-header">
              <span className="text-active">
                <i className="la la-bars mr-2" />
                Recent Events
              </span>
              <div>
                <Link to="">
                  <button className="btn btn-sm btn-dark">
                    <i className="mr-2 la la-ellipsis-h" />
                    View All
                  </button>
                </Link>
                <button
                  className="btn btn-sm btn-danger ml-1 mobile-thread-close"
                  onClick={hideSidebar}
                >
                  <i className="mr-2 la la-times" />
                  Close
                </button>
              </div>
            </div>

            {events && events.length > 0 ? (
              events
                .filter((x) => x.status === "PENDING")
                .map((event: any) => {
                  return (
                    <div
                      className="event-card"
                      onClick={() => {
                        viewIncident(event);
                      }}
                      id={`ec-${event.id}`}
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
                        <strong>Date Reported:</strong>{" "}
                        {moment(event.date_reported).format(
                          "MMM D, YYYY - h:mm:ss A"
                        )}
                      </span>
                      <span>
                        <strong>Duration</strong>{" "}
                        {moment(event.date_reported).fromNow()}
                      </span>
                    </div>
                  );
                })
            ) : (
              <EventSkeleton />
            )}
          </>
        )}

        {events && events.filter((x) => x.status === "PENDING").length === 0 && (
          <div className="empty-thread">
            <img src={Wave} alt="wave" className="fade-in-bottom dl-1" />
            <h1 className="fade-in-bottom dl-2">The sea is calm.</h1>
            <p className="fade-in-bottom dl-3">
              No pending reports at the moment.
            </p>

            <Link to={"/analytics"}>
              <button className="btn btn-primary fade-in-bottom dl-4">
                View History
              </button>
            </Link>
          </div>
        )}

        {details && <EventDetails goBack={toggleDetails} data={report} />}
      </div>
    </>
  );
};

export default EventThread;
