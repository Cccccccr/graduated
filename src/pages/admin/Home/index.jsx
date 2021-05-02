import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

class Home extends Component {
  btnClick = () => {
    this.$history.push('/admin/unreachable');
  };

  render() {
    return (
      <>
        <Button onClick={this.btnClick}>click</Button>
        <div>admin home 1234</div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
