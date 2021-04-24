import React, { Component } from 'react';
import JourneyList from './JourneyList';
import JourneyDetailProgressService from '../members/journey-p-details-service';
import TaskDetail from './TaskDetail';

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

    componentDidUpdate(prevProps, prevState) {

    }

  render() {
    return (
      <div className='container-fluid'>
        <div className='row'>
        {this.state.journeyDetails.length !==0 && <JourneyList data={this.state.journeyDetails}/>}
        {this.props.match.params.id && <TaskDetail {...this.props}/>}
        </div>
      </div>
    )
  }
}
 
export default MyTasks;