import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import UserAction from '@actions/user.js';
import AdminAction from '@actions/admin';

import CompileComponent from '../compile-component/lazy';

function mapStateToProps(state) {
  return {
    post: state.post,
    user: state.user,
    admin: state.admin,
  };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

class PrivateRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: null,
      isUser: false,
      isAdmin: false,
    };
  }

  async componentDidMount() {
    let { user, admin, routerConfig } = this.props;
    let userFetchData = null;
    let adminFetchData = null;
    // 先进行user的checklogin
    if (user && !user.hadCheckLogin) {
      try {
        // 把setCheckLogin动作提前，放置请求错误
        this.props.dispatch(UserAction.setUserCheckLogin(true));
        const checkData = await this.axios.post('user/checklogin', {});
        const data = checkData.data;

        // 把结果存入userFetchData，进行第一次页面渲染的权限判断
        userFetchData = data;

        if (data.succ === false) {
        } else {
          this.props.dispatch(UserAction.initUserData(data));
        }
      } catch (error) {
        console.error(error);
      }
    }
    // 进行admin的checklogin
    if (admin && !admin.hadCheckLogin) {
      try {
        this.props.dispatch(AdminAction.setAdminCheckLogin(true));
        const checkData = await this.axios.post('admin/checklogin', {});
        const data = checkData.data;
        adminFetchData = data;
        if (data.succ) {
          this.props.dispatch(AdminAction.initAdminData(data));
        }
      } catch (error) {
        console.error(error);
      }
    }
    // 如果是redirect的路由，routerConfig还是跳转前的routerConfig，
    // 是因为switch的匹配机制
    // 需要把redirect转化成from to的形式放到渲染顺序的后面就能解决
    // 判断权限
    if (routerConfig) {
      user = userFetchData || user || {};
      admin = adminFetchData || admin || {};
      if (routerConfig.needUserLogin) {
        if (user.userId) {
          this.setState({ isAuthenticated: true });
        } else {
          this.setState({ isAuthenticated: false, isUser: true });
        }
      } else if (routerConfig.adminRoles) {
        // 管理员权限判断
        if (admin.role.length) {
          // 拿admin中的role和页面routerConfig的adminRoles做交集，有符合条件的说明权限校验通过
          let find = false;
          for (let i = 0; i < admin.role.length; i++) {
            for (let j = 0; j < routerConfig.adminRoles.length; j++) {
              if (admin.role[i] === routerConfig.adminRoles[j].value) {
                find = true;
                break;
              }
            }
            if (find) {
              this.setState({ isAuthenticated: true });
              break;
            }
          }
          if(!find) {
            this.setState({ isAuthenticated: false, isAdmin: true });
          }
        } else {
          this.setState({ isAuthenticated: false, isAdmin: true });
        }
      } else {
        this.setState({ isAuthenticated: true });
      }
    } else {
      this.setState({ isAuthenticated: true });
    }
  }

  render() {
    const { isAuthenticated, isAdmin } = this.state;
    let { redirect, path, admin } = this.props;
    // console.log('private route render', this.props);
    // console.log(`Private Route render ${this.props.location.pathname}`);
    // console.log(this.props);
    switch (isAuthenticated) {
      case null:
        return '';
      case false:
        return isAdmin ? (
          // 管理权限校验失败，如果有登录态跳转管理员后台首页
          admin.adminId ? (
            <Redirect to="/admin/home" />
          ) : (
            <Redirect to="/admin/login" />
          )
        ) : (
          <Redirect to="/home" />
        );
      case true:
        if (redirect) {
          return <Redirect {...this.props} from={path} to={redirect} />;
        }
        console.log('CompileComponent', path);
        return <CompileComponent {...this.props} />;
      default:
        return <Redirect to="/" />;
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PrivateRoute));
