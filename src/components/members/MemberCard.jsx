import React, { Component } from 'react';
 
class MemberCard extends Component {

render() {
    const {_id, username, imageUrl, role, teamLeader} = this.props.member
    return (
        <li className={this.props.match.params.id === _id ? 
        "list-group-item list-group-item-primary d-flex flex-row justify-content-start align-itens-center": 
        "list-group-item list-group-item d-flex flex-row justify-content-start align-itens-center"}>
            <img className='nav-user-img rounded-circle m-2' alt={username} src={imageUrl}/>
            <div className='flex-grow-1 text-start ps-5'>
                <span className='fw-bolder'>{username}</span><br/>
                <span>{role}</span>
            </div>
            {(!teamLeader && (_id !== this.props.loggedInUser._id)) && <button className='m-2 btn btn-danger btn-sm align-self-end' onClick={() => this.props.addMemberToTeam(_id)}>Add to Team</button>}
        </li>
    )
}
}
 
export default MemberCard;