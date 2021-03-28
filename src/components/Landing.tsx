import React, { useEffect, useState } from "react";
import "../styles/Landing.scss";
import Footer from "./Footer";
import Button from "./Button";
import { loadChart, publishedList } from "./utils";
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
                  href="https://sagipinas.now.sh/docs/seantinel"
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
                "Gateways" to create a mesh network which allows messages to
                travel long distances as it bounces from one device to another
                along the network until it reaches a gateway capable of sending
                the data to the Internet, or just nearby base station for local
                telemetry.
              </p>

              <p className="text-lead text-white mt-3">
                One of the goals of the project is to create a cost-effective
                and open-source design for the core parts of the Hardware and
                Software making it easy even students to replicate and build
                their own device to make it part of the network which increases
                the scalability of the project in the process
              </p>

              <a
                href="https://sagipinas.now.sh/docs/seantinel"
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
              <br />
              <br />
              <div className="container d-flex award-card-container">
                <a
                  href="https://www.facebook.com/oceana.ph/photos/a.820968671282627/3403955139650621"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <div className="text-center award-card">
                    <div className="grad-bar top fade-in" />
                    <div className="award-item">
                      <img src="/Ribbon1.svg" className="award-ribbon mb-4" />
                      <h1 className="text-white">
                        2nd Place <br /> Karagathon 2020
                      </h1>
                    </div>
                    <span className="text-white text-center text-active">
                      First ever Karagathon, A Hackathon to combat illegal
                      fishing in the Philippines
                    </span>
                    <br />
                    <div className="row justify-content-center pt-3 ">
                      <span
                        className="avatar avatar-sm rounded-circle mx-1"
                        title="Oceana Philippines"
                      >
                        <img
                          alt="org logo"
                          src="https://pbs.twimg.com/profile_images/1137173613205835776/RynExFu9_400x400.png"
                        />
                      </span>

                      <span
                        className="avatar avatar-sm rounded-circle mx-1"
                        title="Karagatan Patrol"
                      >
                        <img alt="org logo" src="/kp.png" />
                      </span>

                      <span
                        className="avatar avatar-sm rounded-circle mx-1"
                        title="BFAR"
                      >
                        <img
                          alt="org logo"
                          src="https://dl.airtable.com/.attachments/510edead5b22b261e1b5ff6235ca42de/dd97bee0/49739143_1181398978677784_7454153271079337984_o.jpg"
                        />
                      </span>
                    </div>
                    <div className="mt-4 text-active learn-link fade-in-bottom">
                      Learn more <i className="la la-chevron-circle-right" />
                    </div>
                    <div className="grad-bar bottom fade-in" />
                  </div>
                </a>
              </div>
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
                href="mailto:bryce.mercines@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="btn btn-default">
                  bryce.mercines@gmail.com
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
