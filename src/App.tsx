import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Map from "./components/Map";
import "toastify-js/src/toastify.css";
import "./styles/Map.scss";
import "./styles/Cards.scss";
import "./styles/Main.scss";
import "./styles/Modal.scss";
import "./styles/Animations.scss";
import Advisories from "./components/Advisories";
import Devices from "./components/Devices";
import DeviceDemo from "./components/DeviceDemo";
import DeviceRegistry from "./components/DeviceRegistry";
import Analytics from "./components/Analytics";

function App() {
  return (
    <>
      <Router>
        <div>
          <Switch>
            <Route path="/" exact>
              <Landing />
            </Route>

            <Route path="/map">
              <Map />
            </Route>

            <Route path="/analytics">
              <Analytics />
            </Route>

            <Route path="/advisories">
              <Advisories />
            </Route>

            <Route path="/device-list">
              <Devices />
            </Route>

            <Route path="/device-registry">
              <DeviceRegistry />
            </Route>

            <Route path="/report/demo">
              <DeviceDemo />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
