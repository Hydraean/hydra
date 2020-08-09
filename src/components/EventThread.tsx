import React, { useState } from "react";
import EventDetails from "./EventDetails";
import moment from "moment";
import { seCurrentLocation } from "./utils";

const events = [
  {
    details: "Blast fishing in, Coron Palawan",
    type: "illegal_fishing",
    title: "Illegal fishing activity",
    name: "Blast Fishing",
    reportee: "Bryce Mercines",
    source_platform: "node",
    date: 1596952876467,
    coordinates: {
      long: 121.001433,
      lat: 14.507936
    }
  },
  {
    details: "Blast fishing in, Coron Palawan",
    type: "illegal_fishing",
    title: "Illegal fishing activity",
    name: "Blast Fishing",
    reportee: "Bantay Dagat",
    source_platform: "node",
    date: 1596952876467,
    coordinates: {
      long: 121.001433,
      lat: 14.507936
    }
  },
  {
    details: "Blast fishing in, Coron Palawan",
    type: "illegal_fishing",
    title: "Illegal fishing activity",
    name: "Blast Fishing",
    reportee: "Bantay Dagat",
    source_platform: "node",
    date: 1596952876467,
    coordinates: {
      long: 121.001433,
      lat: 14.507936
    }
  },
  {
    details: "Blast fishing in, Coron Palawan",
    type: "illegal_fishing",
    title: "Illegal fishing activity",
    name: "Blast Fishing",
    reportee: "Bantay Dagat",
    source_platform: "node",
    date: 1596952876467,
    coordinates: {
      long: 121.001433,
      lat: 14.507936
    }
  },
  {
    details: "Blast fishing in, Coron Palawan",
    type: "illegal_fishing",
    title: "Illegal fishing activity",
    name: "Blast Fishing",
    reportee: "Bantay Dagat",
    source_platform: "node",
    date: 1596952876467,
    coordinates: {
      long: 121.001433,
      lat: 14.507936
    }
  },
  {
    details: "Blast fishing in, Coron Palawan",
    type: "emergency",
    name: "EMERGENCY ALERT",
    title: "distress signal",
    reportee: "Bantay Dagat",
    source_platform: "node",
    date: 1596952876467,
    coordinates: {
      long: 121.001433,
      lat: 14.507936
    }
  },
  {
    details: "Blast fishing in, Coron Palawan",
    type: "emergency",
    name: "EMERGENCY ALERT",
    title: "distress signal",
    reportee: "Bantay Dagat",
    source_platform: "node",
    date: 1596952876467,
    coordinates: {
      long: 121.001433,
      lat: 14.507936
    }
  },

  {
    details: "Blast fishing in, Coron Palawan",
    type: "emergency",
    name: "EMERGENCY ALERT",
    title: "distress signal",
    reportee: "Bantay Dagat",
    source_platform: "node",
    date: 1596952876467,
    coordinates: {
      long: 121.001433,
      lat: 14.507936
    }
  }
];

const EventThread = (props: any) => {
  const [details, setDetails] = useState(false);
  const [report, setReport] = useState({});

  const toggleDetails = () => {
    setDetails(!details);
  };

  const viewIncident = (data: any) => {
    let mapBtn = document.getElementById("mapJump") as HTMLButtonElement;
    seCurrentLocation(data.coordinates);
    setReport(data);
    toggleDetails();
    mapBtn.click();
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
            <a href="/incidents" className="btn btn-sm btn-dark">
              <i className="mr-2 la la-ellipsis-h" />
              View All
            </a>
          </div>

          {events &&
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
                    <strong>DURATION</strong> 1 min
                  </span>
                </div>
              );
            })}
        </>
      )}

      {details && <EventDetails goBack={toggleDetails} data={report} />}
    </div>
  );
};

export default EventThread;
