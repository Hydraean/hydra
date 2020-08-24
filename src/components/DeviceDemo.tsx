import React, { useEffect } from "react";
import "../styles/Landing.scss";
import Footer from "./Footer";
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
                  <p className="text-lead text-active">
                    Reporting Interface Demo
                  </p>
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

      <div className="container mt--8 pb-5">
        {/* Table */}
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <div className="card bg-secondary border-0">
              <div className="card-header bg-transparent pb-5">
                <div className="text-muted text-center mt-2 mb-4">
                  <small>
                    Set your location, and complete the form before submitting
                  </small>
                </div>
                <div className="text-center">
                  <button className="btn btn-dark btn-icon">
                    <i className="la la-map-marker mr-2" />
                    Set Location
                  </button>
                </div>
              </div>
              <div className="card-body px-lg-5 py-lg-5">
                <div className="text-center mb-4">
                  <strong>Report Details:</strong>
                </div>
                <form role="form">
                  <div className="form-group">
                    <div className="input-group input-group-merge input-group-alternative mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="la la-user" />
                        </span>
                      </div>
                      <input
                        className="form-control"
                        placeholder="Name"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group input-group-merge input-group-alternative mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="la la-map" />
                        </span>
                      </div>
                      <input
                        className="form-control"
                        placeholder="FMA Area / Location"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group input-group-merge input-group-alternative">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="la la-list" />
                        </span>
                      </div>
                      <textarea
                        className="form-control"
                        placeholder="Report Details"
                      />
                    </div>
                  </div>

                  <div className="row my-4">
                    <div className="col-12">
                      <div className="text-center">
                        <label>
                          <small className="text-muted">
                            <i className="la la-exclamation-circle text-danger" />{" "}
                            For Demonstration purposes only. All provided
                            information is this form will be deleted after a
                            period of time.
                          </small>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <button type="button" className="btn btn-primary mt-4">
                      <i className="la la-send mr-2" /> Submit Report
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DeviceDemo;
