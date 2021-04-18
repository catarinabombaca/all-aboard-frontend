import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from './auth/auth-service';
 
class NavBar extends Component {

  state = {loggedInUser: null}
  service = new AuthService()

  componentWillReceiveProps(nextProps) {
    this.setState({...this.state, loggedInUser: nextProps["loggedInUser"]})
  }

  logoutUser = () => {
    this.service.logout()
    .then(() => {
      this.setState({loggedInUser: null});
      this.props.setUser(null);
    })
  }

  getRolePath = (user) => {
    if(!user) {
      return '/';
    } else if (user.role === 'Team Leader') {
      return '/home-leader';
    } else if (user.role === 'Team Member') {
      return '/home-member';
    } else {
      return '/';
    }
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
        <Link className="navbar-brand" to={this.getRolePath(this.state.loggedInUser)}>allaboard.</Link>
        <ul className="navbar-nav">
            {!this.state.loggedInUser && <li><Link to='/login'>Log in</Link></li>}
            {!this.state.loggedInUser && <li><Link to='/signup'>Sign up</Link></li>}
            {this.state.loggedInUser && this.state.loggedInUser.role === 'Team Leader' && <li><Link to='/users'>Members</Link></li>}
            {this.state.loggedInUser && this.state.loggedInUser.role === 'Team Leader' && <li><Link to='/canvas'>Canvas</Link></li>}
            {this.state.loggedInUser && <li><Link to='/'><button onClick={() => this.logoutUser()}>Log out</button></Link></li>}
            {this.state.loggedInUser && <li>{this.state.loggedInUser.username}</li>}
        </ul>
        </div>
      </nav>
    )
  }
}
 
export default NavBar;