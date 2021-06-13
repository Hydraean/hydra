import React from "react";

const AwardCard = () => {
  return (
    <div className="container d-flex award-card-container mt-2">
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
          <br />
          <span
            className="text-white text-center text-active"
            // style={{ width: "100px" }}
          >
            First ever Karagathon, A Hackathon to combat illegal fishing in the
            Philippines
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

            <span className="avatar avatar-sm rounded-circle mx-1" title="BFAR">
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
  );
};

export default AwardCard;
