import React, { Component } from 'react';
 
class SubNav extends Component {

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
        <ul className="navbar-nav">
            <li><button onClick={()=>this.props.setTab('Journeys')}>Journeys</button></li>
            <li><button onClick={()=>this.props.setTab('Milestones')}>Milestones</button></li>
            <li><button onClick={()=>this.props.setTab('Tasks')}>Tasks</button></li>
        </ul>
        </div>
      </nav>
    )
  }
}
 
export default SubNav;