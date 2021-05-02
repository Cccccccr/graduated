import React, { Component } from 'react';
import { connect } from 'react-redux';
import { adminRoleArr, adminRole } from '@router/adminRoles';
import { Select, Button, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import './index.less';

import AdminAction from '@actions/admin';

const { Option } = Select;

function mapStateToProps(state) {
  return {
    post: state.post,
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return { dispatch, ...AdminAction };
}

class Login extends Component {
  state = {
    login: true,
    account: '',
    password: '',
    role: adminRoleArr[0].value,
    size: 'large',
  };

  async componentDidMount() {}

  onChange = (event, type) => {
    const { value } = event.target;
    const handle = {
      account: () => {
        this.setState({ account: value });
      },
      password: () => {
        this.setState({ password: value });
      },
    };
    if (type && handle[type]) {
      handle[type]();
    }
  };

  opearteChange = () => {
    this.setState({ login: !this.state.login, account: '', password: '' });
  };

  comfirm = async () => {
    if (!this.checkData()) {
      return;
    }
    const { account, password, login, role } = this.state;
    let data = {
      account,
      password,
    };
    const requestUrl = login ? 'admin/login' : 'admin/apply';
    if (!login) {
      const now = new Date();
      data = { role, createDate: now.valueOf(), ...data };
    }
    try {
      const result = await this.axios.post(requestUrl, data);
      const respondData = result.data;
      if (respondData.succ === false) {
        this.$message.warning(respondData.msg);
      } else {
        this.$message.success(`${login ? '登录' : '申请'}成功`);
        if (login) {
          await this.props.dispatch(AdminAction.initAdminData(respondData));
          console.log(this.$history);
          this.$history.push('/admin/home');
        }
      }
    } catch (error) {
      console.log(error);
      this.$message.error(`${login ? '登录' : '申请'}失败`);
    }
  };

  checkData = () => {
    const { account, password } = this.state;
    if (!account) {
      this.$message.warning('请输入账号');
      return false;
    }
    if (!password) {
      this.$message.warning('密码不能为空');
      return false;
    }
    return true;
  };

  handleSelectChange = value => {
    console.log(value);
    this.setState({ role: value });
  };

  render() {
    console.log('admin login render');
    let state = this.state;
    let { login, size, account, password } = state;
    return (
      <div className="AdminLogin">
        <div className="background"></div>
        <div className="main">
          <h3 className="title">管理员{login ? '登录' : '申请'}</h3>
          <Input
            placeholder="请输入账号"
            allowClear
            onChange={e => {
              this.onChange(e, 'account');
            }}
            value={account}
            size={size}
            className="input-item"
          />
          <Input.Password
            placeholder="密码"
            iconRender={visible =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            onChange={e => {
              this.onChange(e, 'password');
            }}
            size={size}
            className="input-item"
            value={password}
          />
          {!login && (
            <Select
              defaultValue={adminRoleArr[0].value}
              className="select-main"
              onChange={this.handleSelectChange}
            >
              {adminRoleArr.map(item => {
                return (
                  <Option value={item.value} key={item.name + item.value}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
          )}
          <Button
            className="operate-type"
            type="link"
            size={size}
            onClick={this.opearteChange}
          >
            {login ? '申请' : '登录'}
          </Button>
          <Button
            className="comfirm-btn"
            type="primary"
            shape="round"
            size={size}
            block
            onClick={this.comfirm}
          >
            {login ? '登录' : '申请'}
          </Button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(Login);
