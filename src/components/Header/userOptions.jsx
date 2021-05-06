import React, { Component } from 'react';
import { Menu, Dropdown } from 'antd';

import './userOptions.less';
export class UserOptions extends Component {
  state = {
    options: [
      [{ name: '写文章', clickMethod: 'writeArticle' }],
      [
        { name: '我的主页', clickMethod: 'goUserPage' },
        { name: '我赞过的', clickMethod: 'goUserPage' },
        { name: '我的收藏夹', clickMethod: 'goUserPage' },
      ],
      [{ name: '登出', clickMethod: 'loginOut' }],
    ],
  };

  handleClick = item => {
    item && item.clickMethod && this[item.clickMethod](item);
  };

  writeArticle = () => {};

  goUserPage = data => {
    console.log(data);
  };

  loginOut = () => {
    console.log('退出账号');
  };

  getMenu = () => {
    return (
      <Menu>
        {this.state.options.map((item, index) => {
          const newItem = [...item];
          if (index !== 0) newItem.unshift({ divider: true });
          return newItem.map(item => {
            if (item.divider) {
              return <Menu.Divider />;
            } else {
              return (
                <Menu.Item
                  key={item.name}
                  onClick={() => {
                    this.handleClick(item);
                  }}
                >
                  {item.name}
                </Menu.Item>
              );
            }
          });
        })}
      </Menu>
    );
  };

  render() {
    return (
      <div className="HOME-USER-OPTIONS">
        <Dropdown
          overlay={this.getMenu()}
          placement="bottomRight"
          trigger={['click']}
          arrow
        >
          <div className="ava-contain">
            <img
              src="https://sf6-ttcdn-tos.pstatp.com/img/user-avatar/c8d65ca1fefcea0ef00b0b0b6cbaeac1~300x300.image"
              alt="user ava"
            />
          </div>
        </Dropdown>
      </div>
    );
  }
}

export default UserOptions;
