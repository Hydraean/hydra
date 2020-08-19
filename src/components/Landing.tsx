import React, { useEffect } from "react";
import "../styles/Landing.scss";
import Footer from "./Footer";
import Button from "./Button";
import { loadChart } from "./utils";

const Landing = (props: any) => {
  useEffect(() => {
    loadChart();
  }, []);

  return (
    <div className="landing-page">
      <nav
        id="navbar-main"
        className="navbar navbar-horizontal navbar-transparent navbar-main navbar-expand-lg navbar-light"
      >
        <div className="container">
          <a className="navbar-brand" href="/map">
            <img src="hlogo.png" alt="Hydra Logo" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbar-collapse"
            aria-controls="navbar-collapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="navbar-collapse navbar-custom-collapse collapse"
            id="navbar-collapse"
          >
            <div className="navbar-collapse-header">
              <div className="row">
                <div className="col-6 collapse-brand"></div>
                <div className="col-6 collapse-close">
                  <button
                    type="button"
                    className="navbar-toggler"
                    data-toggle="collapse"
                    data-target="#navbar-collapse"
                    aria-controls="navbar-collapse"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span />
                    <span />
                  </button>
                </div>
              </div>
            </div>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a href="#about" className="nav-link">
                  <span className="nav-link-inner--text">About</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="#features" className="nav-link">
                  <span className="nav-link-inner--text">Features</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="/map" className="nav-link">
                  <span className="nav-link-inner--text">Dashboard</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="/Incidents" className="nav-link">
                  <span className="nav-link-inner--text">Events</span>
                </a>
              </li>
            </ul>

            <hr className="d-lg-none" />
            <ul className="navbar-nav align-items-lg-center ml-lg-auto">
              <li className="nav-item d-none d-lg-block ml-lg-4">
                <a
                  href="https://github.com/Hydraean"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-neutral btn-icon"
                >
                  <i className="la la-github mr-1" />
                  <span className="nav-link-inner--text">View on Github</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* Main content */}
      <div className="main-content">
        {/* Header */}
        <div className="header bg-gradient-primary py-7 py-lg-8 pt-lg-9">
          <div className="container">
            <div className="header-body text-center mb-7">
              <div className="row justify-content-center">
                <div className="col-xl-5 col-lg-6 col-md-8 px-5">
                  <img src="hlogo.png" alt="h-logo" className="landing-logo" />
                  <h1 className="text-white">Seantinel</h1>
                  <p className="text-lead text-white">
                    Connecting people who protect our oceans
                  </p>

                  <div className="mt-5 d-flex justify-content-center container">
                    <Button>Get Started</Button>
                  </div>
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
          <div className="page-content">
            <div className="col-md-6">
              <h1 className="text-active pb-3">About the Project</h1>
              <p className="text-lead text-white">
                Seantinel is an IoT based platform that aims to provide means of
                communication for Authorities, and local communities with little
                to no available resources for communication.
              </p>

              <p className="text-lead text-white">
                The device can operate with low power requirements and does not
                rey primarily on internet connection in order to operate.
              </p>
            </div>

            <div>
              <img
                src="https://philippineslifestyle.com/wp-content/uploads/dynamite-fishing.jpg"
                className="about-img"
                alt="Blast Fishing"
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Landing;
