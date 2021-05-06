import React, { Component } from 'react';
import Herader from '../../components/Header';

import './index.less';


class Home extends Component {
  constructor(props) {
    super(props);
    this.loginRef = React.createRef();
    this.state = {
      value: '',
    };
  }

  componentDidMount() {
    console.log(this);
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
        <div className="background"></div>
        <Herader />
        {routes && routes}
      </div>
    );
  }
}

export default Home;
