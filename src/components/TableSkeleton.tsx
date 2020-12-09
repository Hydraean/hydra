import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const TableSkeleton = (props: any) => {
  const row = props.row
    ? Array.from(Array(props.row).keys())
    : Array.from(Array(5).keys());
  const col = Array.from(Array(props.col).keys());

  return (
    <>
      {row &&
        col &&
        row.map((r: any) => {
          return (
            <tr className="record-row py-0 my-0">
              {col.map((item: any) => {
                return (
                  <td>
                    <SkeletonTheme
                      color="rgba(255,255,255,0.1)"
                      highlightColor="rgba(255,255,255,0.2)"
                    >
                      <span style={{ opacity: "0.4" }}>
                        <Skeleton count={1} />
                      </span>
                    </SkeletonTheme>
                  </td>
                );
              })}
            </tr>
          );
        })}
    </>
  );
};

export default TableSkeleton;
