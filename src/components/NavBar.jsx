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
      <nav className="Main-nav navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
        <Link className="navbar-brand mb-0 fs-2 fw-bold" to={this.getRolePath(this.state.loggedInUser)}>all aboard.</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        {!this.state.loggedInUser && <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
            <li className='nav-item navbar-text'><Link className='nav-link' aria-current="page" to='/login'>Log in</Link></li>
            <li className='nav-item'><Link className='btn btn-outline-light btn-lg rounded-pill m-2 px-4' to='/signup'>Sign up</Link></li>
          </ul>
        </div>}

          {this.state.loggedInUser && <div className="collapse navbar-collapse justify-content-start" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
            {this.state.loggedInUser.role === 'Team Leader' && <li className='nav-item navbar-text'><Link className='nav-link' to='/users'>Members</Link></li>}
            {this.state.loggedInUser.role === 'Team Leader' && <li className='nav-item navbar-text'><Link className='nav-link' to='/canvas'>Canvas</Link></li>}
            {this.state.loggedInUser.role === 'Team Member' && <li className='nav-item navbar-text'><Link className='nav-link' to='/my-tasks'>My Tasks</Link></li>}
          </ul>
          </div>}

          {this.state.loggedInUser && <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
            <li className='nav-item'><Link to='/'><button className='btn-link btn-lg m-2 px-4' onClick={() => this.logoutUser()}>Log out</button></Link></li>
            <li className='nav-item navbar-text text-white'>
              <Link className='nav-link d-flex justify-content-center align-items-center' to='/user-profile'>
                <span>{this.state.loggedInUser.username}</span>
                <div className='nav-user-img rounded-circle ms-3 mt-1 justify-content-center align-items-center' 
              style={{backgroundImage: `url('${this.state.loggedInUser.imageUrl}')`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}></div>
              </Link>
            </li>
          </ul>
          </div>}
        </div>
      </nav>
    )
  }
}
 
export default NavBar;