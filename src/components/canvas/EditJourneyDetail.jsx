import React, { Component } from 'react';
import JourneyService from './journey-service';
import JourneyDetailsService from './journey-details-service';

class EditJourneyDetail extends Component {

  state = {...this.props.journey};
  journeyService = new JourneyService();
  journeyDetailsService = new JourneyDetailsService();

  
  handleFormSubmit = (event) => {
    event.preventDefault();
    const {params} = this.props.match

    this.journeyService.editJourney(params.id, this.state)
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

  render(){
    return (
      <div className='rounded-3 bg-blue'>
        <form onSubmit={this.handleFormSubmit}>
          <div className='d-flex flex-row justify-content-end'>
            <h4 className='mt-3 flex-grow-1 text-start ps-4'>Edit Journey</h4>
            <button className='mx-2 mt-3 btn btn-light' onClick={() => this.props.setViewMode()}>Cancel</button>
            <input className='mx-2 mt-3 btn btn-danger' type="submit" value="Submit" />
          </div>
          <div className='my-3 mx-5 px-lg-5'>
            <label className="form-label">Name:</label>
            <input className="form-control" type="text" name="name" value={this.state.name} onChange={e => this.handleChange(e)}/>
          </div>
          <div className='my-4 mx-5 px-lg-5 pb-4'>
            <label className="form-label">Expected duration:</label>
            <input className="form-control" type="number" name="expectedDuration" value={this.state.expectedDuration} onChange={e => this.handleChange(e)}/>
          </div>
        </form>
      </div>
    )
  }
}

export default EditJourneyDetail;