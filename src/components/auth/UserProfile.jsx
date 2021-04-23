import React, { Component } from 'react';
import EditProfile from './EditProfile';
 
class UserProfile extends Component {

  render() {
      const {loggedInUser}=this.props
    return (
      <div className='container-fluid d-flex h-100 flex-column text-white mt-5'>
        <div className='row'>
         {loggedInUser && <div className='col-sm d-flex flex-column justify-content-evenly align-items-center'>
              <img className='big-user-img' alt={loggedInUser.username} src={loggedInUser.imageUrl}/>
              <h5>{loggedInUser.username}</h5>
              <p>{loggedInUser.email}</p>
              <p>{loggedInUser.role}</p>  
          </div>}
          {loggedInUser && <EditProfile user={loggedInUser} setUser={this.props.setUser}/>}
        </div>
      </div>
    )
  }
}
 
export default UserProfile;