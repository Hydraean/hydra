import React from "react";
import EventDetails from "./EventDetails";

const EventThread = (props: any) => {
  return (
    <div className="event-thread">
      {/* <div className="events-header">
        <span className="text-active">
          <i className="la la-bars mr-2" />
          Recent Events
        </span>
        <a href="/incidents" className="btn btn-sm btn-dark">
          <i className="mr-2 la la-ellipsis-h" />
          View All
        </a>
      </div>

      <div className="event-card">
        <strong className="event-card-header">
          <i className="la la-exclamation-circle mr-1 text-red" /> Illegal
          Fishing Activity
        </strong>
        <span>
          <strong>Details:</strong> Blast fishing in, Coron Palawan
        </span>
        <span>
          <strong>Reportee:</strong> Bantay Dagat
        </span>
        <span>
          <strong>Date & Time:</strong> 9/23/2020, 10:30 AM
        </span>
        <span>
          <strong>DURATION</strong> 1 min
        </span>
      </div>

      <div className="event-card active">
        <strong className="event-card-header">
          <i className="la la-exclamation-circle mr-1 text-red" /> Illegal
          Fishing Activity
        </strong>
        <span>
          <strong>Details:</strong> Blast fishing in, Coron Palawan
        </span>
        <span>
          <strong>Reportee:</strong> Bantay Dagat
        </span>
        <span>
          <strong>Date & Time:</strong> 9/23/2020, 10:30 AM
        </span>
        <span>
          <strong>DURATION</strong> 1 min
        </span>
      </div>

      <div className="event-card">
        <strong className="event-card-header distress">
          <i className="la la-exclamation-circle mr-1 text-red" /> DISTRESS CALL
        </strong>
        <span>
          <strong>Details:</strong> Blast fishing in, Coron Palawan
        </span>
        <span>
          <strong>Reportee:</strong> Bantay Dagat
        </span>
        <span>
          <strong>Date & Time:</strong> 9/23/2020, 10:30 AM
        </span>
        <span>
          <strong>DURATION</strong> 1 min
        </span>
      </div> */}

      <EventDetails />
    </div>
  );
};

export default EventThread;
