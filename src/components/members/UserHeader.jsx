import React, { Component } from 'react';
 
class UserHeader extends Component {

render() {
    const {username, imageUrl, role, createdAt, teamLeader} = this.props.member
    return (
        <div className='d-flex flex-column justify-content-evenly align-itens-start mx-4 mt-4 mb-1'>
            <h3 className='text-start ms-3'>{username}</h3>
            <div className='d-flex flex-row justify-content-start align-itens-center mt-3 text-start'>
                <img className='rounded-circle user-img align-self-start mx-2' alt={username} src={imageUrl}/>
                <div className='d-flex flex-column justify-content-evenly align-itens-start ms-4'>
                    <p><b>Role:</b> {role}</p>
                    {teamLeader && <p><b>Team Leader:</b> {teamLeader.username}</p>}
                    <p><b>Joined in:</b> {createdAt}</p>
                </div>    
            </div>
        </div>)
}
}
 
export default UserHeader;