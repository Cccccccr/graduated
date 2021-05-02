import React, { PureComponent } from 'react';

class About extends PureComponent {
  state = {
    count: 0,
  }

  add = () => {
    let { count } = this.state;
    this.setState({count: count+1})
  }

  render() {
    console.log(`About render`);
    const { routes = false } = this.props;
    return (
      <div>
        I am About.
        {
          routes && routes
        }
        <div>count: {this.state.count}</div>
        <button onClick={this.add}>About +1</button>
      </div>
    );
  }
}

export default About;
