import React, { Component } from 'react';
import TaskService from './task-service';
import EditTask from './EditTask';
 
class TaskDetails extends Component {

  state = {task: {}, mode: 'view'};
  taskService = new TaskService();
  

  getListItem = () => {
    const {id} = this.props.match.params
    this.taskService.getTask(id)
    .then(response => this.setState({...this.state, task: response}))
    .catch(err => console.log(err))
    }
  
  setEditMode = () => {
    this.setState({...this.state, mode: 'edit'});
  }

  setViewMode = () => {
    this.setState({...this.state, mode: 'view'});
  }

  deleteItem = () => {
    const { params } = this.props.match;
    console.log(params.id)
    this.taskService.deleteTask(params.id)
    .then(() =>{
      this.props.getTasks();
      this.props.history.push('/canvas');       
    })
    .catch((err)=>{console.log(err)})
  }

  componentDidMount() {
    this.getListItem();
}

  componentDidUpdate(prevProps) {
    if(prevProps.match.params.id !== this.props.match.params.id) {
        this.getListItem();
        }
    }
 
  render() {
    const {name, description, type, expectedDuration, course, docURL} = this.state.task
    return (
    <div className="bg-blue col-md-8 d-flex flex-column align-items-stretch justify-content-start">
        {this.state.mode === 'view' && <div>
        <div>
          <div className='d-flex flex-row justify-content-end'>
            <h4 className='mt-3 flex-grow-1 text-start ps-4'>{name}</h4>
            <button className='mx-2 mt-3 btn btn-dark-blue' onClick={() => this.setEditMode()}>Edit</button>
            <button  className='mx-2 mt-3 btn btn-danger' onClick={() => this.deleteItem()}>Delete</button>
          </div>

          <div className='d-flex flex-column justify-content-start'>
            <p className='text-start ps-4 fs-5'><b>Type:</b> {type}</p>
            <p className='text-start ps-4 fs-5'><b>Description:</b> {description}</p>
            {type !== "Course" && <a className='fs-6 bi bi-link-45deg text-start ps-4 fs-5' href={docURL} target="_blank" rel="noreferrer">documentation URL</a>}
            {type === "Course" && <a className='fs-6 bi bi-link-45deg text-start ps-4 fs-5' href={course} target="_blank" rel="noreferrer">course URL</a>} 
            <p className='text-start ps-4 fs-5 pb-3'><b>Expected duration:</b> {expectedDuration}h</p>
          </div>
          <hr></hr>
        </div>
        </div>}

        {this.state.mode === 'edit' && <EditTask task={this.state.task} setViewMode={this.setViewMode} getListItem={this.getListItem} {...this.props}/>}
    </div>
    )
  }
}
 
export default TaskDetails;