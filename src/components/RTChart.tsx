import React, { useEffect } from "react";

const RTchart = () => {
  useEffect(() => {
    // let initChart = document.getElementById("rtchart") as HTMLElement;
    // initChart.click();
    let rtChart = document.querySelector(".rt-chart") as HTMLElement;
    rtChart.style.display = "flex";
  }, []);

  return <></>;
};

export default RTchart;
