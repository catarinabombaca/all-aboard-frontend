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
    const {name, description, type, expectedDuration, docURL, course, status} = this.state.task
    return (
    <div className='col-12 col-lg-8 d-flex flex-column'>
        {<div className='rounded-3 bg-blue my-4 my-lg-0'>
        <h4 className='my-4'>{name}</h4>
        <p><b>Type:</b> {type}</p>
        <p><b>Description:</b> {description}</p>
        <p><b>Expected duration:</b> {expectedDuration}h</p>
        {type !== "Course" && <a href={docURL} target="_blank">Documentation URL</a>}
        {type === "Course" && <a href={course} target="_blank">Course URL</a>}
        </div>}
        {status === "Pending" && <SubmitTask submitTask={this.submitTask} {...this.props}/>}
    </div>
    )
  }
}
 
export default TaskDetail;