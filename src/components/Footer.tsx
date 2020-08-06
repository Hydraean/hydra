import React from 'react'

const Footer = () => {
  return (
    <footer className="py-5" id="footer-main">
      <div className="container">
        <div className="row align-items-center justify-content-xl-between">
          <div className="col-xl-6">
            <div className="copyright text-center text-xl-left text-muted">
              © 2020 <a href="https://github.com/Hydraean" className="font-weight-bold ml-1" target="_blank" rel="noopener noreferrer">Hydraean</a>
            </div>
          </div>
          <div className="col-xl-6">
            <ul className="nav nav-footer justify-content-center justify-content-xl-end">
              <li className="nav-item" title="Design based on: Argon Dashboard">
                <a href="https://www.creative-tim.com" className="nav-link" target="_blank" rel="noopener noreferrer">Creative Tim</a>
              </li>
              <li className="nav-item">
                <a href="https://github.com/Hydraean" className="nav-link" target="_blank" rel="noopener noreferrer">Github</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;