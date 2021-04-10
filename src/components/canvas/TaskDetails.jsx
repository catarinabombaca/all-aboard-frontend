import React, { Component } from 'react';
import JourneyDetailsService from './journey-details-service';
import MilestoneService from './milestone-service';
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
    return <div>
        {console.log('task', this.state.task)}
        {this.state.task && <h4>{this.state.task._id}</h4>}
    </div>
  }
}
 
export default TaskDetails;