import React, { Component } from 'react';
import { connect } from 'react-redux';

import {Button} from 'antd';


function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

class User extends Component {
  btnClick = () => {
    this.$history.push('/user/article');
  }

  render() {
    const { routes = false } = this.props;

    return (
      <div>
        I am user page
        <Button onClick={this.btnClick}>click</Button>
        {
          routes && routes
        }
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);