import React from 'react'
import '../styles/Landing.scss'

const Landing = (props: any) => {
  return (
    <div>
      <nav id="navbar-main" className="navbar navbar-horizontal navbar-transparent navbar-main navbar-expand-lg navbar-light">
        <div className="container">
          <a className="navbar-brand" href="dashboard.html">
            <img src="hydra.png" />
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-collapse" aria-controls="navbar-collapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="navbar-collapse navbar-custom-collapse collapse" id="navbar-collapse">
            <div className="navbar-collapse-header">
              <div className="row">
                <div className="col-6 collapse-brand">
                  <a href="dashboard.html">
                    <img src="../assets/img/brand/blue.png" />
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
                <a href="dashboard.html" className="nav-link">
                  <span className="nav-link-inner--text">Dashboard</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="login.html" className="nav-link">
                  <span className="nav-link-inner--text">Login</span>
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
                <a className="nav-link nav-link-icon" href="https://www.facebook.com/creativetim" target="_blank" data-toggle="tooltip" data-original-title="Like us on Facebook">
                  <i className="fab fa-facebook-square" />
                  <span className="nav-link-inner--text d-lg-none">Facebook</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-link-icon" href="https://www.instagram.com/creativetimofficial" target="_blank" data-toggle="tooltip" data-original-title="Follow us on Instagram">
                  <i className="fab fa-instagram" />
                  <span className="nav-link-inner--text d-lg-none">Instagram</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-link-icon" href="https://twitter.com/creativetim" target="_blank" data-toggle="tooltip" data-original-title="Follow us on Twitter">
                  <i className="fab fa-twitter-square" />
                  <span className="nav-link-inner--text d-lg-none">Twitter</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-link-icon" href="https://github.com/creativetimofficial" target="_blank" data-toggle="tooltip" data-original-title="Star us on Github">
                  <i className="fab fa-github" />
                  <span className="nav-link-inner--text d-lg-none">Github</span>
                </a>
              </li>
              <li className="nav-item d-none d-lg-block ml-lg-4">
                <a href="https://www.creative-tim.com/product/argon-dashboard-pro?ref=ad_upgrade_pro" target="_blank" className="btn btn-neutral btn-icon">
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
                  <h1 className="text-white">Welcome!</h1>
                  <p className="text-lead text-white">Use these awesome forms to login or create new account in your project for free.</p>
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
        <div className="container mt--8 pb-5">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-7">
              <div className="card bg-secondary border-0 mb-0">
                <div className="card-header bg-transparent pb-5">
                  <div className="text-muted text-center mt-2 mb-3"><small>Sign in with</small></div>
                  <div className="btn-wrapper text-center">
                    <a href="#" className="btn btn-neutral btn-icon">
                      <span className="btn-inner--icon"><img src="../assets/img/icons/common/github.svg" /></span>
                      <span className="btn-inner--text">Github</span>
                    </a>
                    <a href="#" className="btn btn-neutral btn-icon">
                      <span className="btn-inner--icon"><img src="../assets/img/icons/common/google.svg" /></span>
                      <span className="btn-inner--text">Google</span>
                    </a>
                  </div>
                </div>
                <div className="card-body px-lg-5 py-lg-5">
                  <div className="text-center text-muted mb-4">
                    <small>Or sign in with credentials</small>
                  </div>
                  <form role="form">
                    <div className="form-group mb-3">
                      <div className="input-group input-group-merge input-group-alternative">
                        <div className="input-group-prepend">
                          <span className="input-group-text"><i className="ni ni-email-83" /></span>
                        </div>
                        <input className="form-control" placeholder="Email" type="email" />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="input-group input-group-merge input-group-alternative">
                        <div className="input-group-prepend">
                          <span className="input-group-text"><i className="ni ni-lock-circle-open" /></span>
                        </div>
                        <input className="form-control" placeholder="Password" type="password" />
                      </div>
                    </div>
                    <div className="custom-control custom-control-alternative custom-checkbox">
                      <input className="custom-control-input" id=" customCheckLogin" type="checkbox" />
                      <label className="custom-control-label" htmlFor=" customCheckLogin">
                        <span className="text-muted">Remember me</span>
                      </label>
                    </div>
                    <div className="text-center">
                      <button type="button" className="btn btn-primary my-4">Sign in</button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-6">
                  <a href="#" className="text-light"><small>Forgot password?</small></a>
                </div>
                <div className="col-6 text-right">
                  <a href="#" className="text-light"><small>Create new account</small></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="py-5" id="footer-main">
        <div className="container">
          <div className="row align-items-center justify-content-xl-between">
            <div className="col-xl-6">
              <div className="copyright text-center text-xl-left text-muted">
                © 2020 <a href="https://www.creative-tim.com" className="font-weight-bold ml-1" target="_blank">Creative Tim</a>
              </div>
            </div>
            <div className="col-xl-6">
              <ul className="nav nav-footer justify-content-center justify-content-xl-end">
                <li className="nav-item">
                  <a href="https://www.creative-tim.com" className="nav-link" target="_blank">Creative Tim</a>
                </li>
                <li className="nav-item">
                  <a href="https://www.creative-tim.com/presentation" className="nav-link" target="_blank">About Us</a>
                </li>
                <li className="nav-item">
                  <a href="http://blog.creative-tim.com" className="nav-link" target="_blank">Blog</a>
                </li>
                <li className="nav-item">
                  <a href="https://github.com/creativetimofficial/argon-dashboard/blob/master/LICENSE.md" className="nav-link" target="_blank">MIT License</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing;