import React, { Component } from "react";

export default class CompileComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      C: null,
    };
  }

  componentDidMount() {
    this.compileComponent();
  }

  compileComponent = async () => {
    const { loader } = this.props;
    loader().then((value) => {
      this.setState({
        C: value.default,
      });
    });
  };

  render() {
    const { C } = this.state;

    return (
      <>
        {C && (
          <C {...this.props}></C>
        )}
      </>
    );
  }
}
