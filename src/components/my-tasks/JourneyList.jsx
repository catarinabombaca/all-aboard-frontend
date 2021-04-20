import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import MilestoneCard from './MilestoneCard';
 
class JourneyList extends Component {

  render() {
    return (
        <ul>
        {this.props.data.map(item => {
           return <MilestoneCard key={item._id}  milestone={item.milestoneProgress}/>
        })}
        </ul>
    )
  }
}
 
export default JourneyList;