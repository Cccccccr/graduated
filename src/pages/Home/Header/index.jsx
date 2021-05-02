import React, { Component } from 'react';
import Search from './search';
import './index.less';

class Header extends Component {
  state = {
    activeLink: 0,
    navList: [
      { value: '首页', path: '/home' },
      { value: '问答', path: '/question' },
    ],
  };

  linkItemClick = index => {
    const item = this.state.navList[index];
    this.setState({ activeLink: index });
  };

  render() {
    const { navList, activeLink } = this.state;

    return (
      <div className="USER-HOME-HEADER">
        <div className="main-header">
          <div className="container">
            <div className="nav-list">
              {navList.map((item, index) => {
                return (
                  <div
                    className={[
                      'link-item',
                      index === activeLink ? 'active-link' : '',
                    ].join(' ')}
                    key={item.value}
                    onClick={() => {
                      this.linkItemClick(index);
                    }}
                  >
                    <span>{item.value}</span>
                  </div>
                );
              })}
            </div>
            <div className="searchContainer">
              <Search />
            </div>
            <div className="edit-options"></div>
            <div className="login"></div>
            <div className="user-options"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
