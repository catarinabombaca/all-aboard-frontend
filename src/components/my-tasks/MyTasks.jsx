import React, { Component } from 'react';
import JourneyList from './JourneyList';
import JourneyDetailProgressService from '../members/journey-p-details-service';
import noTasks from './no-tasks.svg';

class MyTasks extends Component {

    state = {journeyDetails: []}
    journeyDetailProgressService = new JourneyDetailProgressService();

    getUserJourneyDetails = () => {
        const id = this.props.loggedInUser.journeyProgress
        this.journeyDetailProgressService.getJourneyDetailsProgress(id)
        .then((journeyDetails => this.setState({journeyDetails: journeyDetails})))
        .catch(err => console.log(err))
    }


    componentDidMount() {
        this.getUserJourneyDetails()
    }

  render() {
    return (
      <div className='container-fluid'>
        <div className='row'>
        {this.state.journeyDetails.length ===0 && <div>
          <p>Ups...! Seems like you do not have tasks yet!</p>
          <img alt='no tasks' src={noTasks}/>
          </div>}
        {this.state.journeyDetails.length !==0 && <JourneyList data={this.state.journeyDetails} page='my-tasks' {...this.props}/>}
        </div>
      </div>
    )
  }
}
 
export default MyTasks;