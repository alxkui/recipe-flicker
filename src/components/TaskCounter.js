import React, { Component } from 'react';

class TaskCounter extends Component {
    render() {
        return (
            <div className="task-counter">
                <span>Step: {this.props.taskNo} / {this.props.allTasks}</span>
            </div>
        );
    }
}

export default TaskCounter;
