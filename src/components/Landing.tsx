import React, { useEffect, useState } from "react";
import "../styles/Landing.scss";
import Footer from "./Footer";
import Button from "./Button";
import { loadChart } from "./utils";
import MobileNav from "./MobileNav";

const Landing = (props: any) => {
  useEffect(() => {
    loadChart();
  }, []);

  const [mobile, setMobile] = useState(false);

  return (
    <div className="landing-page">
      {mobile && <MobileNav />}

      <nav
        id="navbar-main"
        className="navbar navbar-horizontal navbar-transparent navbar-main navbar-expand-lg navbar-light"
      >
        <div className="container">
          <a className="navbar-brand" href="/map">
            <img src="/hlogo.png" alt="Hydra Logo" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbar-collapse"
            aria-controls="navbar-collapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => {
              setMobile(!mobile);
            }}
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
                <a href="/map" className="nav-link">
                  <span className="nav-link-inner--text">Dashboard</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="/Incidents" className="nav-link">
                  <span className="nav-link-inner--text">Incidents</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="/report/demo" className="nav-link">
                  <span className="nav-link-inner--text">Report</span>
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
                  <img src="/hlogo.png" alt="h-logo" className="landing-logo" />
                  <h1 className="text-white">Seantinel</h1>
                  <p className="text-lead text-white">
                    Connecting the people who protect our oceans
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
                src="https://scontent.fmnl4-4.fna.fbcdn.net/v/t1.15752-9/s2048x2048/118068330_295540275063927_7328546783717533712_n.png?_nc_cat=102&_nc_sid=b96e70&_nc_ohc=_6TfUHspQ3AAX8Umou4&_nc_ht=scontent.fmnl4-4.fna&oh=2bf36770bd0ccff4dfc95c75830c7e5f&oe=5F6A2D3B"
                className="about-img"
                alt="Blast Fishing"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="mb-7">
          <div className="page-content">
            <div className="col-md-6">
              <h1 className="text-active pb-3">How it works</h1>
              <p className="text-lead text-white">
                The platform utilizes LoRa-based IoT Devices called "Nodes" and
                "Gateways" to create a mesh network which allows messages to
                travel long distances as it bounces from one device to another
                along the network until it reaches a gateway capable of sending
                the data to the Internet, or just nearby base station for local
                telemetry.
              </p>
            </div>

            <div>
              <img
                src="https://scontent.fmnl4-1.fna.fbcdn.net/v/t1.15752-9/s2048x2048/117717069_765722497520671_1792195501348226062_n.png?_nc_cat=103&_nc_sid=b96e70&_nc_ohc=Ur_PcQmpHkoAX-3CdNG&_nc_ht=scontent.fmnl4-1.fna&oh=82ae05ac4ad4c5e5f9735bb39019b210&oe=5F653A54"
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
