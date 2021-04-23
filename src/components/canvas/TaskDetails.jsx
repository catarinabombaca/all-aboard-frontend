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
    console.log(this.props)
    const {name, description, type, expectedDuration, milestones} = this.state.task
    return (
    <div className="col-sm-8">
        {this.state.mode === 'view' && <div>
        <button onClick={() => this.setEditMode()}>Edit</button>
        <button onClick={() => this.deleteItem()}>Delete</button>
        <h5>{name}</h5>
        <p>Type: {type}</p>
        <p>Description: {description}</p>
        <p>Expected duration: {expectedDuration}h</p>
        <h6>Associated milestones:</h6>
        {milestones && <ul>
          {milestones.map((milestone) => <li key={milestone._id}>{milestone.name}</li>)}
          </ul>}
        </div>}
        {this.state.mode === 'edit' && <EditTask task={this.state.task} setViewMode={this.setViewMode} getListItem={this.getListItem} {...this.props}/>}
    </div>
    )
  }
}
 
export default TaskDetails;