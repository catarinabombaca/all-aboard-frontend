import React, { Component } from 'react';
import SubNav from './Subnav';
import List from './List';
import TaskDetails from './TaskDetails';
 
class Canvas extends Component {

    state = {tab: 'Journeys'}

    setTab = (currentTab) => {
    this.setState({tab: currentTab})
  }
 
  render() {
    return (
      <div>
      <p>This is the Canvas!</p>
      <SubNav setTab={this.setTab}/>
      <h4>{this.state.tab}</h4>
      <List tab={this.state.tab}/>
      {this.props.match.params.id && <TaskDetails id={this.props.match.params.id}/>}
      {/*Fazer um componente para cada tipo de list details (um para a journey, outro para as milestones, outro para as tasks)*/}
      </div>
    )
  }
}
 
export default Canvas;