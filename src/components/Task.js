import React, { Component } from 'react';

class Task extends Component {
    render() {
        return (
            <h3 className="task">{this.props.taskName}</h3>
        );
    }
}

export default Task;
