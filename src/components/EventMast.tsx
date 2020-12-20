import React from "react";

const EventMast = (props: any) => {
  const event = props.eventType;

  return (
    <>
      {event === "illegal_fishing" && (
        <div className="event-mast event-alert">
          <div className="pulse-alert mast">
            <i className="la la-fish la-4x" />
          </div>
        </div>
      )}

      {event === "emergency" && (
        <div className="event-mast distress-alert">
          <div className="pulse-alert mast">
            <i className="la la-bolt la-4x" />
          </div>
        </div>
      )}
    </>
  );
};

export default EventMast;
