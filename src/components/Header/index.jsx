import React, { Component } from 'react';
import { connect } from 'react-redux';
import Search from './search';
import EditOption from './editOption';
import LoginHome from './loginHome';
import Login from '../Login';
import UserOptions from './userOptions';
import './index.less';

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

class Header extends Component {
  constructor(props) {
    super(props);
    this.loginRef = React.createRef();
    this.state = {
      activeLink: 0,
      navList: [
        { value: '首页', path: '/home' },
        { value: '问答', path: '/question' },
      ],
    };
  }

  linkItemClick = index => {
    // const item = this.state.navList[index];
    this.setState({ activeLink: index });
  };

  showLogin = () => {
    this.loginRef.current.handleShow(true);
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
              <div className="search-cp">
                <Search />
              </div>
            </div>
            <div className="edit-options">
              <EditOption showLogin={this.showLogin} />
            </div>
            {this.props.user.userId ? (
              <div className="user-options">
                <UserOptions />
              </div>
            ) : (
              <div className="login">
                <LoginHome showLogin={this.showLogin} />
              </div>
            )}
          </div>
        </div>
        <Login ref={this.loginRef} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(Header);
