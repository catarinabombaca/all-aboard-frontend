import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import MilestoneProgressService from '../members/milestone-p-service';
import TaskDetail from './TaskDetail';

export default class MilestoneCard extends Component {

    state = {tasks: [], selectedTask: null, showTasks: false}
    milestoneProgressService = new MilestoneProgressService();


    getMilestoneTasksProgress = () => {
        this.milestoneProgressService.getMilestoneTasksProgress(this.props.milestone._id)
        .then(tasks => {this.setState({tasks: tasks})})
        .catch(err => console.log(err))
    }

    componentDidMount() {
        this.getMilestoneTasksProgress()
    }


    render() {
        const {name, _id} = this.props.milestone
        return (
        <div className='accordion-item'>
            <h2 className="accordion-header" id={`heading${_id}`}>
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${_id}`}  aria-expanded="true" aria-controls={`collapse${_id}`}>
                Milestone - {name}
                </button>
            </h2>
            <div id={`collapse${_id}`} className="accordion-collapse collapse show" aria-labelledby={`heading${_id}`} data-bs-parent="#accordionExample">
                <div className="accordion-body">
                    {this.state.tasks.length === 0 && <p>No tasks yet!</p>}
                        {this.state.tasks.map(task => {
                        return <button className='badge bg-primary rounded-pill mx-1 px-3' onClick={() => this.setState({selectedTask: task})}>{task.name}</button>
                        })}
                    {this.state.selectedTask && <TaskDetail {...this.props} task={this.state.task} mode='leader'/>}
                </div>
            </div>
        </div>
            )
    } 
}