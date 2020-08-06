import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Landing from './components/Landing';


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
              <h1>Map</h1>
            </Route>

            <Route path="/explote">
              <h1>Explore</h1>
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
