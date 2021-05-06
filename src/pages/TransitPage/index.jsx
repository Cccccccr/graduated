import React, { Component } from 'react';

export default class TransitPage extends Component {
  componentDidMount() {
    const transitData = localStorage.getItem('transitInfo')
    ? JSON.parse(localStorage.getItem('transitInfo'))
    : {};
    localStorage.removeItem('transitInfo');
    this.$history.push({
      pathname: transitData.path || '/user',
      search: transitData.search || '',
    });
  }

  render() {
    return <div></div>;
  }
}
