import React, { Component } from 'react';
import JourneyService from './journey-service';
import JourneyDetailsService from './journey-details-service';
import EditJourneyDetail from './EditJourneyDetail';
 
class JourneyDetails extends Component {

  state = {journeyDetails: [], journey: {}, mode: 'view'};
  journeyService = new JourneyService();
  journeyDetailsService = new JourneyDetailsService();
  

  getListItem = () => {
    const {id} = this.props.match.params
    this.journeyService.getJourney(id)
    .then(response => this.setState({journey: response}))
    .catch(err => console.log(err))
    }

    getJourneyDetails = () => {
      const {id} = this.props.match.params
      this.journeyDetailsService.getJourneyDetails(id)
      .then(response => this.setState({journeyDetails: response}))
      .catch(err => console.log(err))
      }

    setEditMode = () => {
      this.setState({...this.state, mode: 'edit'});
    }
  
    setViewMode = () => {
      this.setState({...this.state, mode: 'view'});
    }

    deleteItem = () => {
      const { params } = this.props.match;
      this.journeyService.deleteJourney(params.id)
      .then(() =>{
        this.getJourneys();
        this.props.history.push('/canvas');       
      })
      .catch((err)=>{console.log(err)})
    }

    componentDidMount() {
        this.getListItem();
        this.getJourneyDetails();
    }

    componentDidUpdate(prevProps) {
      if(prevProps.match.params.id.id !== this.props.match.params.id.id) {
        this.getListItem();
        this.getJourneyDetails();
        }
    }
 
  render() {
    const {name, description, expectedDuration} = this.state.journey
    const journeyDetails = this.state.journeyDetails
    return (
    <div>
      {this.state.mode === 'view' && <div>
        <button onClick={() => this.setEditMode()}>Edit</button>
        <button onClick={() => this.deleteItem()}>Delete</button>
        <h5>{name}</h5>
        <p>Expected duration: {expectedDuration}h</p>
        {journeyDetails.length !==0 && <div>
        <h6>Milestones:</h6>
          <ul>
          {journeyDetails.map((detail) => <li key={detail._id}>{detail.order} - {detail.milestone.name}</li>)}
          </ul></div>}
    </div>}
    {this.state.mode === 'edit' && <EditJourneyDetail journeyDetails={this.state.journeyDetails} journey={this.state.journey} setViewMode={this.setViewMode} getListItem={this.getListItem} {...this.props}/>}
    </div>
    )
  }
}
 
export default JourneyDetails;