import React, { Component } from 'react';
import MilestoneCard from './MilestoneCard';
 
class JourneyList extends Component {

  render() {
    return (
        <div className="accordion col-12 col-lg-4" id="accordionExample">
        {this.props.data.map(item => {
           return <MilestoneCard key={item._id}  milestone={item.milestoneProgress}/>
        })}
        </div>
    )
  }
}
 
export default JourneyList;