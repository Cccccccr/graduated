import React, { Component, Fragment } from "react";
import { Redirect, Switch, Link, withRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import router from './router';

class Router extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    // 做面包屑的处理
    return true;
  }

  compileRoutes = (route, key) => {
    const { path, childRoutes, exact = false } = route;
    if (Array.isArray(childRoutes)) {
      let routes = childRoutes.map((route, index) =>
        this.compileRoutes(route, index, path)
      );
      return (
        <PrivateRoute exact={exact} key={key} routes={routes} {...route} />
      );
    }

    return <PrivateRoute exact={exact} key={key} {...route} />;
  };

  render() {
    return (
      <Fragment>
        <Link to="/about">About</Link>&nbsp;
        <Link to="/home">Home</Link>&nbsp;
        <Link to="/lazy">Lazy</Link>&nbsp;
        <Link to="/private">private</Link>&nbsp;
        <Link to="/nowhere">Nowhere</Link>&nbsp;
        <Switch>
          {router.map((route, key) => this.compileRoutes(route, key))}
          <Redirect to="/about"/>
        </Switch>
      </Fragment>
    );
  }
}

export default withRouter(Router);
