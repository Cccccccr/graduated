import React, { Component, lazy } from "react";
import { Route, withRouter } from "react-router-dom";

class CompileComponent extends Component {
  render() {
    // console.log(`compile router render ${this.props.location.pathname}`, this.props)
    let { path = "/", loader, exact = false, routes = null } = this.props;
    const LazyLoader = lazy(loader);

    if(loader) {
      return (<Route {...this.props} path={path} exact={exact} render={() => (<LazyLoader {...this.props} routes={routes}/>)} onEnter={enter.bind(this)}/>);
    } else {
      throw new Error('loader is no a component')
    }
  }
}

const enter = (nextState, replace) => {
  console.log(nextState, replace, 'enter');
} 

export default withRouter(CompileComponent);