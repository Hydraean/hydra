import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {
  return (
    <>
      <Router>
        <div>
          <Switch>
            <Route path="/" exact>
              <h1>Home</h1>
            </Route>

            <Route path="/map">
              <h1>Map</h1>
            </Route>

            <Route path="/search">
              <h1>Search</h1>
            </Route>

          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
