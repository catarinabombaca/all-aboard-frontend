import React, { Component } from 'react';
import TaskProgressService from '../members/task-p-service';
import SubmitTask from './SubmitTask';
 
class TaskDetail extends Component {

  state = {task: {}};
  taskProgressService = new TaskProgressService()

  submitTask = (data) => {
      const id = this.props.match.params.id
      this.taskProgressService.editTaskProgress(id, data)
      .then(() => this.getTaskProgress())
      .catch(err => console.log(err))
  }
  

  getTaskProgress = () => {
      const id = this.props.match.params.id
      this.taskProgressService.getTaskProgress(id)
      .then(task => this.setState({task: task}))
      .catch(err => console.log(err))
  }

  componentDidMount() {
    this.getTaskProgress();
  }

  componentDidUpdate(prevProps) {
    if(prevProps.match.params.id !== this.props.match.params.id) {
        this.getTaskProgress();
        }
    }
 
  render() {
    const {name, description, type, expectedDuration, docURL, status} = this.state.task
    return (
    <div>
        {<div>
        <h5>{name}</h5>
        <p>Type: {type}</p>
        <p>Description: {description}</p>
        <p>Expected duration: {expectedDuration}h</p>
        {type !== "Course" && <p>Further documentation: {docURL}</p>}
        {type === "Course" && <p>Course URL: {docURL}</p>}
        </div>}
        {status === "Pending" && <SubmitTask submitTask={this.submitTask} {...this.props}/>}
    </div>
    )
  }
}
 
export default TaskDetail;