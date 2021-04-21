import React, { Component } from 'react';
import AuthService from './auth-service';
import {Redirect} from 'react-router-dom';
import {Link} from 'react-router-dom';
import ErrorMessage from '../ErrorMessage';
 
class Signup extends Component {
 
  state = { username: '', password: '', email: '', firstTime: true, role: 'Team Member', redirect: null, error: null }
 
  service = new AuthService()
 
  handleFormSubmit = (event) => {
    event.preventDefault();
    const {username, password, email, firstTime, role} = this.state;
   
    this.service.signup(username, email, role, firstTime, password)
    .then( response => {
        if(response.message) {
          this.setState({...this.state, error: response.message})
        } else {
          this.setState({
              username: '', 
              password: '',
              email: '',
              firstTime: true,
              role: 'Team Member',
              redirect: this.getRolePath(response),
              error: null
          });
          this.props.setUser(response)
        }
    })
    .catch( err => alert(err) )
  }
   
  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  getRolePath = (user) => {
    if(!user) {
      return null;
    } else if (user.role === 'Team Leader') {
      return '/home-leader';
    } else if (user.role === 'Team Member') {
      return '/home-member';
    } else {
      return '/';
    }
  }
 
  render(){
    return(
        <div className='container-fluid d-flex h-100 flex-column text-white'>
        {this.state.redirect && <Redirect to={this.state.redirect}/>}
        <div className='row'>
          <div className='col-sm d-flex flex-column justify-content-evenly align-items-center'>
            <form className='w-75 m-5' onSubmit={this.handleFormSubmit}>
              <div className='mb-3 mx-lg-5 px-lg-5'>
                <label className="form-label">Username:</label>
                <input className="form-control" type="text" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}/>
              </div>

              <div className='mb-3 mx-lg-5 px-lg-5'>
              <label className="form-label">Email:</label>
              <input className="form-control" type="email" name="email" value={this.state.email} onChange={ e => this.handleChange(e)}/>
              </div>

              <div className='mb-3 mx-lg-5 px-lg-5'>
              <label className="form-label">Password:</label>
              <input className="form-control" type='password' name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />
              </div>

              <div className='mb-3 mx-lg-5 px-lg-5'>
              <label className="form-label">Role:</label>
              <select className="form-select" name="role" value={this.state.role} onChange={ e => this.handleChange(e)}>
                <option value="Team Member">Team Member</option>
                <option value="Team Leader">Team Leader</option>
              </select>
              </div>
          
              <input className='btn-red btn btn-primary btn-lg rounded-pill align-self-lg-start mx-5 my-3 px-5' type="submit" value="Sign up"/>
            </form>
          </div>
        </div>

        {this.state.error && <div className='row'>
          <div className='col-sm d-flex flex-column justify-content-start align-items-center'>
            <ErrorMessage error={this.state.error}/>
            </div>
          </div>}
          <div className='row'>
            <p className='col-sm d-flex flex-column justify-content-start align-items-center'>
              Already have account? 
              <Link className='text-white' to={"/login"}>Log in</Link>
            </p>
          </div>
        </div>
    )
  }
}
 
export default Signup;