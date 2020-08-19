import React, { useEffect } from "react";

const RTchart = () => {
  useEffect(() => {
    let initChart = document.getElementById("rtchart") as HTMLElement;
    initChart.click();
  }, []);

  return (
    <div className="rt-chart">
      <canvas id="chart" width="400" height="70"></canvas>
    </div>
  );
};

export default RTchart;
