import React from "react";
import { API_URL } from "./utils";

const FmaCard = (props: any) => {
  return (
    <div className="fma-card">
      <img src={`${API_URL}/${props.data}.png`} alt="fma card" />

      <div className="event-details-card mt-2">
        <strong className="event-card-header">
          <i className="la la-map-marker mr-1 bg-primary" />
          <span className="text-active">[{props.data}] </span> {props.location}
        </strong>
        <span>
          This is an overview of bounds covered by this Fishery Management Area.
        </span>
      </div>
    </div>
  );
};

export default FmaCard;
