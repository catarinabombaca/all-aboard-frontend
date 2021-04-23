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
      if(prevProps.match.params.id !== this.props.match.params.id) {
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
        <div className='rounded-3 bg-blue'>
          <div className='d-flex flex-row justify-content-end'>
            <h4 className='mt-3 flex-grow-1 text-start ps-4'>{name}</h4>
            <button className='mx-2 mt-3 btn btn-dark-blue' onClick={() => this.setEditMode('Journey')}>Edit</button>
            <button className='mx-2 mt-3 btn btn-danger' onClick={() => this.deleteItem()}>Delete</button>
          </div>
           <p className='text-start ps-4 fs-5 pb-3'><b>Expected duration:</b> {expectedDuration}h</p>
        </div>

        <div className='rounded-3 bg-blue'>
          <div className='d-flex flex-row justify-content-end'>
           <h4 className='mt-3 flex-grow-1 text-start ps-4'>Milestones:</h4>
           <button className='mx-2 mt-3 btn btn-dark-blue' onClick={() => this.setEditMode('JourneyMilestones')}>Edit</button>
          </div>
          {journeyDetails.length === 0 && <p className='pb-4'>No milestones yet!</p>}
           {journeyDetails.length !==0 && <ul className='pb-3'>
          {journeyDetails.sort((a, b) => a.order - b.order)
                          .map((detail) => <li className='text-start fs-5 list-unstyled' key={detail._id}>{detail.order} - {detail.milestone.name}</li>)}
          </ul>}
        </div>
      </div>}

    {this.state.mode === 'editJourney' && <EditJourneyDetail journeyDetails={journeyDetails} journey={this.state.journey} 
          setViewMode={this.setViewMode} getListItem={this.getListItem} getJourneyDetails={this.getJourneyDetails} {...this.props}/>}
    {this.state.mode === 'editJourneyMilestones' && <EditJourneyMilestones journeyDetails={journeyDetails} getJourneyDetails={this.getJourneyDetails}
          setViewMode={this.setViewMode} getListItem={this.getListItem} {...this.props}/>}
    </div>
    )
  }
}
 
export default JourneyDetails;