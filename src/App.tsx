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
