import React, { Component } from 'react';

class Lazy extends Component {
  state = {
    count: 0,
  }

  add = () => {
    let { count } = this.state;
    this.setState({count: count+1})
  }

  render() {
    console.log(`Lazy render`, this.props);
    const { routes = false } = this.props;
    return (
      <div>
        I am Lazy.
        {
          this.props.children
        }
        {
          routes && routes
        }
        <div>count: {this.state.count}</div>
        <button onClick={this.add}>Lazy +1</button>
      </div>
    );
  }
}

export default Lazy;