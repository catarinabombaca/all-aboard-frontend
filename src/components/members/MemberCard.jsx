import React, { Component } from 'react';
 
class MemberCard extends Component {

render() {
    const {_id, username, imageUrl, role, teamLeader, journeyProgress} = this.props.member
    return (
        <li>
            <img alt={username} src={imageUrl}/>
            <p>{username}</p>
            <p>{role}</p>
            {(!teamLeader && (_id !== this.props.loggedInUser._id)) && <button onClick={() => this.props.addMemberToTeam(_id)}>Add to Team</button>}
        </li>
    )
}
}
 
export default MemberCard;