import React, { Component } from 'react';
import JourneyDetailsService from './journey-details-service';
 
class JourneyDetails extends Component {

  state = {journeyDetails: []};
  journeyDetailsService = new JourneyDetailsService();
  

  getListItem = () => {
    const id = this.props.id
    this.journeyDetailsService.getJourneyDetails(id)
    .then(response => this.setState({journeyDetails: response}))
    .catch(err => console.log(err))
    }

    componentDidMount() {
        this.getListItem();
    }

    componentDidUpdate(prevProps) {
    if(prevProps.id !== this.props.id) {
        this.getListItem();
        }
    }
 
  render() {
    console.log(this.state.journeyDetails)
    return (
    <div>
        {this.state.journeyDetails.length !==0 && <h5>{this.state.journeyDetails[0].journey.name}</h5>}
        {this.state.journeyDetails.length !==0 && <p>Description: {this.state.journeyDetails[0].journey.description}</p>}
        {this.state.journeyDetails.length !==0 && <p>Expected duration: {this.state.journeyDetails[0].journey.expectedDuration}h</p>}
        <h6>Milestones:</h6>
        {this.state.journeyDetails.length !==0 && <ul>
          {this.state.journeyDetails.map((detail) => <li key={detail._id}>{detail.order} - {detail.milestone.name}</li>)}
          </ul>}
    </div>
    )
  }
}
 
export default JourneyDetails;