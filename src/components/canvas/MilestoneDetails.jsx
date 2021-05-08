import React, { Component } from 'react';
import MilestoneService from './milestone-service';
import EditMilestone from './EditMilestone';
import EditMilestoneTasks from './EditMilestoneTasks';
 
class MilestoneDetails extends Component {

  state = {milestone: {}, mode: 'view', tasks: []};
  milestoneService = new MilestoneService();
  

  getListItem = () => {
    const {id} = this.props.match.params
    this.milestoneService.getMilestone(id)
    .then(response => this.setState({milestone: response}))
    .catch(err => console.log(err))
    }
  
    setEditMode = (component) => {
      component === 'Milestone' ? this.setState({...this.state, mode: 'editMilestone'}) : this.setState({...this.state, mode: 'editMilestoneTasks'});
    }
  
    setViewMode = () => {
      this.setState({...this.state, mode: 'view'});
    }

    deleteItem = () => {
      const { params } = this.props.match;
      this.milestoneService.deleteMilestone(params.id)
      .then(() =>{
        this.getMilestones();
        this.props.history.push('/canvas');       
      })
      .catch((err)=>{console.log(err)})
    }

    getMilestoneTasks = () => {
        const {id} = this.props.match.params
        this.milestoneService.getMilestoneTasks(id)
        .then(response => this.setState({...this.state, tasks: response}))
        .catch(err => console.log(err))

    }

    componentDidMount() {
        this.getListItem();
        this.getMilestoneTasks();
    }

    componentDidUpdate(prevProps) {
      if(prevProps.match.params.id !== this.props.match.params.id) {
          this.getListItem();
          this.getMilestoneTasks();
          }
      }
 
  render() {
    const {name, description, expectedDuration} = this.state.milestone
    const tasks = this.state.tasks
    return (
    <div className="bg-blue col-md-8 d-flex flex-column align-items-stretch justify-content-start">
        {this.state.mode === 'view' && <div>
          <div>
            <div className='d-flex flex-row justify-content-end'>
              <h4 className='mt-3 flex-grow-1 text-start ps-4'>{name}</h4>
              <button className='mx-2 mt-3 btn btn-dark-blue' onClick={() => this.setEditMode("Milestone")}>Edit</button>
              <button className='mx-2 mt-3 btn btn-danger' onClick={() => this.deleteItem()}>Delete</button>
            </div>
            <div>
              <p className='text-start ps-4 fs-5'><b>Description: </b>{description}</p>
              <p className='text-start ps-4 fs-5 pb-3'><b>Expected duration:</b> {expectedDuration}h</p>
            </div>
          </div>

          <hr></hr>

          <div>
            <div className='d-flex flex-row justify-content-end'>
              <h4 className='mt-3 flex-grow-1 text-start ps-4'>Associated tasks:</h4>
              <button className='mx-2 mt-3 btn btn-dark-blue' onClick={() => this.setEditMode("MilestoneTasks")}>Edit</button>
            </div>
            {tasks.length ===0 && <p className='pb-4'>No tasks yet!</p>}
            {tasks.length !==0 && <ul className='pb-3'>{tasks.map((task) => <li  className='text-start fs-5 list-unstyled' key={task._id}>{task.name}</li>)}</ul>}
          </div>
        </div>}

        {this.state.mode === 'editMilestone' && <EditMilestone milestone={this.state.milestone} tasks={this.state.tasks} 
          setViewMode={this.setViewMode} getListItem={this.getListItem} getMilestoneTasks={this.getMilestoneTasks} {...this.props}/>}
        {this.state.mode === 'editMilestoneTasks' && <EditMilestoneTasks tasks={this.state.tasks} getMilestoneTasks={this.getMilestoneTasks}
          setViewMode={this.setViewMode} getListItem={this.getListItem} {...this.props}/>}
    </div>
    )
  }
}
 
export default MilestoneDetails;