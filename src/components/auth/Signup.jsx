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
        <div>
        {this.state.redirect && <Redirect to={this.state.redirect}/>}
        <form onSubmit={this.handleFormSubmit}>
          <label>Username:</label>
          <input type="text" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}/>

          <label>Email:</label>
          <input type="email" name="email" value={this.state.email} onChange={ e => this.handleChange(e)}/>
          
          <label>Password:</label>
          <input type='password' name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />

          <label>Role:</label>
            <select name="role" value={this.state.role} onChange={ e => this.handleChange(e)}>
                <option value="Team Member">Team Member</option>
                <option value="Team Leader">Team Leader</option>
            </select>
          
          <input type="submit" value="Signup"/>
        </form>

        {this.state.error && <ErrorMessage error={this.state.error}/>}
   
        <p>Already have account? 
            <Link to={"/login"}>Log in</Link>
        </p>
        </div>
    )
  }
}
 
export default Signup;