import React, { Component } from 'react'

export default class TaskCard extends Component {

    showButton = (id, selectedTasks) => {
        return !selectedTasks.includes(id)
    }

    render() {
        const {_id, name} = this.props.task
        return (
            <li className="list-group-item d-flex flex-row justify-content-start align-itens-center">
                <p className='flex-grow-1 text-start'>{name}</p>
                {this.showButton(_id, this.props.selectedTasks) && !this.props.removeBtn && <button 
                className="m-2 btn btn-dark-blue btn-sm align-self-end" onClick={() => this.props.addTaskToMilestone(this.props.task)}>Add</button>}
                {this.props.removeBtn && <button 
                className='m-2 btn btn-danger btn-sm align-self-end' onClick={() => this.props.removeTaskFromMilestone(this.props.task)}>Remove</button>}
            </li>
        )
    }
}
