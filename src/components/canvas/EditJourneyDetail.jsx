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
      <div>
        <h3>Edit Journey</h3>
        <form onSubmit={this.handleFormSubmit}>
          <label>Name:</label>
          <input type="text" name="name" value={this.state.name} onChange={e => this.handleChange(e)}/>
          <label>Description:</label>
          <textarea name="description" value={this.state.description} onChange={e => this.handleChange(e)}/>
          <label>Expected duration:</label>
          <input type="number" name="expectedDuration" value={this.state.expectedDuration} onChange={e => this.handleChange(e)}/>
              
          <button onClick={() => this.props.setViewMode()}>Cancel</button>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default EditJourneyDetail;