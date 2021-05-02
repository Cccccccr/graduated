import React, { Component } from "react";

class Item extends Component {
  state = {
    light: false,
  };

  handleMouse = (flag) => {
    return () => {
      this.setState({ light: flag });
    };
  };

  handleCheck = event => {
      const { name, id } = this.props;
      this.props.updateTodo({ id, name, done: event.target.checked })
  }

  delete = event => {
      const { id } = this.props;
      this.props.deleteTodo(id);
  }

  render() {
    const { name, done } = this.props;
    const { light } = this.state
    return (
      <li
        onMouseEnter={this.handleMouse(true)}
        onMouseLeave={this.handleMouse(false)}
        style={{ backgroundColor: light ? "#ccc" : "" }}
      >
        <label>
          <input type="checkbox" checked={done} onChange={this.handleCheck} />
          <span>{name}</span>
        </label>
        <button style={{ display: light ? '' : 'none' }} onClick={this.delete}>删除</button>
      </li>
    );
  }
}

export default Item;
