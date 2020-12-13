import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const AreaChartSkeleton = () => {
  return (
    <div className="area-skeleton-card">
     <SkeletonTheme
              color="rgba(255,255,255,0.1)"
              highlightColor="rgba(255,255,255,0.2)"
            >
              <strong className="value-loader" style={{ opacity: "0.4" }}>
                <Skeleton count={6} />
              </strong>
            </SkeletonTheme>
    </div>
  );
};

export default AreaChartSkeleton;
