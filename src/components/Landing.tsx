import React from 'react'
import '../styles/Landing.scss'

const Landing = (props: any) => {
  return (
    <div className="landing-page">
      <nav id="navbar-main" className="navbar navbar-horizontal navbar-transparent navbar-main navbar-expand-lg navbar-light">
        <div className="container">
          <a className="navbar-brand" href="/map">
            <img src="hlogo.png" alt="Hydra Logo" />
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-collapse" aria-controls="navbar-collapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="navbar-collapse navbar-custom-collapse collapse" id="navbar-collapse">
            <div className="navbar-collapse-header">
              <div className="row">
                <div className="col-6 collapse-brand">
                  <a href="dashboard.html">
                  </a>
                </div>
                <div className="col-6 collapse-close">
                  <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbar-collapse" aria-controls="navbar-collapse" aria-expanded="false" aria-label="Toggle navigation">
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
                <a href="/events" className="nav-link">
                  <span className="nav-link-inner--text">Events</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="register.html" className="nav-link">
                  <span className="nav-link-inner--text">Register</span>
                </a>
              </li>
            </ul>
            <hr className="d-lg-none" />
            <ul className="navbar-nav align-items-lg-center ml-lg-auto">
              <li className="nav-item">
                <a className="nav-link nav-link-icon" href="https://www.facebook.com/creativetim" target="_blank" rel="noopener noreferrer" data-toggle="tooltip" data-original-title="Like us on Facebook">
                  <i className="fab fa-facebook-square" />
                  <span className="nav-link-inner--text d-lg-none">Facebook</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-link-icon" href="https://www.instagram.com/creativetimofficial" target="_blank" rel="noopener noreferrer" data-toggle="tooltip" data-original-title="Follow us on Instagram">
                  <i className="fab fa-instagram" />
                  <span className="nav-link-inner--text d-lg-none">Instagram</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-link-icon" href="https://twitter.com/creativetim" target="_blank" rel="noopener noreferrer" data-toggle="tooltip" data-original-title="Follow us on Twitter">
                  <i className="fab fa-twitter-square" />
                  <span className="nav-link-inner--text d-lg-none">Twitter</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-link-icon" href="https://github.com/creativetimofficial" target="_blank" rel="noopener noreferrer" data-toggle="tooltip" data-original-title="Star us on Github">
                  <i className="fab fa-github" />
                  <span className="nav-link-inner--text d-lg-none">Github</span>
                </a>
              </li>
              <li className="nav-item d-none d-lg-block ml-lg-4">
                <a href="https://github.com/Hydraean" target="_blank" rel="noopener noreferrer" className="btn btn-neutral btn-icon">
                  <span className="btn-inner--icon">
                    <i className="fas fa-shopping-cart mr-2" />
                  </span>
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
                  <p className="text-lead text-white">Connecting people who protect our oceans</p>

                  <a href="https://github.com/Hydraean" target="_blank" rel="noopener noreferrer" className="btn btn-neutral btn-icon">
                    <span className="btn-inner--icon">
                      <i className="fas fa-shopping-cart mr-2" />
                    </span>
                    <span className="nav-link-inner--text">View on Github</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="separator separator-bottom separator-skew zindex-100">
            <svg x={0} y={0} viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <polygon className="fill-default" points="2560 0 2560 100 0 100" />
            </svg>
          </div>
        </div>
        {/* Page content */}



      </div>
      {/* Footer */}
      <footer className="py-5" id="footer-main">
        <div className="container">
          <div className="row align-items-center justify-content-xl-between">
            <div className="col-xl-6">
              <div className="copyright text-center text-xl-left text-muted">
                © 2020 <a href="https://www.creative-tim.com" className="font-weight-bold ml-1" target="_blank" rel="noopener noreferrer">Creative Tim</a>
              </div>
            </div>
            <div className="col-xl-6">
              <ul className="nav nav-footer justify-content-center justify-content-xl-end">
                <li className="nav-item">
                  <a href="https://www.creative-tim.com" className="nav-link" target="_blank" rel="noopener noreferrer">Creative Tim</a>
                </li>
                <li className="nav-item">
                  <a href="https://www.creative-tim.com/presentation" className="nav-link" target="_blank" rel="noopener noreferrer">About Us</a>
                </li>
                <li className="nav-item">
                  <a href="http://blog.creative-tim.com" className="nav-link" target="_blank" rel="noopener noreferrer">Blog</a>
                </li>
                <li className="nav-item">
                  <a href="https://github.com/creativetimofficial/argon-dashboard/blob/master/LICENSE.md" className="nav-link" target="_blank" rel="noopener noreferrer">MIT License</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div >
  )
}

export default Landing;