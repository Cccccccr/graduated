import React, { Component } from 'react';

class Footer extends Component {
    getFinished = () =>{
        return this.props.todos.reduce((acc, cur) => {
            return acc + (cur.done ? 1 : 0);
        }, 0) ;
    }

    handleCheckAll = event => {
        const checked = event.target.checked;
        this.props.handleCheckAll(checked);
    }

    render() {
        const { todos } = this.props;
        const finished = this.getFinished();
        const check = finished === todos.length && todos.length !== 0;
        return (
            <div>
                <label>
                    <input type="checkbox" checked={check} onChange={this.handleCheckAll}/>
                    <span>
                        <span>已完成{finished}</span> / <span>全部{todos.length}</span>
                    </span>
                    <button onClick={this.props.removeFinish}>清除已完成任务</button>
                </label>
            </div>
        );
    }
}

export default Footer;