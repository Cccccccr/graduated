import React, { Component } from 'react';
import logo from './logo.svg';
import PostList from "../compon/post_list";
import Header from "../components/Header";
import List from "../components/List";
import Footer from "../components/Footer";
import './App.css';

class App extends Component {
  state = {
    todos: [
      {id: '001', name: '吃饭', done: false},
      {id: '002', name: '睡觉', done: true},
      {id: '003', name: '打代码', done: false}
    ],
    setState: this.setState.bind(this)
  }

  addTodos = todo => {
    const { todos } = this.state;
    this.setState({ todos: [...todos, todo]});
  }

  updateTodos = updateData => {
    const { todos } = this.state;
    for(let i = 0; i < todos.length; i++) {
      if(todos[i].id === updateData.id) {
        todos[i] = updateData;
        break;
      }
    }
    this.setState({ todos: [...todos] });
  }

  deleteTodo = id => {
    const newTodos = this.state.todos.filter(todo => todo.id !== id);
    this.setState({ todos: newTodos });
  }

  removeFinish = () => {
    const { todos } = this.state;
    const newTodos = todos.filter(todo => {
      return !todo.done;
    });
    this.setState({ todos: newTodos });
  }

  handleCheckAll = checked => {
    const newTodos = this.state.todos.map(todo => {
      return { ...todo, done: checked };
    });
    this.setState({ todos: newTodos });
  }

  // render() {
  //   const { todos, setState } = this.state;
  //   return (
  //     <div>
  //       <Header setState={setState} addTodos={this.addTodos} state={this.state}/>
  //       <List todos={todos} updateTodos={this.updateTodos} deleteTodo={this.deleteTodo}/>
  //       <Footer todos={todos} handleCheckAll={this.handleCheckAll} removeFinish={this.removeFinish} />
  //     </div>
  //   )
  // }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <PostList />
        </header>
      </div>
    );
  }
}

export default App;
