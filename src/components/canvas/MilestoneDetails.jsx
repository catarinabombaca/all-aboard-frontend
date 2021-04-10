import React, { Component } from 'react';
import MilestoneService from './milestone-service';
 
class MilestoneDetails extends Component {

  state = {milestone: {}};
  milestoneService = new MilestoneService();
  

  getListItem = () => {
    const id = this.props.id
    this.milestoneService.getMilestone(id)
    .then(response => this.setState({milestone: response}))
    .catch(err => console.log(err))
    }

    getMilestoneTasks = () => {
        const id = this.props.id
        this.milestoneService.getMilestoneTasks(id)
        .then(response => this.setState({...this.state, tasks: response}))
        .catch(err => console.log(err))

    }

    componentDidMount() {
        this.getListItem();
        this.getMilestoneTasks();
    }

    componentDidUpdate(prevProps) {
    if(prevProps.id !== this.props.id) {
        this.getListItem();
        this.getMilestoneTasks();
        }
    }
 
  render() {
    const {name, description, expectedDuration} = this.state.milestone
    const tasks = this.state.tasks
    return (
    <div>
        <h5>{name}</h5>
        <p>Description: {description}</p>
        <p>Expected duration: {expectedDuration}h</p>
        <h6>Associated tasks:</h6>
        {tasks && <ul>
          {tasks.map((task) => <li key={task._id}>{task.name}</li>)}
          </ul>}
    </div>
    )
  }
}
 
export default MilestoneDetails;