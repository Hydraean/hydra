import React, { useEffect } from "react";
import "../styles/Landing.scss";
import Footer from "./Footer";
import Button from "./Button";
import { loadChart } from "./utils";

const DeviceDemo = (props: any) => {
  useEffect(() => {
    loadChart();
  }, []);

  return (
    <div className="landing-page">
      {/* Main content */}
      <div className="main-content">
        {/* Header */}
        <div className="header bg-gradient-primary pt-5 pb-7 py-lg-8 pt-lg-9">
          <div className="container">
            <div className="header-body text-center mb-7">
              <div className="row justify-content-center">
                <div className="col-xl-5 col-lg-6 col-md-8 px-5">
                  <img src="/hlogo.png" alt="h-logo" className="landing-logo" />
                  <h1 className="text-white">Seantinel</h1>
                  <p className="text-lead text-active">Report Demo</p>
                </div>
              </div>
            </div>
          </div>
          <div className="separator separator-bottom separator-skew zindex-100">
            <svg
              x={0}
              y={0}
              viewBox="0 0 2560 100"
              preserveAspectRatio="none"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon
                className="fill-default"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="mb-7">
          <div className="row justify-content-center">
            <div className="card">
              <button className="btn btn-primary btn-lg">Send Report</button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DeviceDemo;
