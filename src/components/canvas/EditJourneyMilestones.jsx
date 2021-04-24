import React, { Component } from 'react';
import MilestoneCard from './MilestoneCard';
import MilestoneService from './milestone-service';
import JourneyDetailsService from './journey-details-service';

class EditJourneyMilestones extends Component {

    state = {listJourneyDetails: this.props.journeyDetails, allMilestones: [], filteredMilestones: []}
    milestoneService = new MilestoneService();
    journeyDetailsService = new JourneyDetailsService();


    addMilestoneToJourney = (milestone, order) => {
      const listJourneyDetails = [...this.state.listJourneyDetails]
      listJourneyDetails.push({_id: 'new-' + milestone._id, milestone: milestone, journey: {_id: this.props.match.params.id}, order: order})
      this.setState({listJourneyDetails: listJourneyDetails})
    }

    removeMilestoneFromJourney = (milestone) => {
      const listJourneyDetails = [...this.state.listJourneyDetails]
      const index = listJourneyDetails.map(journeyDetail => journeyDetail.milestone._id).indexOf(milestone._id)
      listJourneyDetails.splice(index, 1)
      this.setState({listJourneyDetails: listJourneyDetails})
    }

    saveMilestonesChanges = () => {

      let promisesFromDelete = [];
      let promisesFromCreate = [];

      this.journeyDetailsService.getJourneyDetails(this.props.match.params.id)
      .then(journeyDetail => journeyDetail.forEach(journeyDetail => {
          return promisesFromDelete.push(this.journeyDetailsService.deleteJourneyDetail(this.props.match.params.id, journeyDetail._id))
        }))

      Promise.all(promisesFromDelete)
        .then(() => {
            this.state.listJourneyDetails.forEach((journeyDetail) => {
                const {order, journey, milestone} = journeyDetail
                return promisesFromCreate.push(this.journeyDetailsService.createJourneyDetails(journey._id, {order: order, milestone: milestone._id}))
            })  

            Promise.all(promisesFromCreate)
            .then(() => {
              this.props.getJourneyDetails()
              this.props.setViewMode()
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    }

    searchQuery = (searchString) => {
      const pattern = new RegExp(searchString, 'i');
      const filteredMilestones = this.state.allMilestones.filter(milestone => pattern.test(milestone.name));
      if(searchString === '') {
        this.setState({filteredMilestones: [...this.state.allMilestones]})
      } else {
        this.setState({filteredMilestones: filteredMilestones})
      }
      }

    handleChange = (e) => {
      const {value} = e.target
      this.searchQuery(value)
    }

    componentDidMount() {
      this.milestoneService.milestones()
      .then(milestonesFromDB => {
        this.setState({allMilestones: milestonesFromDB, filteredMilestones: milestonesFromDB})
      })
      .catch(err => console.log(err))
  }

  componentDidUpdate(prevProps) {
    if(prevProps.match.params.id !== this.props.match.params.id) {
      this.props.getListItem();
      this.props.getJourneyDetails();
      this.props.setViewMode();
      }
  }

  render() {
    return (
        <div className='rounded-3 bg-blue'>
          <div className='d-flex flex-row justify-content-end'>
            <h4 className='mt-3 flex-grow-1 text-start ps-4'>Edit Journey Details</h4>
            <button className='mx-2 mt-3 btn btn-light btn-dark-blue' onClick={() => this.props.setViewMode()}>Cancel</button>
            <button className='mx-2 mt-3 btn btn-danger' onClick={() => this.saveMilestonesChanges()}>Save Changes</button>
          </div>
          <div className='container-fluid'>
          <div className='row h-100 align-items-start justify-content-evenly m-1 mt-3 pb-3'>
            <div className='col-sm mb-2'>
            {this.state.listJourneyDetails.length === 0 && <p className='p-4'>Added milestones will show up here.</p>}
            <ul className="list-group"> {this.state.listJourneyDetails.sort((a, b) => a.order - b.order).map(journeyDetail => {
                        return <MilestoneCard key={journeyDetail._id} journeyDetail={journeyDetail} 
                      removeBtn={true} removeMilestoneFromJourney={this.removeMilestoneFromJourney} 
                      selectedMilestones={this.state.listJourneyDetails.map((journeyDetail) => journeyDetail.milestone._id)}/>})}
            </ul>
            </div>

            <div className='col-sm mb-2'>
              <input className='w-100 mb-3 rounded-3 ps-2' type='text' name='search' onChange={this.handleChange}/>
              {this.state.filteredMilestones.length === 0 && <p>No results found!</p>}
              {<ul className="list-group">
                {this.state.filteredMilestones.map(milestone => {
                return <MilestoneCard key={milestone._id} milestone={milestone} removeBtn={false} addMilestoneToJourney={this.addMilestoneToJourney} 
                selectedMilestones={this.state.listJourneyDetails.map((journeyDetail) => journeyDetail.milestone._id)} 
                /*selectedOrder={this.state.listJourneyDetails.map((journeyDetail) => journeyDetail.order)}*//>
                })}
              </ul>}
            </div>
            </div>
          </div>
        </div>
    )
  }
}
 
export default EditJourneyMilestones;