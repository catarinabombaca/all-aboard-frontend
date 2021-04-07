import React, { Component } from 'react';
import AuthService from './auth-service';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
 
class Login extends Component {
 
  state = { email: '', password: '', redirect: null}
 
  service = new AuthService()
 
  handleFormSubmit = (event) => {
    event.preventDefault();
    const {email, password} = this.state;
   
    this.service.login(email, password)
    .then( response => {
        this.setState({email: '', password: '', redirect: '/'});
        this.props.getUser(response)
    })
    .catch(err => console.log(err))
  }
   
  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
 
  render(){
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
   
        <p>Don't have account? 
            <Link to={"/signup"}>Sign up</Link>
        </p>
        </div>
    )
  }
}
 
export default Login;