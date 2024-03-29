import React, { Component } from 'react';
import UploadService from './upload-service';
import UserService from '../user-service';
 
class EditProfile extends Component {

    state = {username: this.props.user.username, imageUrl: '', loading: false}
    uploadService = new UploadService();
    userService = new UserService();

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
      };

    handleFileUpload = (event) => {
        this.setState({loading: true});
        const uploadData = new FormData();
        uploadData.append('imageUrl', event.target.files[0]);
         
        this.uploadService.handleUpload(uploadData)
        .then(response => {
            this.setState({imageUrl: response.secure_url, loading: false})
        })
        .catch(err => console.log(err))
      }
    
      handleSubmit = e => {
        e.preventDefault();
        this.userService.editUser(this.props.user._id, this.state)
        .then(response => {
            this.props.setTheUser(response)
        })
        .catch(err => console.log(err))
     
      };

  render() {
    return (
      <div className='col-sm d-flex flex-column justify-content-evenly align-items-center'>
      <form className='w-75 m-5' onSubmit={this.handleSubmit}>
              <div className='mb-3 mx-lg-5 px-lg-5'>
                <label className="form-label">Username</label>
                <input className="form-control" type="text" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}/>
              </div>

              <div className='mb-3 mx-lg-5 px-lg-5'>
                <label className="form-label">Profile Photo</label>
                <input className="form-control" type="file" name="imageUrl" onChange={ e => this.handleFileUpload(e)}/>
              </div>

              <button type="submit" className={`btn-red btn btn-primary btn-lg rounded-pill align-self-lg-start mx-5 my-3 px-5 ${this.state.loading ? "disabled" : ""}`}>
                {this.state.loading ? (<div>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>&nbsp;Loading...</div>
                ) : (
                  <span>Save</span>)}
              </button>
            </form>
            </div>
    )
  }
}
 
export default EditProfile;