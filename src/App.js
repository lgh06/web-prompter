import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

// https://loadable-components.com/docs/getting-started/

// pages or components
import HomePage from './pages/HomePage'

// dynamically loaded pages or components
import {AsyncPage, ErrorBoundary} from './helpers'


export default function App() {
  return (
    <Router>
      <div>
        <ul className="nav">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/3login?code=333">ThirdPartyLogin</Link>
          </li>
          <li>
            <Link to="/topics">Topics</Link>
          </li>
        </ul>
        <ErrorBoundary>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/3login">
              <AsyncPage page="ThirdPartyLogin" />
            </Route>
            <Route path="/topics">
              <AsyncPage page="TopicsPageMQTT" />
            </Route>
            <Route path="*">
              <>404 error, not found</>
            </Route>
          </Switch>
        </ErrorBoundary>
      </div>
    </Router>
  );
}

function About() {
  return <h2>About</h2>;
}