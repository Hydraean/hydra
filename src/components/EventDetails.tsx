import React from "react";

const EventDetails = (props: any) => {
  return (
    <>
      <div className="events-header">
        <span className="text-active">
          <i className="la la-bars mr-2" />
          Event Details
        </span>
        <button className="btn btn-sm btn-dark" onClick={props.goBack}>
          Go Back <i className="ml-2 la la-arrow-right" />
        </button>
      </div>

      <img
        src="https://pbs.twimg.com/media/D8j6VKcXoAAEfXK.jpg"
        className="img-fluid event-img"
        alt="Sample event"
      />
      <small className="text-warning">Blast Fishing</small>
      <h2 className="pb-2 text-white">Coron, Palawan</h2>

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

      <div className="event-card">
        <strong className="event-card-header">
          <i className="la la-map-marker mr-1 bg-primary" /> Geolocation Info
        </strong>
        <span>
          <strong>Long:</strong> 14.123123123
        </span>
        <span>
          <strong>Lat:</strong> 121.123123123
        </span>
      </div>

      <div className="d-flex justify-content-center mt-4">
        <button className="btn btn-success mr-4">
          <i className="la la-check mr-1" /> Respond
        </button>
        <button className="btn btn-warning">
          <i className="la la-close mr-1" />
          Dismiss
        </button>
      </div>
    </>
  );
};

export default EventDetails;
