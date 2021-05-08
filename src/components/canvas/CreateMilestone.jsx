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
      <div className="bg-blue col-md-8 d-flex flex-column align-items-stretch justify-content-start">
        <form onSubmit={this.handleFormSubmit}>
          <div className='d-flex flex-row justify-content-end'>
            <h4 className='mt-3 flex-grow-1 text-start ps-4'>Create Milestone</h4>
            <button className='mx-2 mt-3 btn btn-dark-blue' onClick={() => this.props.history.push('/canvas')}>Cancel</button>
            <input className='mx-2 mt-3 btn btn-danger' type="submit" value="Submit"/>
          </div>
          <hr></hr>
          <div className='my-3 mx-5 px-lg-5 d-flex flex-column'>
            <label className='form-label'>Name</label>
            <input className='form-control'type="text" name="name" value={this.state.name} onChange={e => this.handleChange(e)}/>
          </div>
          <div className='my-3 mx-5 px-lg-5 d-flex flex-column'>
            <label className='form-label'>Description</label>
            <textarea className='form-control' name="description" value={this.state.description} onChange={e => this.handleChange(e)}/>
          </div>
          <div className='my-4 mx-5 px-lg-5 pb-4'>
            <label className='form-label'>Expected Duration</label>
            <input className='form-control'type="number" name="expectedDuration" value={this.state.expectedDuration} onChange={e => this.handleChange(e)}/>
          </div>
        </form>
      </div>
    )
  }
}

export default CreateMilestone;