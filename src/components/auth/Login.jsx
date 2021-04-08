import React, { Component } from 'react';
import AuthService from './auth-service';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import ErrorMessage from '../ErrorMessage';
 
class Login extends Component {
 
  state = { email: '', password: '', error: null,redirect: null}
 
  service = new AuthService()
 
  handleFormSubmit = (event) => {
    event.preventDefault();
    const {email, password} = this.state;
   
    this.service.login(email, password)
    .then( response => {
        if(response.message) {
          this.setState({...this.state, error: response.message})
        } else {
          this.setState({email: '', password: '', error: null, redirect: this.getRolePath(response)});
          this.props.getUser(response)
        }
    })
    .catch(err => alert(err))
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
 
  render() {
    return(
        <div>
        {this.state.redirect && <Redirect to={this.state.redirect}/>}
        <form onSubmit={this.handleFormSubmit}>

          <label>Email:</label>
          <input type="email" name="email" value={this.state.email} onChange={ e => this.handleChange(e)}/>
          
          <label>Password:</label>
          <input type='password' name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />
          
          <input type="submit" value="Login" />
        </form>

        {this.state.error && <ErrorMessage error={this.state.error}/>}
   
        <p>Don't have account? 
            <Link to={"/signup"}>Sign up</Link>
        </p>
        </div>
    )
  }
}
 
export default Login;