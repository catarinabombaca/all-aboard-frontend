import React, { Component } from 'react'

export default class TaskCard extends Component {

    showButton = (id, selectedTasks) => {
        return !selectedTasks.includes(id)
    }

    render() {
        const {_id, name} = this.props.task
        return (
            <li>
                <p>{name}</p>
                {this.showButton(_id, this.props.selectedTasks) && !this.props.removeBtn && <button onClick={() => this.props.addTaskToMilestone(this.props.task)}>Add task</button>}
                {this.props.removeBtn && <button onClick={() => this.props.removeTaskFromMilestone(this.props.task)}>Remove task</button>}
            </li>
        )
    }
}
