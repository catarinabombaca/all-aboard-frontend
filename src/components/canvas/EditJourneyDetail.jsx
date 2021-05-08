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

  componentDidUpdate(prevProps) {
    if(prevProps.match.params.id !== this.props.match.params.id) {
      this.props.getListItem();
      this.props.setViewMode();
      }
  }

  render(){
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <div className='d-flex flex-row justify-content-end'>
            <h4 className='mt-3 flex-grow-1 text-start ps-4'>Edit Journey</h4>
            <button className='mx-2 mt-3 btn btn-dark-blue' onClick={() => this.props.setViewMode()}>Cancel</button>
            <input className='mx-2 mt-3 btn btn-danger' type="submit" value="Submit" />
          </div>
          <hr></hr>
          <div className='my-3 mx-5 px-lg-5 d-flex flex-column'>
            <label className="form-label">Name</label>
            <input className="form-control" type="text" name="name" value={this.state.name} onChange={e => this.handleChange(e)}/>
          </div>
          <div className='my-4 mx-5 px-lg-5 pb-4'>
            <label className="form-label">Expected Duration (hours)</label>
            <input className="form-control" type="number" name="expectedDuration" value={this.state.expectedDuration} onChange={e => this.handleChange(e)}/>
          </div>
        </form>
      </div>
    )
  }
}

export default EditJourneyDetail;