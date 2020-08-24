import React, { useEffect, useState } from "react";
import "../styles/Landing.scss";
import Footer from "./Footer";
import { loadChart } from "./utils";
import swal from "sweetalert2";
import axios from "axios";

const reportTypes = [
  {
    name: "Blast Fishing",
    type: "illegal_fishing",
  },
  {
    name: "Bottom Trawling",
    type: "illegal_fishing",
  },
  {
    name: "Cyanide Fishing",
    type: "illegal_fishing",
  },
  {
    name: "Oil Spill",
    type: "emergency",
  },
  {
    name: "Maritime Incident",
    type: "emergency",
  },
  {
    name: "Other",
    type: "emergency",
  },
];

const DeviceDemo = (props: any) => {
  const [loc, setLoc] = useState(null);

  useEffect(() => {
    loadChart();
  }, []);

  const setPosition = (position) => {
    let newLocation = {
      lat: position.coords.latitude,
      long: position.coords.longitude,
    };

    setLoc(newLocation);

    swal.fire({
      title: "Success",
      text: "location set successfully!",
      icon: "success",
      showCancelButton: false,
      showConfirmButton: false,
      timer: 1200,
    });
  };

  const displayError = (error) => {
    var errors = {
      1: "Permission denied",
      2: "Position unavailable",
      3: "Request timeout",
    };
    swal.fire("Error!", `Geo Location API : ${errors[error.code]}`, "error");
  };

  const requestlocation = () => {
    swal.fire({
      title: "Requesting",
      text:
        "kindly accept to location prompt to pin down your current location.",
      icon: "info",
      showConfirmButton: false,
      showCancelButton: true,
      allowOutsideClick: false,
    });

    swal.showLoading();

    if (navigator.geolocation) {
      var timeoutVal = 10 * 1000 * 1000;
      navigator.geolocation.getCurrentPosition(setPosition, displayError, {
        enableHighAccuracy: true,
        timeout: timeoutVal,
        maximumAge: 0,
      });
    } else {
      swal.fire("Error", "GPS is not supported for your device", "error");
    }
  };

  const [reportType, setreportType] = useState({ name: "", type: "" });

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
                  {loc ? (
                    <p>
                      Latitude: {loc.lat}, Longitude: {loc.long}
                    </p>
                  ) : (
                    <button
                      className="btn btn-dark btn-icon"
                      onClick={requestlocation}
                    >
                      <i className="la la-map-marker mr-2" />
                      Set Location
                    </button>
                  )}
                </div>
              </div>
              <div className="card-body px-lg-5 py-lg-3">
                <div className="text-center mb-4">
                  <strong>Specify Report Types</strong>
                </div>
                <ul className="incident-list">
                  {reportTypes.map((item: any, index: number) => {
                    return (
                      <li
                        key={index}
                        className={`${
                          reportType.name === item.name ? "selected" : ""
                        }`}
                        onClick={() => {
                          setreportType(item);
                        }}
                      >
                        <strong>
                          <i
                            className={`la la-${
                              item.type === "emergency" ? "bolt" : "fish"
                            } mr-2`}
                          />{" "}
                          {item.name}
                        </strong>
                      </li>
                    );
                  })}
                </ul>
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
                  <div className="text-center mb-4">
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
