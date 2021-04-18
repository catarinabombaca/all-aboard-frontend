import React, { Component } from 'react';
 
class UserHeader extends Component {

render() {
    const {username, imageUrl, role, createdAt, teamLeader} = this.props.member
    return (
        <div>
            <img alt={username} src={imageUrl}/>
            <p>Name: {username}</p>
            <p>Role: {role}</p>
            {teamLeader && <p>Team Leader: {teamLeader.username}</p>}
            <p>Joined in: {createdAt}</p>
        </div>)
}
}
 
export default UserHeader;