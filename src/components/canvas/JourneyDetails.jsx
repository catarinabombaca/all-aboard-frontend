import React, { Component } from 'react';
import JourneyService from './journey-service';
import JourneyDetailsService from './journey-details-service';
import EditJourneyDetail from './EditJourneyDetail';
import EditJourneyMilestones from './EditJourneyMilestones';
 
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

    setEditMode = (component) => {
      component === 'Journey' ? this.setState({mode: 'editJourney'}) : this.setState({mode: 'editJourneyMilestones'});
    }
  
    setViewMode = () => {
      this.setState({mode: 'view'});
    }

    getJourneyDetails = () => {
      const {id} = this.props.match.params
      this.journeyDetailsService.getJourneyDetails(id)
      .then(response => this.setState({journeyDetails: response}))
      .catch(err => console.log(err))
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
    const {name, expectedDuration} = this.state.journey
    const journeyDetails = this.state.journeyDetails
    return (
    <div className="col-sm-8">
      {this.state.mode === 'view' && <div>
        <button onClick={() => this.setEditMode('Journey')}>Edit</button>
        <button onClick={() => this.deleteItem()}>Delete</button>
        <h5>{name}</h5>
        <p>Expected duration: {expectedDuration}h</p>
        <button onClick={() => this.setEditMode('JourneyMilestones')}>Edit</button>
        {journeyDetails.length !==0 && <div>
        <h6>Milestones:</h6>
          <ul>
          {journeyDetails.map((detail) => <li key={detail._id}>{detail.order} - {detail.milestone.name}</li>)}
          </ul></div>}
    </div>}
    {this.state.mode === 'editJourney' && <EditJourneyDetail journeyDetails={journeyDetails} journey={this.state.journey} 
          setViewMode={this.setViewMode} getListItem={this.getListItem} {...this.props}/>}
    {this.state.mode === 'editJourneyMilestones' && <EditJourneyMilestones journeyDetails={journeyDetails} getJourneyDetails={this.getJourneyDetails}
          setViewMode={this.setViewMode} {...this.props}/>}
    </div>
    )
  }
}
 
export default JourneyDetails;