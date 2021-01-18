import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/topics">Topics</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/topics">
            <Topics />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  let match = useRouteMatch(); //hook
  return <h2>About
    <ul>
      <li>
        <Link to={`${match.url}/Founders/122`}>Founders</Link>
      </li>
      <li>
        <Link to={`${match.url}/address`}>
          Address
          </Link>
      </li>
    </ul>
    <Switch>
        <Route path={`${match.path}/:topicId/:subid`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
  </h2>;
}

function Topics() {
  let match = useRouteMatch(); //hook
  console.log(match);
  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>
            Props v. State
          </Link>
        </li>
      </ul>

      {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
      <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  // let { topicId, subid } = useParams();
  let params= useParams();

  return <h3>Requested topic ID: {params.topicId}, {params.subid}</h3>;
}