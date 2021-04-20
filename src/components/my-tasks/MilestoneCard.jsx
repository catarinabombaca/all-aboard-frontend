import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import MilestoneProgressService from '../members/milestone-p-service';

export default class MilestoneCard extends Component {

    state = {tasks: [], showTasks: false}
    milestoneProgressService = new MilestoneProgressService();

    toggleShowTasks = () => {
        const showTasks = this.state.showTasks
        this.setState({showTasks: !showTasks})
    }

    getMilestoneTasksProgress = () => {
        this.milestoneProgressService.getMilestoneTasksProgress(this.props.milestone._id)
        .then(tasks => {this.setState({tasks: tasks})})
        .catch(err => console.log(err))
    }

    componentDidMount() {
        this.getMilestoneTasksProgress()
    }


    render() {
        const {name, description, expectedDuration} = this.props.milestone
        return (
        <li>
           <button onClick={() => this.toggleShowTasks()}>Milestone - {name}</button>
           <ul>
               {this.state.showTasks && this.state.tasks.map(task => {
                   return <li key={task._id}><Link to={`/my-tasks/${task._id}`}>{task.name}</Link></li>
               })}
           </ul>
        </li>
            )
    } 
}