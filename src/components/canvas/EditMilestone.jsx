import React, { Component } from 'react';
import MilestoneService from './milestone-service';

class EditMilestone extends Component {

  state = {...this.props.milestone};
  milestoneService = new MilestoneService();

  
  handleFormSubmit = (event) => {
    event.preventDefault();
    const {params} = this.props.match

    this.milestoneService.editMilestone(params.id, this.state)
    .then(() => {
        this.props.getListItem();
        this.props.setViewMode();
    })
    .catch(err => console.log(err))
  }

    handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  componentDidUpdate(prevProps) {
    if(prevProps.match.params.id !== this.props.match.params.id) {
        this.props.getListItem();
        this.props.getMilestoneTasks();
        this.props.setViewMode();
        }
    }

  render(){
    return (
      <div className='rounded-3 bg-blue'>
        <form onSubmit={this.handleFormSubmit}>
          <div className='d-flex flex-row justify-content-end'>
            <h4 className='mt-3 flex-grow-1 text-start ps-4'>Edit Milestone</h4>
            <button className='mx-2 mt-3 btn btn-dark-blue' onClick={() => this.props.setViewMode()}>Cancel</button>
            <input className='mx-2 mt-3 btn btn-danger' type="submit" value="Submit" />
          </div>

          <div className='my-3 mx-5 px-lg-5'>
            <label className="form-label">Name</label>
            <input className="form-control" type="text" name="name" value={this.state.name} onChange={e => this.handleChange(e)}/>
          </div>

          <div className='my-3 mx-5 px-lg-5'>
            <label className="form-label">Description</label>
            <textarea className="form-control"name="description" value={this.state.description} onChange={e => this.handleChange(e)}/>
          </div>

          <div className='my-3 mx-5 px-lg-5 pb-4'>
            <label className="form-label">Expected duration</label>
            <input className="form-control" type="number" name="expectedDuration" value={this.state.expectedDuration} onChange={e => this.handleChange(e)}/>
          </div>
        </form>
      </div>
    )
  }
}

export default EditMilestone;