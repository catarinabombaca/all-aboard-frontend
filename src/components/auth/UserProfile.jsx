import React, { Component } from 'react';
import EditProfile from './EditProfile';
 
class UserProfile extends Component {

  render() {
      const {loggedInUser}=this.props
    return (
      <div>
         {loggedInUser && <div>
              <img alt={loggedInUser.username} src={loggedInUser.imageUrl}/>
              <h5>{loggedInUser.username}</h5>
              <p>{loggedInUser.mail}</p>
              <p>{loggedInUser.role}</p>  
          </div>}
          {loggedInUser && <EditProfile user={loggedInUser} setUser={this.props.setUser}/>}
      </div>
    )
  }
}
 
export default UserProfile;