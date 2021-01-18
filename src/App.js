import { Link, Route, BrowserRouter as Router, Switch, useLocation } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import { Userform } from "./components/userform/userform";
function App() { //component
  return (  //JSX
    <div className="App">
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="home" >Home</Link>
            </li>
            <li>
              <Link to="userform" >Userform</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/home">
            <Home></Home>
          </Route>
          <Route path="/userform">
            <Userform></Userform>
          </Route>
          <Route path="*">
            <NoMatch></NoMatch>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
function NoMatch() {
  let location = useLocation();

  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}
export default App;
