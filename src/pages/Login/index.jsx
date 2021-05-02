import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import './index.less';

import UserAction from '@actions/user.js';

function mapStateToProps(state) {
  return {
    post: state.post,
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return { dispatch, ...UserAction };
}

class Login extends Component {
  state = {
    isModalVisible: false,
    login: true,
    account: '',
    password: '',
    size: 'large',
  };

  async componentDidMount() {}

  handleShow = flag => {
    this.setState({ isModalVisible: !!flag });
  };

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
    const { account, password, login } = this.state;
    const data = {
      account,
      password,
    };
    const requestUrl = login ? 'user/login' : 'user/create';
    try {
      const result = await this.axios.post(requestUrl, data);
      const respondData = result.data;
      if (respondData.succ === false) {
        this.$message.warning(respondData.msg);
      } else {
        this.$message.success(`${login ? '登录' : '注册'}成功`);
        this.setState({ isModalVisible: false });
        this.clearData();
      }
    } catch (error) {
      console.log(error);
      this.$message.error(`${login ? '登录' : '注册'}失败`);
    }
  };

  clearData = () => {
    this.setState({ account: '', password: '' });
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

  render() {
    let state = this.state;
    let { isModalVisible, login, size, account, password } = state;
    return (
      <div className="Login">
        <Modal
          visible={isModalVisible}
          onCancel={() => this.handleShow(false)}
          title="注册登录"
          footer={null}
          width={498}
          className="Login"
        >
          <div className="main">
            <h3 className="title">用户{login ? '登录' : '注册'}</h3>
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
            <Button
              className="operate-type"
              type="link"
              size={size}
              onClick={this.opearteChange}
            >
              {login ? '注册' : '登录'}
            </Button>
            <Button
              className="comfirm-btn"
              type="primary"
              shape="round"
              size={size}
              block
              onClick={this.comfirm}
            >
              {login ? '登录' : '注册'}
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(Login);
