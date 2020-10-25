import React from "react";

const mobileNav = () => {
  return (
    <div
      className="navbar-collapse navbar-custom-collapse collapse fade-in show p-3 text-white"
      id="navbar-collapse"
    >
      <div className="navbar-collapse-header pt-5">
        <div className="row">
          <div className="col-6 collapse-brand">
            <a href="dashboard.html">
              <img src="../assets/img/brand/blue.png" alt=" blue logo" />
            </a>
          </div>
          <div className="col-6 collapse-close">
            <button
              type="button"
              className="navbar-toggler"
              data-toggle="collapse"
              data-target="#navbar-collapse"
              aria-controls="navbar-collapse"
              aria-expanded="true"
              aria-label="Toggle navigation"
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </div>
      <ul className="navbar-nav mr-auto mt-5 mb-3">
        <li className="nav-item">
          <a href="/map" className="nav-link">
            <span className="nav-link-inner--text text-white">Dashboard</span>
          </a>
        </li>
        <li className="nav-item text-white">
          <a href="/analytics" className="nav-link">
            <span className="nav-link-inner--text text-white">Analytics</span>
          </a>
        </li>
        <li className="nav-item">
          <a href="/report/demo" className="nav-link">
            <span className="nav-link-inner--text text-white">Report</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default mobileNav;
