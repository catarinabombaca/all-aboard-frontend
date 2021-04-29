import React, { Component } from 'react';
import waiting from './waiting-img.svg'
import SubNav from './Subnav';
import List from './List';
import TaskDetails from './TaskDetails';
import MilestoneDetails from './MilestoneDetails';
import JourneyDetails from './JourneyDetails';
import JourneyService from './journey-service';
import MilestoneService from './milestone-service';
import TaskService from './task-service';
import CreateTask from './CreateTask';
import CreateMilestone from './CreateMilestone';
import CreateJourney from './CreateJourney';

 
class Canvas extends Component {

    state = {tab: 'Journeys', data: [], redirect: null}
    journeyService = new JourneyService();
    milestoneService = new MilestoneService();
    taskService = new TaskService();

    setTab = (currentTab) => {
        const {history} = this.props
        this.setState({tab: currentTab})
        history.replace(`/canvas`)
    }

    getJourneys = () => {
        this.journeyService.journeys()
        .then(response => {
            this.setState({data: response})
        })
        .catch(err => console.log(err))
    }

    getMilestones = () => {
        this.milestoneService.milestones()
        .then(response => {
            this.setState({data: response})
        })
        .catch(err => console.log(err))
    }

    getTasks = () => {
        this.taskService.tasks()
        .then(response => {
            this.setState({data: response})
        })
        .catch(err => console.log(err))
    }

    componentDidMount() {
        const currentTab = this.state.tab
        switch (currentTab) {
            case 'Journeys':
                this.getJourneys()
                break;
            case 'Milestones':
                this.getMilestones()
                break;
            case 'Tasks':
                this.getTasks()
                break;
            default:
                break;
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.tab !== this.state.tab) {
            const currentTab = this.state.tab
            switch (currentTab) {
                case 'Journeys':
                    this.getJourneys()
                    break;
                case 'Milestones':
                    this.getMilestones()
                    break;
                case 'Tasks':
                    this.getTasks()
                    break;
                default:
                    break;
            }
        }
    }

  render() {
    return (
      <div className='d-flex flex-column px-md-4'>
      <SubNav setTab={this.setTab} tab={this.state.tab}/>
      {this.props.create && this.state.tab === 'Journeys' && <CreateJourney {...this.props} getJourneys={this.getJourneys}/>}
      {this.props.create && this.state.tab === 'Milestones' && <CreateMilestone {...this.props} getMilestones={this.getMilestones}/>}
      {this.props.create && this.state.tab === 'Tasks' && <CreateTask {...this.props} getTasks={this.getTasks}/>}


      {!this.props.create && <div className='bg-shape d-flex flex-column'>
          <div className='d-flex px-4 py-1 justify-content-between align-items-center'>
            <h5 className='text-white'>{this.state.tab}</h5>
            <button className='btn btn-outline-light btn-sm rounded-pill my-2 px-3' onClick={() => {this.props.history.push('/canvas/create')}}>Create {this.state.tab}</button>
          </div>
          <div className='bg-white d-flex box-height container-fluid p-0'>
              <div className='row m-0 flex-grow-1'>
                <div className="col-md-4 p-0">
                  <List data={this.state.data} {...this.props}/>
                </div>
                {!this.props.match.params.id && <div className="bg-blue col-md-8 d-flex flex-column align-items-center justify-content-start">
                        <img className='wait-img my-5 ms-5' alt='waiting' src={waiting}/>
                        <p>No item selected!</p>
                </div>}
                {this.props.match.params.id && this.state.tab === 'Tasks' && <TaskDetails getTasks={this.getTasks} {...this.props}/>}
                {this.props.match.params.id && this.state.tab === 'Milestones' && <MilestoneDetails getMilestones={this.getMilestones} {...this.props}/>}
                {this.props.match.params.id && this.state.tab === 'Journeys' && <JourneyDetails getJourneys={this.getJourneys} {...this.props}/>}
              </div>
            </div>
      </div>}
      </div>
    )
  }
}
 
export default Canvas;