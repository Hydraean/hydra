import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const StatCards = (props: any) => {
  const events = props.data;
  return (
    <div className="stats-row col-md-11" id="stat-cards">
      <div className="stats-card fade-in-bottom dl-1">
        <i className="la la-fish la-5x text-warning" />
        <h1>
          <small>ILLEGAL FISHING</small>
          <br />
          <span>
            {events &&
              events.filter((x) => x.type === "illegal_fishing").length}
          </span>
          {!events && (
            <SkeletonTheme
              color="rgba(255,255,255,0.1)"
              highlightColor="rgba(255,255,255,0.2)"
            >
              <strong className="value-loader" style={{ opacity: "0.4" }}>
                <Skeleton count={1} />
              </strong>
            </SkeletonTheme>
          )}
        </h1>
      </div>

      <div className="stats-card fade-in-bottom dl-2">
        <i className="la la-bolt text-danger la-5x" />
        <h1>
          <small>EMERGENCY</small>
          <br />
          <span>
            {" "}
            {events && events.filter((x) => x.type === "emergency").length}
          </span>
          {!events && (
            <SkeletonTheme
              color="rgba(255,255,255,0.1)"
              highlightColor="rgba(255,255,255,0.2)"
            >
              <strong className="value-loader" style={{ opacity: "0.4" }}>
                <Skeleton count={1} />
              </strong>
            </SkeletonTheme>
          )}
        </h1>
      </div>

      <div className="stats-card fade-in-bottom dl-3">
        <i className="la la-check-circle text-success la-5x" />
        <h1>
          <small>CONFIRMED</small>
          <br />
          <span>
            {events && events.filter((x) => x.status === "CONFIRMED").length}
          </span>
          {!events && (
            <SkeletonTheme
              color="rgba(255,255,255,0.1)"
              highlightColor="rgba(255,255,255,0.2)"
            >
              <strong className="value-loader" style={{ opacity: "0.4" }}>
                <Skeleton count={1} />
              </strong>
            </SkeletonTheme>
          )}
        </h1>
      </div>

      <div className="stats-card fade-in-bottom dl-4">
        <i className="la la-exclamation-circle text-yellow la-5x" />
        <h1>
          <small>PENDING</small>
          <br />
          <span>
            {events && events.filter((x) => x.status === "PENDING").length}
          </span>
          {!events && (
            <SkeletonTheme
              color="rgba(255,255,255,0.1)"
              highlightColor="rgba(255,255,255,0.2)"
            >
              <strong className="value-loader" style={{ opacity: "0.4" }}>
                <Skeleton count={1} />
              </strong>
            </SkeletonTheme>
          )}
        </h1>
      </div>
    </div>
  );
};

export default StatCards;
