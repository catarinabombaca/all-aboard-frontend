import React, { Component } from 'react';
import EditProfile from './EditProfile';
 
class UserProfile extends Component {

  render() {
      const {loggedInUser}=this.props
    return (
      <div className='container-fluid d-flex h-100 flex-column text-white mt-5'>
        <div className='row'>
         {loggedInUser && <div className='col-sm d-flex flex-column justify-content-evenly align-items-center'>
              <div className='big-user-img mb-5 rounded-circle' style={{backgroundImage: `url('${loggedInUser.imageUrl}')`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}></div>
              <h5>{loggedInUser.username}</h5>
              <p>{loggedInUser.email}</p>
              <p>{loggedInUser.role}</p>  
          </div>}
          {loggedInUser && <EditProfile user={loggedInUser} setTheUser={this.props.setTheUser}/>}
        </div>
      </div>
    )
  }
}
 
export default UserProfile;