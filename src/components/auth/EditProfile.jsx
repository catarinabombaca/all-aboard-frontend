import React, { Component } from 'react';
import UploadService from './upload-service';
import UserService from '../user-service';
 
class EditProfile extends Component {

    state = {username: this.props.user.username, imageUrl: ''}
    uploadService = new UploadService();
    userService = new UserService();

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
      };

    handleFileUpload = (event) => {
        const uploadData = new FormData();
        uploadData.append('imageUrl', event.target.files[0]);
         
        this.uploadService.handleUpload(uploadData)
        .then(response => {
            console.log('responseUpload',response)
            this.setState({imageUrl: response.secure_url})
        })
        .catch(err => console.log(err))
      }
    
      handleSubmit = e => {
        e.preventDefault();
        this.userService.editUser(this.props.user._id, this.state)
        .then(response => {
            console.log('handlesubmit', response)
            this.props.setUser(response)
        })
        .catch(err => console.log(err))
     
      };

  render() {
      console.log('state',this.state)
    return (
      <div>
      <form className='w-75 m-5' onSubmit={this.handleSubmit}>
              <div className='mb-3 mx-lg-5 px-lg-5'>
                <label className="form-label">Username:</label>
                <input className="form-control" type="text" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}/>
              </div>

              <div className='mb-3 mx-lg-5 px-lg-5'>
                <label className="form-label">Profile Photo:</label>
                <input className="form-control" type="file" name="imageUrl" onChange={ e => this.handleFileUpload(e)}/>
              </div>
          
              <input className='btn-red btn btn-primary btn-lg rounded-pill align-self-lg-start mx-5 my-3 px-5' type="submit" value="Save"/>
            </form>
            </div>
    )
  }
}
 
export default EditProfile;