import React, { Component } from 'react';
import SubNav from './Subnav';
import List from './List';
import TaskDetails from './TaskDetails';
import MilestoneDetails from './MilestoneDetails';
import JourneyDetails from './JourneyDetails';
 
class Canvas extends Component {

    state = {tab: 'Journeys', redirect: null}

    setTab = (currentTab) => {
        const {match, history} = this.props
        this.setState({tab: currentTab})
        history.replace(`/canvas`)
  }
 
  render() {
      {console.log(this.props)}
    return (
      <div>
      <SubNav setTab={this.setTab}/>
      <h4>{this.state.tab}</h4>
      <List tab={this.state.tab}/>
      {this.props.match.params.id && this.state.tab === 'Tasks' && <TaskDetails id={this.props.match.params.id}/>}
      {this.props.match.params.id && this.state.tab === 'Milestones' && <MilestoneDetails id={this.props.match.params.id}/>}
      {this.props.match.params.id && this.state.tab === 'Journeys' && <JourneyDetails id={this.props.match.params.id}/>}
      </div>
    )
  }
}
 
export default Canvas;