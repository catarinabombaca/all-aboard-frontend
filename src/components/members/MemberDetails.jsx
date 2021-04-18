import React, { Component } from 'react';
import JourneyService from '../canvas/journey-service';
import UserService from '../user-service';
import UserHeader from './UserHeader';
import JourneyProgressService from './journey-p-service';
import JourneyDetailService from '../canvas/journey-details-service';
import MilestoneProgressService from './milestone-p-service';
import JourneyDetailsProgressService from './journey-p-details-service';
 
class MemberDetails extends Component {

    state = {member: {}, assignedJourneyId: '', journeys: []}
    userService = new UserService();
    journeyService = new JourneyService;
    journeyProgressService = new JourneyProgressService();
    journeyDetailService = new JourneyDetailService();
    milestoneProgressService = new MilestoneProgressService();
    journeyDetailsProgressService = new JourneyDetailsProgressService();

    getJourneys = () => {
      this.journeyService.journeys()
      .then(journeys => this.setState({journeys: journeys, assignedJourneyId: journeys[0]._id}))
      .catch(err => console.log(err))
    }

    getUser = () => {
      const {id} = this.props.match.params
      this.userService.getUser(id)
      .then((user) => this.setState({member: user}))
      .catch(err => console.log(err))
    }

    handleFormSubmit = (event) => {
      event.preventDefault();
      const {member, assignedJourneyId} = this.state
      const journeyToAssign = this.state.journeys.filter(journey => journey._id === assignedJourneyId)
      const promisesCreateMilestone = [];
      const promisesCreateJourneyDetail = [];

      this.journeyDetailService.getJourneyDetails(assignedJourneyId)
      .then(journeyDetails => {
        journeyDetails.forEach(journeyDetail => {
          promisesCreateMilestone.push(this.milestoneProgressService.createMilestoneProgress(journeyDetail.milestone))
          //this.getTasks().then()
        })
        Promise.all(promisesCreateMilestone)
        .then()
      })
      .then((results) => console.log(results))

      // this.journeyProgressService.createJourneyProgress({
      //   user: member._id,
      //   name: journeyToAssign.name,
      //   expectedDuration: journeyToAssign.expectedDuration,
      //   start: Date.now()
      // })
      // .then()
  
    }
  
    handleChange = (event) => {  
      const {name, value} = event.target;
      this.setState({[name]: value});
    }

    componentDidMount() {
      this.getUser()
      !this.state.member.journeyProgress && this.getJourneys()
    }

    componentDidUpdate(prevProps, prevState) {
      if(prevProps.match.params.id !== this.props.match.params.id) {
        this.getUser()
        !this.state.member.journeyProgress && this.getJourneys()
        }
    }

  render() {
    return (
      <div>
        {this.state.member && <div>
        <UserHeader member={this.state.member}/>
        {!this.state.member.journeyProgress && <div>
          No journey yet!
          <form onSubmit={this.handleFormSubmit}>
          <label>Select journey:</label>
          <select name="assignedJourneyId" value={this.state.assignedJourneyId} onChange={ e => this.handleChange(e)}>
              {this.state.journeys.map(journey => <option value={journey._id}>{journey.name}</option>)}
          </select>
          <input type="submit" value="Assign" />
        </form>
        </div>}
        {this.state.member.journeyProgress && <div>Journey progress</div>}
        </div>}
        {!this.state.member && <p>Loading...</p>}
      </div>
    )
  }
}
 
export default MemberDetails;