import React, { Component } from 'react';
import JourneyService from '../canvas/journey-service';
import UserService from '../user-service';
import UserHeader from './UserHeader';
import JourneyProgressService from './journey-p-service';
import JourneyDetailService from '../canvas/journey-details-service';
import MilestoneProgressService from './milestone-p-service';
import JourneyDetailsProgressService from './journey-p-details-service';
import TaskService from '../canvas/task-service';
import MilestoneService from '../canvas/milestone-service';
import TaskProgressService from './task-p-service';
 
class MemberDetails extends Component {

    state = {member: {}, assignedJourneyId: '', journeys: []}
    userService = new UserService();
    journeyService = new JourneyService;
    journeyProgressService = new JourneyProgressService();
    journeyDetailService = new JourneyDetailService();
    milestoneProgressService = new MilestoneProgressService();
    journeyDetailsProgressService = new JourneyDetailsProgressService();
    taskService = new TaskService();
    milestoneService = new MilestoneService();
    taskProgressService = new TaskProgressService();

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
      const journeyToAssign = this.state.journeys.filter(journey => journey._id === assignedJourneyId)[0]
      const promisesCreateMilestone = [];
      const promisesGetMilestoneTasks = [];
      const promisesCreateTask = [];
      const promisesCreateJourneyDetail = [];

      this.journeyDetailService.getJourneyDetails(assignedJourneyId)
      .then((journeyDetails) => {
           journeyDetails.forEach(journeyDetail => {
          let milestone = {...journeyDetail.milestone}
          milestone.milestone = journeyDetail.milestone._id
          delete milestone._id
          promisesCreateMilestone.push(this.milestoneProgressService.createMilestoneProgress(milestone))
        })

        Promise.all(promisesCreateMilestone)
        .then(milestonesProgress => {
          milestonesProgress.forEach((milestoneProgress => {
            promisesGetMilestoneTasks.push(this.milestoneService.getMilestoneTasks(milestoneProgress.milestone))
          }))

          Promise.all(promisesGetMilestoneTasks)
          .then(allTasks => {

            allTasks.forEach((milestoneTasks, index) => {
              milestoneTasks.forEach(task => {
                let newTask = {...task}
                newTask.milestoneProgress = milestonesProgress[index]._id
                delete newTask._id
                promisesCreateTask.push(this.taskProgressService.createTaskProgress(newTask))
              })
            })

            Promise.all(promisesCreateTask)
            .then(() => {
              return this.journeyProgressService.createJourneyProgress({
                user: member._id,
                name: journeyToAssign.name,
                expectedDuration: journeyToAssign.expectedDuration,
                start: Date.now()
              })
            })
            .then(journeyProgress => {
              journeyDetails.forEach((journeyDetail, index) => {
                let newJourneyDetail = {...journeyDetail}
                newJourneyDetail.milestoneProgress = milestonesProgress[index]._id
                delete newJourneyDetail._id
                promisesCreateJourneyDetail
                .push(this.journeyDetailsProgressService.createJourneyDetailsProgress(
                  journeyProgress._id, newJourneyDetail))
              })

              Promise.all(promisesCreateJourneyDetail)
              .then(() => {
                this.userService.editUser(member._id, {journeyProgress: journeyProgress._id})
                .then(() => {this.getUser()})
                .catch(err => console.log(err))
              })
            })
          })
        })
      })
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