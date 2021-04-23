import React, { Component } from 'react';
import JourneyService from './journey-service';

class CreateJourney extends Component {

  state = {name: '', expectedDuration: 0};
  journeyService = new JourneyService();

  
  handleFormSubmit = (event) => {
    event.preventDefault();

    this.journeyService.createJourney(this.state)
    .then(() => {
      this.props.history.push('/canvas')
      this.props.getJourneys();
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
        <h3>Create Journey</h3>
        <form onSubmit={this.handleFormSubmit}>
          <label>Name</label>
          <input type="text" name="name" value={this.state.name} onChange={e => this.handleChange(e)}/>
          <label>Expected Duration</label>
          <input type="number" name="expectedDuration" value={this.state.expectedDuration} onChange={e => this.handleChange(e)}/>
              
          <button onClick={() => this.props.history.push('/canvas')}>Cancel</button>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default CreateJourney;