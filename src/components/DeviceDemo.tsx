import React, { useEffect, useState } from "react";
import "../styles/Landing.scss";
import Footer from "./Footer";
import { loadChart, guid, API_URL } from "./utils";
import swal from "sweetalert2";
import axios from "axios";
import PulseLoader from "./PulseLoader";

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
  useEffect(() => {
    loadChart();

    if (!localStorage.hnid) {
      localStorage.hnid = `HN-${guid()}`;
    }

    if (localStorage.reportProfile) {
      try {
        let reportee_profile = JSON.parse(localStorage.reportProfile);
        setProfile(reportee_profile);
      } catch {
        console.log("Reportee profile error");
      }
    } else {
      setupProfile();
    }
  }, []);

  const setPosition = (position) => {
    let newLocation = {
      lat: position.coords.latitude,
      long: position.coords.longitude,
    };

    if (!newLocation) {
      swal.fire("Error", "You need to set your location!", "error");
    } else {
      if (reportType.name === "") {
        swal.fire("Error", "You need select a report type!", "error");
      } else {
        let details = document.getElementById("rdetails") as HTMLInputElement;

        if (
          (profile && profile.name.trim() === "") ||
          profile.address.trim() === "" ||
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
            address: profile.address.value,
            reportee: profile.name.value,
            coordinates: {
              long: newLocation.long,
              lat: newLocation.lat,
            },
          };

          // console.log(payload);

          axios({
            method: "post",
            url: `${API_URL}/add/report`,
            data: payload,
          }).then((res) => {
            if (res.data.status === "ok") {
              // swal.showLoading();
              // swal.fire(
              //   "Report Sent!",
              //   "your report has been sent.",
              //   "success"
              // );
            }
          });
        }
      }
    }
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

  const setupProfile = () => {
    swal
      .mixin({
        input: "text",
        confirmButtonText: "Next &rarr;",
        showCancelButton: true,
        progressSteps: ["1", "2", "3"],
        allowOutsideClick: false,
      })
      .queue([
        {
          title: "Profile Setup: Your Full Name",
          text: "Please Provide your full name.",
        },
        {
          title: "Profile Setup: Your Address",
          text: "Please Provide your Address / City / Municipality",
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
            position: result.value[2],
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
              swal.fire("Success", "you have created an account.", "success");
              setProfile(profileData);
            } else {
              swal.fire(
                "Error",
                "you need to complete the form to create an account",
                "error"
              );
            }
          } else {
            profileData = {
              name:
                result.value[0].trim() !== "" ? result.value[0] : profile.name,
              address:
                result.value[1].trim() !== ""
                  ? result.value[1]
                  : profile.address,
              position:
                result.value[2].trim() !== ""
                  ? result.value[2]
                  : profile.position,
            };
            localStorage.reportProfile = JSON.stringify(profileData);
            setProfile(profileData);
          }
        }
      });
  };

  const startReport = () => {
    let details = document.getElementById("rdetails") as HTMLInputElement;

    if (reportType.name !== "" && profile && details.value.trim() !== "") {
      setTransmit(true);

      setInterval(() => {
        requestlocation();
      }, 4000);
    } else {
      swal.fire("Error!", `Please complete the form to continue.`, "error");
    }
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

      <div className="container" style={{ marginTop: "-200px" }}>
        {/* Table */}
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <div className="card bg-secondary border-0">
              <div className="card-header bg-transparent pb-5">
                {transmitting && (
                  <div className="report-card-alert fade-in-bottom">
                    <PulseLoader />
                    <div>
                      <p>Transmitting Report...</p>
                      <small>
                        {reportType.name} | {reportType.type}
                      </small>
                    </div>
                  </div>
                )}

                {profile && (
                  <div className="reportee-card">
                    <i className="la la-user-circle la-4x"></i>
                    <div className="user-info">
                      <span>{profile.name}</span>
                      <small>{profile.position}</small>
                      <small>{profile.address}</small>
                    </div>
                  </div>
                )}

                <div className="text-muted text-center mt-2 mb-4">
                  <small>
                    Activate your location to proceed on using this feature.
                  </small>
                </div>
                <div className="text-center">
                  <div>
                    <div className={`${transmitting && "d-none"}`}>
                      <button
                        className="btn btn-default btn-icon"
                        onClick={setupProfile}
                      >
                        <i className="la la-user mr-2" />
                        Edit Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body px-lg-5 py-lg-3 ">
                <div className={`${transmitting && "d-none"}`}>
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
                </div>

                <div className={`text-center mb-4 ${transmitting && "d-none"}`}>
                  <strong>Report Details:</strong>
                </div>
                <form>
                  <div className={`form-group ${transmitting && "d-none"}`}>
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

                  <div className={`${transmitting && "d-none"}`}>
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
                  </div>
                  <div className="text-center mb-4">
                    {!transmitting && (
                      <button
                        type="button"
                        className="btn btn-primary mt-1"
                        onClick={startReport}
                      >
                        <i className="la la-send mr-2" /> Start Report
                      </button>
                    )}

                    {transmitting && (
                      <button
                        type="button"
                        className="btn btn-default mt-1"
                        onClick={() => {
                          window.location.reload();
                        }}
                      >
                        <i className="la la-stop mr-2" /> Stop Report
                      </button>
                    )}
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
