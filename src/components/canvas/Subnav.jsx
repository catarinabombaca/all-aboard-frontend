import React, { Component } from 'react';
 
class SubNav extends Component {

  render() {
    const {tab} = this.props
    return (
        <ul className="nav nav-pills my-3">
            <li className="nav-item">
              <button className={tab === "Journeys" ? "nav-link active p-2": 'nav-link text-white'} onClick={()=>this.props.setTab('Journeys')}>Journeys</button>
            </li>
            <li className="nav-item">
              <button className={tab === "Milestones" ? "nav-link active p-2" : 'nav-link text-white'} onClick={()=>this.props.setTab('Milestones')}>Milestones</button>
            </li>
            <li className="nav-item">
              <button className={tab === "Tasks" ? "nav-link active p-2" : 'nav-link text-white'} onClick={()=>this.props.setTab('Tasks')}>Tasks</button>
            </li>
        </ul>
    )
  }
}
 
export default SubNav;