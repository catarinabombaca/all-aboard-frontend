import React, { Component } from 'react';
import TaskService from './task-service';
 
class TaskDetails extends Component {

  state = {task: {}};
  taskService = new TaskService();
  

  getListItem = () => {
    const id = this.props.id
    this.taskService.getTask(id)
    .then(response => this.setState({task: response}))
    .catch(err => console.log(err))
    }

  componentDidMount() {
    this.getListItem();
}

componentDidUpdate(prevProps) {
    if(prevProps.id !== this.props.id) {
        this.getListItem();
        }
    }
 
  render() {
    const {name, description, type, expectedDuration, milestones} = this.state.task
    return (
    <div>
        <h5>{name}</h5>
        <p>Type: {type}</p>
        <p>Description: {description}</p>
        <p>Expected duration: {expectedDuration}h</p>
        <h6>Associated milestones:</h6>
        {milestones && <ul>
          {milestones.map((milestone) => <li key={milestone._id}>{milestone.name}</li>)}
          </ul>}
    </div>
    )
  }
}
 
export default TaskDetails;