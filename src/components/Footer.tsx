import React from "react";

const Footer = () => {
  return (
    <footer className="py-5" id="footer-main">
      <div className="container">
        <div className="row align-items-center justify-content-xl-between">
          <div className="col-xl-6">
            <div className="copyright text-center text-xl-left text-muted">
              © 2020{" "}
              <a
                href="https://github.com/Hydraean"
                className="font-weight-bold ml-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                Hydraean
              </a>
            </div>
          </div>
          <div className="col-xl-6">
            <ul className="nav nav-footer justify-content-center justify-content-xl-end">
              {/* <li className="nav-item" title="Design based on: Argon Dashboard">
                <a
                  href="https://www.creative-tim.com/product/argon-dashboard"
                  className="nav-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Design System
                </a>
              </li>
              <li
                style={{
                  fontSize: "15px",
                  bottom: "-3px",
                  position: "relative",
                }}
              >
                Icons made by{" "}
                <a
                  href="https://www.flaticon.com/authors/freepik"
                  title="Freepik"
                >
                  Freepik
                </a>{" "}
                from{" "}
                <a href="https://www.flaticon.com/" title="Flaticon">
                  www.flaticon.com
                </a>
              </li>
              */}
              <li className="nav-item">
                <a
                  href="https://github.com/Hydraean"
                  className="nav-link text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="la la-github" /> Github
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
