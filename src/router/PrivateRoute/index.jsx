import React, { Component } from "react";
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from "react-router-dom";
import UserAction from '@actions/user.js';

import CompileComponent from "../compile-component";

function mapStateToProps(state) {
  return {
    post: state.post,
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return { dispatch, ...UserAction };
}

class PrivateRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: null,
    };
  }

  async componentDidMount() {
    // 判断权限
    const checkData = await this.axios.post('user/checklogin', {});
    console.log(checkData, '--------------');
    const data = checkData.data;
    console.log(this.props);
    if (data.succ === false) {
    } else {
      // this.props.dispatch(this.props.initUserData(data));
      this.props.dispatch(UserAction.initUserData(data));
      // store.dispatch(UserAction.initUserData(data));
    }
    this.setState({ isAuthenticated: true });
  }

  render() {
    const { isAuthenticated } = this.state;
    let { path = "/", key, redirect, loader, name, routes = null, exact = false } = this.props;
    switch (isAuthenticated) {
      case null:
        return "";
      case false:
        return <Redirect to="/login" />;
      case true:
        return (
          <Route
            path={path}
            exact={exact}
            key={key}
            render={(props) => {
              if (redirect) {
                return <Redirect to={redirect} />;
              }
              return (
                <CompileComponent
                  {...props}
                  loader={loader}
                  name={name}
                  routes={routes}
                />
              );
            }}
          />
        );
      default:
        return <Redirect to="/login" />;
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PrivateRoute));
