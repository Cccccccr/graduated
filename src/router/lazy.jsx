import React, { Component, Suspense, Fragment } from 'react';
import { Redirect, Switch, withRouter } from 'react-router-dom';
import PrivateRoute from './PrivateRoute/lazy';
import { normalRouter, redirectRouter } from './router';
import routeUtil from './routeUtil';

class Router extends Component {
  constructor(props) {
    super(props);
    routeUtil.initHistory(this.props.history);
    // 把history挂载到Component的原型链上
    Component.prototype.$history = this.props.history;
  }

  async shouldComponentUpdate(nextProps, nextState) {
    // 做面包屑的处理
    // console.log(nextProps, '++++++++');
    return false;
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
        <Suspense fallback={<div>Loading</div>}>
          <Switch>
            {normalRouter.map((route, key) => this.compileRoutes(route, key))}
            {
              // 对处理完的所有redirectRouter进行渲染
              redirectRouter.map((item, key) => {
                return (
                  item.path && <Redirect key={item.path + key} from={item.path} to={item.redirect} />
                )
              })
            }
            <Redirect to="/home" />
            {/* 在上面redirect下的Router是不会被跳转的，因为它没有from，匹配的是全路径 */}
            <Router path="/abcd/abcd"></Router>
          </Switch>
        </Suspense>
      </Fragment>
    );
  }
}

export default withRouter(Router);
