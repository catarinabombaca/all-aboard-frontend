import './App.css';
import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import NavBar from './components/NavBar';
import Intro from './components/auth/Intro';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import AuthService from './components/auth/auth-service';
import Canvas from './components/canvas/Canvas';
import Members from './components/members/Members';
import MyTasks from './components/my-tasks/MyTasks';
import UserProfile from './components/auth/UserProfile';
import ProtectedRoute from './components/auth/protected-route';

class App extends Component {

  state = { loggedInUser: null }

  service = new AuthService()

  fetchUser(){
    if( this.state.loggedInUser === null ) {
      this.service.loggedin()
      .then(response => {this.setState({loggedInUser: response})})
      .catch( err => {this.setState({loggedInUser: false})})
    }
  }

  setTheUser = (user) => {
    this.setState({
      loggedInUser: user
    })
  }

  render() {
    this.fetchUser()
    return (
    <div className="App container-fluid d-flex flex-column">
      <div className='row'>
        <NavBar loggedInUser={this.state.loggedInUser} setUser={this.setTheUser}/> 
      </div>
      <div className='row flex-grow-1'>
        <Switch> 
          <ProtectedRoute exact path='/canvas/create' component={Canvas} loggedInUser={this.state.loggedInUser} create={true}/>  
          <ProtectedRoute exact path='/canvas/:id' component={Canvas} loggedInUser={this.state.loggedInUser}/>
          <ProtectedRoute exact path='/canvas' component={Canvas} loggedInUser={this.state.loggedInUser}/>
          <ProtectedRoute exact path='/users/task/:id' component={Members} loggedInUser={this.state.loggedInUser}/>
          <ProtectedRoute exact path='/users/:id' component={Members} loggedInUser={this.state.loggedInUser}/>
          <ProtectedRoute exact path='/users' component={Members} loggedInUser={this.state.loggedInUser}/>
          <ProtectedRoute exact path='/my-tasks/:id' component={MyTasks} loggedInUser={this.state.loggedInUser}/>
          <ProtectedRoute exact path='/my-tasks' component={MyTasks} loggedInUser={this.state.loggedInUser}/>
          <ProtectedRoute exact path="/user-profile" component={UserProfile} loggedInUser={this.state.loggedInUser} setTheUser={this.setTheUser}/>
          <Route exact path="/signup" render={(props) => <Signup setUser={this.setTheUser} {...props}/>}/>
          <Route exact path='/login' render={(props) => <Login setUser={this.setTheUser} {...props}/>}/>
          {this.state.loggedInUser && this.state.loggedInUser.role === 'Team Leader' && <ProtectedRoute exact path='/' component={Canvas} loggedInUser={this.state.loggedInUser}/>}
          {this.state.loggedInUser && this.state.loggedInUser.role === 'Team Member' && <ProtectedRoute exact path='/' component={MyTasks} loggedInUser={this.state.loggedInUser}/>}
          {!this.state.loggedInUser && <Route exact path='/' component={Intro}/>}
        </Switch>
      </div>
    </div>
    )
  };
}

export default App;
