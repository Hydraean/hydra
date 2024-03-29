import React, { useEffect, useState } from "react";
import "../styles/Landing.scss";
import Footer from "./Footer";
import Button from "./Button";
import { gaPV, loadChart, publishedList } from "./utils";
import MobileNav from "./MobileNav";
import AwardCard from "./AwardCard";

const Landing = (props: any) => {
  useEffect(() => {
    gaPV("Seantinel Home", "/seantinel-home");
    loadChart();

    window.onscroll = () => {
      let scrollTop = window.scrollY;
      if (scrollTop > 1200 && scrollTop < 1300) {
        gaPV("Seantinel Home", "/seantinel-home");
      }
    };
  }, []);

  const [mobile, setMobile] = useState(false);

  return (
    <div className="landing-page">
      {mobile && <MobileNav />}

      <nav
        id="navbar-main"
        className="navbar navbar-horizontal py-1 navbar-transparent navbar-expand-lg navbar-dark"
      >
        <div className="container">
          <a className="navbar-brand" href="/map">
            <img src="/hlogo.png" alt="Hydra Logo" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
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
            className="navbar-collapse  collapse text-dark"
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
            <ul className="navbar-nav mr-auto text-dark">
              <li className="nav-item">
                <a href="/map" className="nav-link">
                  <span className="nav-link-inner--text ta">Dashboard</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="/analytics" className="nav-link">
                  <span className="nav-link-inner--text">Analytics</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="/report/demo" className="nav-link">
                  <span className="nav-link-inner--text">Report</span>
                </a>
              </li>

              <li className="nav-item">
                <a
                  href="https://sagipinas.vercel.app/docs/seantinel"
                  className="nav-link"
                >
                  <span className="nav-link-inner--text">Blog</span>
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
                <div className="col-xl-8 col-lg-6 col-md-8 px-5">
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
          <br />
          <br />
          <div className="page-content">
            <div className="col-md-5">
              <h1 className="text-active pb-3">About the Project</h1>
              <p className="text-lead text-white">
                Seantinel is an IoT-based platform that aims to provide means of
                communication for Authorities, and local communities with little
                to no available resources for communication.
              </p>

              <p className="text-lead text-white">
                The device can operate with low power requirements and does not
                rely primarily on an internet connection to operate.
              </p>
            </div>

            <div>
              <img
                src="https://mist.now.sh/mist/sx1.gif"
                className="about-img rounded"
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
                "Gateways" to create a mesh network that allows messages to
                travel long distances as it bounces from one device to another
                along with the network until it reaches a gateway capable of
                sending the data to the Internet, or just nearby base station
                for local telemetry.
              </p>

              <p className="text-lead text-white mt-3">
                One of the goals of the project is to create a cost-effective
                and open-source design for the core parts of the Hardware and
                The software makes it easy for even students to replicate and
                build their device to make it part of the network which
                increases the scalability of the project in the process
              </p>

              <a
                href="https://sagipinas.vercel.app/docs/seantinel"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="btn btn-primary mb-5">Learn More</button>
              </a>
            </div>
            <div>
              <img
                src="/visual.png"
                className="about-img"
                alt="Dashboard visual"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="mb-2">
          <div className="container award-row">
            <div className="awards">
              <h1 className="text-active fw-100">Award</h1>
              <AwardCard />
            </div>

            <div className="ml-5 bg-default award-links">
              <div className="card-header bg-transparent border-0">
                <h3 className="text-white mb-0">
                  <i className="la la-link text-active" /> Related Links
                </h3>
                <small className="text-muted">
                  Links and Publications related to the project.
                </small>
              </div>
              <div className="table-responsive">
                <table className="table align-items-center table-dark table-flush">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col" className="sort" data-sort="name">
                        Name
                      </th>
                      <th scope="col" className="sort" data-sort="name">
                        Link
                      </th>
                    </tr>
                  </thead>
                  <tbody className="link-set">
                    {publishedList.map((x, index) => {
                      return (
                        <tr
                          className="link-item"
                          key={index}
                          onClick={() => {
                            window.open(x.url, "_blank");
                          }}
                        >
                          <td>{x.title}</td>
                          <td>
                            <span>
                              Visit <i className="la la-angle-right" />
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <hr />
          </div>

          <br />
          <br />

          <div className="containter mt-5 note-banner row">
            <div className="col-lg-8">
              <h2>Seantinel is a work in progress</h2>
              <small className="text-white">
                This project is being actively improved and developed since
                September 2020, problems posed from the COVID-19 pandemic
                hinders oppurtunities to perform pilot testing. If you have
                inquiries or want to support the project, feel free to reach out
                throught email. Thank you.
              </small>
            </div>

            <div className="col-md-4 d-grid">
              <a
                href="mailto:seantinel.project@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="btn btn-default">
                  seantinel.project@gmail.com
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Landing;
