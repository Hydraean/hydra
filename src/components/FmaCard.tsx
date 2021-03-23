import React from "react";

const FmaCard = (props: any) => {
  return (
    <div className="fma-card">
      <img
        src="https://cff2.earth.com/uploads/2017/02/02174839/New-app-helps-fisherman-seek-and-sell-their-catch-.jpg"
        alt="fma card"
      />

      <div className="event-details-card mt-2">
        <strong className="event-card-header">
          <i className="la la-map-marker mr-1 bg-primary" /> MANILA BAY [FMA-07]
        </strong>
        <span>
          Lorem ipsum dolor simetc Lorem ipsum dolor simetc Lorem ipsum dolor
          simetc Lorem ipsum dolor simetc Lorem ipsum dolor simetc
        </span>
      </div>
    </div>
  );
};

export default FmaCard;
