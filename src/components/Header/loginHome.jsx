import React, { Component } from 'react';
import { Button } from 'antd';

class LoginHome extends Component {
  state = {
    size: 'lagre',
  };

  handleClick = () => {
    this.props.showLogin && this.props.showLogin();
  }

  render() {
    const { size } = this.state;
    return (
      <div>
        <Button type="primary" size={size} onClick={this.handleClick}>
          登录
        </Button>
      </div>
    );
  }
}

export default LoginHome;
