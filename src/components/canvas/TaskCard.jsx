import React, { Component } from 'react'

export default class TaskCard extends Component {

    showButton = (id, selectedTasks) => {
        return !selectedTasks.includes(id)
    }

    render() {
        return (
            <li>
                <p>{this.props.name}</p>
                {this.showButton(this.props.id, this.props.selectedTasks) && <button>Add task</button>}
            </li>
        )
    }
}
