import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import JourneyService from './journey-service';
import MilestoneService from './milestone-service';
import TaskService from './task-service';
 
class List extends Component {

    state = {listItems: []}
    journeyService = new JourneyService();
    milestoneService = new MilestoneService();
    taskService = new TaskService();
    
    getJourneys = () => {
        this.journeyService.journeys()
        .then(response => {
            this.setState({listItems: response})
        })
        .catch(err => console.log(err))
    }

    getMilestones = () => {
        this.milestoneService.milestones()
        .then(response => {
            this.setState({listItems: response})
        })
        .catch(err => console.log(err))
    }

    getTasks = () => {
        this.taskService.tasks()
        .then(response => {
            this.setState({listItems: response})
        })
        .catch(err => console.log(err))
    }

    componentDidMount() {
        const currentTab = this.props.tab
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

    componentDidUpdate(prevProps) {
        if(prevProps.tab !== this.props.tab) {
            const currentTab = this.props.tab
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
        <ul>
        {this.state.listItems.map(item => {
           return <li key={item._id}><Link to={`/canvas/${item._id}`}><h5>{item.name}</h5></Link></li>
        })}
        </ul>
    )
  }
}
 
export default List;