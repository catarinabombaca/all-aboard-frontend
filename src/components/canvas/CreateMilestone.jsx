import React, { Component } from 'react';
import MilestoneService from './milestone-service';

class CreateMilestone extends Component {

  state = {name: '', description: '', expectedDuration: 0};
  milestoneService = new MilestoneService();

  
  handleFormSubmit = (event) => {
    event.preventDefault();

    this.milestoneService.createMilestone(this.state)
    .then((response) => {
      this.props.history.push('/canvas')
      this.props.getMilestones();
    })
    .catch(err => console.log(err))
  }

    handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render(){
    return (
      <div>
        <h3>Create Milestone</h3>
        <form onSubmit={this.handleFormSubmit}>
          <label>Name:</label>
          <input type="text" name="name" value={this.state.name} onChange={e => this.handleChange(e)}/>
          <label>Description:</label>
          <textarea name="description" value={this.state.description} onChange={e => this.handleChange(e)}/>
          <label>Expected duration:</label>
          <input type="number" name="expectedDuration" value={this.state.expectedDuration} onChange={e => this.handleChange(e)}/>
          <button onClick={() => this.props.history.push('/canvas')}>Cancel</button>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    )
  }
}

export default CreateMilestone;