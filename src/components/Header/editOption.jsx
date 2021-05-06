import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import routeUtil from '@router/routeUtil';
import { editorType } from '../../enum';

function mapStateToProps(state) {
  return {
    post: state.post,
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

class EditOption extends Component {
  state = {
    options: [
      {
        name: '发布问题',
        path: '/editor',
        search: { type: editorType.question },
      },
    ],
  };

  checkLogin = () => {
    // return true;
    if (!this.props.user.userId) {
      this.props.showLogin && this.props.showLogin();
      return false;
    } else {
      return true;
    }
  };

  handleButtonClick = e => {
    if (this.checkLogin()) {
      routeUtil.blankOpen('/editor', { type: editorType.article });
    }
  };

  handleMenuClick = e => {
    const key = e.key;
    const item = this.state.options[key];
    if (this.checkLogin()) {
      routeUtil.blankOpen(item.path, item.search);
    }
  };

  render() {
    const { options } = this.state;
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        {options.map((item, index) => {
          return <Menu.Item key={index}>{item.name}</Menu.Item>;
        })}
      </Menu>
    );
    return (
      <div>
        <Dropdown.Button
          onClick={this.handleButtonClick}
          overlay={menu}
          trigger={['click']}
          icon={<DownOutlined />}
        >
          写文章
        </Dropdown.Button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(EditOption);
