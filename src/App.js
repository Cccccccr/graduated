import React, { Component } from "react";
import {
  Link,
  Route,
  Redirect,
  Switch,
  NavLink,
  withRouter,
  BrowserRouter,
} from "react-router-dom";
// import { qs } from "querystring";
import "./App.css";

import PrivateRoute from "./router/PrivateRoute";
import Router from "./router";

import Home from "./pages/Home";
import About from "./pages/About";
class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          {/* <Switch>
              <Route path="/about" component={About} />
              <Route path="/home" component={Home} />
              <PrivateRoute path="/private" component={Home} />
              <Redirect to="/about">redirect about</Redirect>
            </Switch> */}
          {/* <PrivateRoute path="/private" component={Home} /> */}
        </div>
        <div>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

export default App;
