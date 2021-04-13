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
    .then(response => this.setState({...this.state, milestone: response}))
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
      if(prevProps.match.params.id.id !== this.props.match.params.id.id) {
          this.getListItem();
          this.getMilestoneTasks();
          }
      }
 
  render() {
    const {name, description, expectedDuration} = this.state.milestone
    const tasks = this.state.tasks
    return (
    <div>
        {this.state.mode === 'view' && <div>
        <button onClick={() => this.setEditMode()}>Edit</button>
        <button onClick={() => this.deleteItem()}>Delete</button>
        <h5>{name}</h5>
        <p>Description: {description}</p>
        <p>Expected duration: {expectedDuration}h</p>
        {tasks.length !==0 && <div>
          <h6>Associated tasks:</h6>
          <ul>
          {tasks.map((task) => <li key={task._id}>{task.name}</li>)}
          </ul></div>}
          </div>}
          {this.state.mode === 'edit' && <EditMilestone milestone={this.state.milestone} tasks={this.state.tasks} 
          setViewMode={this.setViewMode} getListItem={this.getListItem} {...this.props}/>}
    </div>
    )
  }
}
 
export default MilestoneDetails;