import React from "react";
import "../styles/Landing.scss";
import Footer from "./Footer";
import { GoogleLogin } from "react-google-login";

const LoginPage = (props: any) => {
  const responseGoogle = (response) => {
    localStorage.user = JSON.stringify(response.profileObj);
    window.location.href = "/Map";
  };

  return (
    <div className="landing-page">
      {/* Main content */}
      <div className="main-content">
        {/* Header */}
        <div className="header bg-gradient-primary pt-5 pb-7 py-lg-8 pt-lg-9">
          <div className="container">
            <div className="header-body text-center mb-7">
              <div className="row justify-content-center">
                <div className="col-xl-5 col-lg-6 col-md-8 px-5">
                  <img src="/hlogo.png" alt="h-logo" className="landing-logo" />
                  <h1 className="text-white">Seantinel</h1>
                  <p className="text-lead text-active">Admin Login</p>
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

      <div className="container mt--8 pb-5">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <div className="card bg-secondary border-0">
              <div className="card-header bg-transparent py-5">
                <div className="text-center">
                  <GoogleLogin
                    clientId="451403226679-qhc12ctq9lfvqk3mo6sdv3hmigo8rt0l.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    className={"px-3"}
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    // cookiePolicy={"single_host_origin"}
                  />
                </div>
                <div className="text-muted text-center mt-4 mb-0">
                  <small>
                    Only verified users are given access to process reports in
                    Seantinel. If you wish to gain access, reach out via email
                    to:{" "}
                    <span className="text-primary">
                      (bryce.mercines@gmail.com)
                    </span>
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
