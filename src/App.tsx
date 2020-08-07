import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Map from "./components/Map";

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

            <Route path="/events">
              <h1>events</h1>
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
