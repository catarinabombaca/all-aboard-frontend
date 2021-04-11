import React, { Component } from 'react';
import SubNav from './Subnav';
import List from './List';
import TaskDetails from './TaskDetails';
import MilestoneDetails from './MilestoneDetails';
import JourneyDetails from './JourneyDetails';
import JourneyService from './journey-service';
import MilestoneService from './milestone-service';
import TaskService from './task-service';
 
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
      <div>
      <SubNav setTab={this.setTab}/>
      <h4>{this.state.tab}</h4>
      <List data={this.state.data}/>
      {this.props.match.params.id && this.state.tab === 'Tasks' && <TaskDetails getTasks={this.getTasks} {...this.props}/>}
      {this.props.match.params.id && this.state.tab === 'Milestones' && <MilestoneDetails id={this.props.match.params.id}/>}
      {this.props.match.params.id && this.state.tab === 'Journeys' && <JourneyDetails id={this.props.match.params.id}/>}
      </div>
    )
  }
}
 
export default Canvas;