import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const EventSkeleton = () => {
  return (
    <>
      <div className="event-card">
        <SkeletonTheme color="#202020" highlightColor="#333">
          <p>
            <Skeleton count={4} />
          </p>
        </SkeletonTheme>
      </div>
      <div className="event-card">
        <SkeletonTheme color="#202020" highlightColor="#333">
          <p>
            <Skeleton count={4} />
          </p>
        </SkeletonTheme>
      </div>
      <div className="event-card">
        <SkeletonTheme color="#202020" highlightColor="#333">
          <p>
            <Skeleton count={4} />
          </p>
        </SkeletonTheme>
      </div>
      <div className="event-card">
        <SkeletonTheme color="#202020" highlightColor="#333">
          <p>
            <Skeleton count={4} />
          </p>
        </SkeletonTheme>
      </div>
      <div className="event-card">
        <SkeletonTheme color="#202020" highlightColor="#333">
          <p>
            <Skeleton count={4} />
          </p>
        </SkeletonTheme>
      </div>
      <div className="event-card">
        <SkeletonTheme color="#202020" highlightColor="#333">
          <p>
            <Skeleton count={4} />
          </p>
        </SkeletonTheme>
      </div>
      <div className="event-card">
        <SkeletonTheme color="#202020" highlightColor="#333">
          <p>
            <Skeleton count={4} />
          </p>
        </SkeletonTheme>
      </div>
    </>
  );
};

export default EventSkeleton;
