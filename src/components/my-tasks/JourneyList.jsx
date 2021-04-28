import React, { Component } from 'react';
import MilestoneCard from './MilestoneCard';
 
class JourneyList extends Component {

  render() {
    return (
        <div className="accordion col-12 col-lg-4" id="accordionExample">
        {this.props.data.sort((a, b) => a.order - b.order).map(item => {
           return <MilestoneCard key={item._id}  milestone={item.milestoneProgress} page={this.props.page}/>
        })}
        </div>
    )
  }
}
 
export default JourneyList;