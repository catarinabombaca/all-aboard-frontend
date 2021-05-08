import React, { Component } from 'react';
import TaskProgressService from '../members/task-p-service';
import SubmitTask from './SubmitTask';
 
class TaskDetail extends Component {

  state = {task: {}};
  taskProgressService = new TaskProgressService()

  editTask = (id, data) => {
      this.taskProgressService.editTaskProgress(id, data)
      .then(() => this.props.getMilestoneTasksProgress())
      .catch(err => console.log(err))
  }
  
  // getTaskProgress = (id) => {
  //     this.taskProgressService.getTaskProgress(id)
  //     .then(task =>{this.setState({task: task})})
  //     .catch(err => console.log(err))
  // }

  componentDidMount() {
      this.setState({task: this.props.task})
  }

  componentDidUpdate(prevProps) {
      if (prevProps.task._id !== this.props.task._id) {
          this.setState({task: this.props.task})
        }
    }
 
  render() {
    if(this.state.task) {
  
      const {name, description, type, expectedDuration, docURL, course, status, _id, submitURL} = this.state.task
      let color = '';
      status === 'Closed' ? color='bg-success' : status === 'Pending' ? color='bg-warning' : color='bg-secondary'
      return (
      <div className='col-12 col-lg-8 c d-flex flex-column'>
          <div className='text-start'>
          <h5 className='m-0'>
            {name} 
            <span className={`ms-2 badge ${color}`}>{status ? status : 'Not Started'}</span>
            {!status && this.props.mode !== 'Team Leader' && <button className='badge btn btn-danger ms-2' onClick={() => this.editTask(_id, {start: Date.now(), status: 'Pending'})}>Start</button>}
            </h5>
          <span className='fs-6'>{type}</span>
          <p className='fs-6'><b>Expected duration:</b> {expectedDuration}h</p>
          <p className='fs-6'><b>Description:</b> {description}</p>
          {type !== "Course" && <a className='fs-6 bi bi-link-45deg' href={docURL} target="_blank" rel="noreferrer">documentation URL</a>}
          {type === "Course" && <a className='fs-6 bi bi-link-45deg' href={course} target="_blank" rel="noreferrer">course URL</a>}
          {status && this.props.mode !== 'Team Leader' && <SubmitTask editTask={this.editTask} id={_id} submitURL={submitURL} status={status} {...this.props}/>}
          </div>
      </div>
      )
    } else {

      return (
        <div className='col-12 d-flex flex-column my-5'>
              No task selected!
        </div>
      )
    }
  }
}
 
export default TaskDetail;