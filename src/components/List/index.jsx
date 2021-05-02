import React, { Component } from "react";
import Item from "../Item";

class List extends Component {
  render() {
    const { todos, updateTodos, deleteTodo } = this.props;
    return (
      <div>
        <ul>
          {todos.map((todo) => {
            return (
              <Item
                key={todo.name + todo.id}
                {...todo}
                updateTodo={updateTodos}
                deleteTodo={deleteTodo}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default List;
