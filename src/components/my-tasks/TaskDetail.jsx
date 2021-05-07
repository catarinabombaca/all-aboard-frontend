import React, { Component } from 'react';
import TaskProgressService from '../members/task-p-service';
import SubmitTask from './SubmitTask';
 
class TaskDetail extends Component {

  state = {task: {}};
  taskProgressService = new TaskProgressService()

  editTask = (data) => {
      const id = this.props.match.params.id
      this.taskProgressService.editTaskProgress(id, data)
      .then(() => this.getTaskProgress())
      .catch(err => console.log(err))
  }
  
  getTaskProgress = () => {
      const id = this.props.match.params.id
      this.taskProgressService.getTaskProgress(id)
      .then(task =>{
        console.log('task', task)
        this.setState({task: task})
      })
      .catch(err => console.log(err))
  }

  componentDidMount() {
    if(this.props.mode === 'leader') {
      this.setState({task: this.props.task})
    } else {
      this.getTaskProgress();
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.match.params.id !== this.props.match.params.id && this.props.mode !== 'leader') {
        this.getTaskProgress();
        } else if (prevProps.task._id !== this.props.task._id) {
          this.setState({task: this.props.task})
        }
    }
 
  render() {
    if(this.state.task) {
  
      const {name, description, type, expectedDuration, docURL, course, status} = this.state.task
      return (
      <div className='col-12 d-flex flex-column'>
          <div className=''>
          {!status && this.props.mode !== 'leader' && <div className='d-flex flex-row justify-content-end'>
              <button className='mx-2 mt-3 btn btn-danger' onClick={() => this.editTask({start: Date.now(), status: 'Pending'})}>Start Task</button>
          </div>}
          <h4 className='my-4'>{name}</h4>
          <p><b>Type:</b> {type}</p>
          <p><b>Description:</b> {description}</p>
          <p><b>Expected duration:</b> {expectedDuration}h</p>
          {type !== "Course" && <a href={docURL} target="_blank" rel="noreferrer">Documentation URL</a>}
          {type === "Course" && <a href={course} target="_blank" rel="noreferrer">Course URL</a>}
          {this.props.mode === 'leader' && <p><b>{status}</b></p>}
          {status && this.props.mode !== 'leader' && <SubmitTask editTask={this.editTask} status={status} {...this.props}/>}
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