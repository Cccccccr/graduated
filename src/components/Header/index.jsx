import React, { Component } from 'react';
import PropTypes from "prop-types";
import { nanoid } from 'nanoid';

class Header extends Component {
    static propTypes = {
        addTodos: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        if(props.setState) {
            this.setState = props.setState;
        }
    }

    // componentDidMount() {
    //     let { state, setState } = this.props;
    //     setState({...state, todos: [...state.todos, { id: '004', name: '自己实现修改父组件state', done: true }]})
    // }

    handleKeyUp = event => {
        if(event.keyCode !== 13) return;
        const value = event.target.value;
        if(value) {
            const { state, addTodos } = this.props;
            const todo = { id: nanoid(), name: value, done: false }
            const newTodos = [
                ...state.todos,
                todo
            ];
            // 通过setState透传的方式
            // this.setState({...state, todos: newTodos});

            // 通过传递函数，执行函数的方式
            addTodos(todo);
            event.target.value = '';
        }

    }

    render() {
        return (
            <div>
                <input onKeyUp={this.handleKeyUp} type="text" placeholder="请输入你的任务名称，按回车键确认"/>
            </div>
        );
    }
}

export default Header;