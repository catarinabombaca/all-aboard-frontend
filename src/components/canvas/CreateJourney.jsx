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
        <h3 className='text-white'>Create Journey</h3>
        <form onSubmit={this.handleFormSubmit}>
          <div className='my-3 mx-5 px-lg-5 text-white'>
            <label className='form-label'>Name</label>
            <input className='form-control'type="text" name="name" value={this.state.name} onChange={e => this.handleChange(e)}/>
          </div>
          <div className='my-3 mx-5 px-lg-5 text-white'>
            <label className='form-label'>Expected Duration</label>
            <input className='form-control' type="number" name="expectedDuration" value={this.state.expectedDuration} onChange={e => this.handleChange(e)}/>
          </div>
              
          <button className='mx-2 mt-3 btn btn-dark-blue' onClick={() => this.props.history.push('/canvas')}>Cancel</button>
          <input className='mx-2 mt-3 btn btn-danger' type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default CreateJourney;