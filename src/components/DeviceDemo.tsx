import React, { useEffect, useState } from "react";
import "../styles/Landing.scss";
import Footer from "./Footer";
import { loadChart, guid, API_URL } from "./utils";
import swal from "sweetalert2";
import axios from "axios";
import PulseLoader from "./PulseLoader";
import { profile } from "console";

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

    if (!localStorage.hnid) {
      localStorage.hnid = `HN-${guid()}`;
    }
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
  const [transmitting, setTransmit] = useState(false);
  const [profile, setProfile] = useState(null);

  const submitReport = () => {
    if (!loc) {
      swal.fire("Error", "You need to set your location!", "error");
    } else {
      if (reportType.name === "") {
        swal.fire("Error", "You need select a report type!", "error");
      } else {
        let username = document.getElementById("rname") as HTMLInputElement;
        let address = document.getElementById("raddr") as HTMLInputElement;
        let details = document.getElementById("rdetails") as HTMLInputElement;

        if (
          username.value.trim() === "" ||
          address.value.trim() === "" ||
          details.value.trim() === ""
        ) {
          swal.fire("Error", "Complete report details to continue", "error");
        } else {
          let payload = {
            details: details.value,
            device_id: localStorage.hnid,
            type: reportType.type,
            name: reportType.name,
            title: reportType.name,
            address: address.value,
            reportee: username.value,
            coordinates: {
              long: loc.long,
              lat: loc.lat,
            },
          };

          axios({
            method: "post",
            url: `${API_URL}/add/report`,
            data: payload,
          }).then((res) => {
            if (res.data.status === "ok") {
              swal.showLoading();
              swal.fire(
                "Report Sent!",
                "your report has been sent.",
                "success"
              );
            }
          });
        }
      }
    }
  };

  const setupProfile = () => {
    swal
      .mixin({
        input: "text",
        confirmButtonText: "Next &rarr;",
        showCancelButton: true,
        progressSteps: ["1", "2", "3"],
      })
      .queue([
        {
          title: "Profile Setup: Your Full Name",
          text: "Please Provide your full name.",
        },
        {
          title: "Profile Setup: Your Address",
          text: "Please Provide your Adress / City / Municipality",
        },

        {
          title: "Profile Setup: Position",
          text: "example: Fisherman, Bantay Dagat, ...etc.",
        },
      ])
      .then((result: any) => {
        if (result.value) {
          let profileData = {
            name: result.value[0],
            address: result.value[1],
            postion: result.value[2],
          };

          let emptyCheck = false;

          result.value.forEach((x) => {
            if (x.trim() === "") {
              emptyCheck = true;
            }
          });

          if (!localStorage.reportProfile) {
            if (!emptyCheck) {
              localStorage.reportProfile = JSON.stringify(profileData);
              swal.fire("Success", "you have create an account.", "success");
              setProfile(profileData);
            } else {
              swal.fire(
                "Error",
                "you need to complete the form to create an account",
                "error"
              );
            }
          }
        }
      });
  };

  return (
    <div className="landing-page">
      {/* Main content */}
      <div className="main-content">
        {/* Header */}
        <div className="header bg-gradient-primary pt-5 pb-0 py-lg-8 pt-lg-9">
          <div className="container">
            <div className="header-body text-center mb-7">
              <div className="row justify-content-center">
                <div className="col-xl-5 col-lg-6 col-md-8 px-5">
                  <img src="/hlogo.png" alt="h-logo" className="landing-logo" />
                  <h1 className="text-white">Seantinel</h1>
                  <p className="text-lead text-active">Reporting Interface</p>
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

      <div className="container pb-5" style={{ marginTop: "-200px" }}>
        {/* Table */}
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <div className="card bg-secondary border-0">
              <div className="card-header bg-transparent pb-5">
                {transmitting && (
                  <div className="report-card-alert fade-in-bottom">
                    <PulseLoader />
                    <p>Transmitting Report...</p>
                  </div>
                )}

                <div className="text-muted text-center mt-2 mb-4">
                  <small>
                    Activate your location to proceed on using this feature.
                  </small>
                </div>
                <div className="text-center">
                  {loc ? (
                    <p>
                      <strong>Latitude: {loc.lat}</strong>,
                      <br />
                      <strong>Longitude: {loc.long}</strong>
                    </p>
                  ) : (
                    <div>
                      {/* <button
                        className="btn btn-dark btn-icon"
                        onClick={requestlocation}
                      >
                        <i className="la la-map-marker mr-2" />
                        Set Location
                      </button> */}

                      <button
                        className="btn btn-default btn-icon"
                        onClick={setupProfile}
                      >
                        <i className="la la-user mr-2" />
                        Edit Profile
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="card-body px-lg-5 py-lg-3">
                <div className="text-center mb-4">
                  <strong>Specify Report Type: </strong>
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
                <form>
                  {/* <div className="form-group">
                    <div className="input-group input-group-merge input-group-alternative mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="la la-user" />
                        </span>
                      </div>
                      <input
                        id="rname"
                        className="form-control"
                        placeholder="Name"
                        type="text"
                      />
                    </div>
                  </div> */}
                  {/* <div className="form-group">
                    <div className="input-group input-group-merge input-group-alternative mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="la la-map" />
                        </span>
                      </div>
                      <input
                        id="raddr"
                        className="form-control"
                        placeholder="FMA Area / Location"
                        type="text"
                      />
                    </div>
                  </div> */}
                  <div className="form-group">
                    <div className="input-group input-group-merge input-group-alternative">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="la la-list" />
                        </span>
                      </div>
                      <textarea
                        id="rdetails"
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
                    <button
                      type="button"
                      className="btn btn-primary mt-4"
                      onClick={submitReport}
                    >
                      <i className="la la-send mr-2" /> Start Report
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
