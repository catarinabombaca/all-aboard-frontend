import React, { Component } from 'react';
 
class UserHeader extends Component {

render() {
    const {username, imageUrl, role, createdAt, teamLeader} = this.props.member
    let date = new Date(createdAt)
    return (
        <div className='row'>
            <div className='d-flex justify-content-center justify-content-lg-start align-items-center text-start col-12 col-lg-6'>
                <img className='rounded-circle user-img' alt={username} src={imageUrl}/>
                <div className='d-flex flex-column justify-content-evenly align-itens-start ps-3'>
                    <h4 className='text-start m-0 pt-2'>{username}</h4>
                    <p className='m-0 pt-2'>{role}</p>
                </div>    
            </div>
            <div className='d-flex flex-column justify-content-stretch align-items-center align-items-lg-end pt-4 pt-lg-0 text-start col-12 col-lg-6'>
                <div className='d-flex justify-content-between align-itens-start'>
                    {teamLeader && <p className='m-0 pt-2'>{teamLeader.role}</p>}
                    {teamLeader && <h4 className='text-start m-0 pt-2 px-2'>{teamLeader.username}</h4>}
                    {teamLeader && <img className='rounded-circle nav-user-img' alt={teamLeader.username} src={teamLeader.imageUrl}/>}
                </div>
                <p className='pt-2 m-0'><b>Onboarded:</b> {date.toDateString()}</p>    
            </div>
        </div>)
}
}
 
export default UserHeader;

 {/* {teamLeader && <p><b>Team Leader:</b> {teamLeader.username}</p>}
                    <p><b>Joined in:</b> {date.toDateString()}</p> */}