import { Link, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
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
        </Switch>
      </Router>


    </div>
  );
}

export default App;
