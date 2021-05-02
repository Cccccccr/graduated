import React, { Component } from 'react'

export default class AbstractRouter extends Component {
  render() {
    console.log(this.props, '----------------')
    const { routes = false } = this.props;
    return (
      <div>
        {
          routes && routes
        }
      </div>
    )
  }
}
