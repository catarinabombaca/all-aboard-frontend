import React, { Component } from 'react';
 
class UserHeader extends Component {

render() {
    const {username, imageUrl, role, createdAt, teamLeader} = this.props.member
    let date = new Date(createdAt)
    return (
        <div className='d-flex flex-column justify-content-start align-items-stretch p-3'>
            <h4 className='text-start'>{username}</h4>
            <div className='d-flex flex-row justify-content-start align-items-stretch text-start py-3'>
                <img className='rounded-circle user-img' alt={username} src={imageUrl}/>
                <div className='d-flex flex-column justify-content-evenly align-itens-start ps-5'>
                    <p><b>Role:</b> {role}</p>
                    {teamLeader && <p><b>Team Leader:</b> {teamLeader.username}</p>}
                    <p><b>Joined in:</b> {date.toDateString()}</p>
                </div>    
            </div>
        </div>)
}
}
 
export default UserHeader;