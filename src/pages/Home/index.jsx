import React, { Component } from 'react';
import Herader from './Header';
import Login from '../Login';
import Markdown from '../Markdown';
import { Button } from 'antd';

import './index.less';


class Home extends Component {
  constructor(props) {
    super(props);
    this.loginRef = React.createRef();
    this.state = {
      value: '',
    };
  }

  btnClick = () => {
    this.loginRef.current.handleShow(true);
  };

  handleChange(value) {
    this.setState({
      value,
    });
  }

  render() {
    const {  routes = false } = this.props;
    return (
      <div className="USER-HOME">
        <Herader />
        {/* <Button onClick={this.btnClick}>click</Button> */}
        {routes && routes}
        {/* <Login ref={this.loginRef} /> */}
        {/* <Markdown /> */}
      </div>
    );
  }
}

export default Home;
