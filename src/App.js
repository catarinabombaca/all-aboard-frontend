import './App.css';
import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import NavBar from './components/NavBar';
import Intro from './components/auth/Intro';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import AuthService from './components/auth/auth-service';
import HomeLeader from './components/home/HomeLeader';
import HomeMember from './components/home/HomeMember';
import Canvas from './components/canvas/Canvas';
import Members from './components/members/Members';
import MyTasks from './components/my-tasks/MyTasks';

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

  setTheUser= (user) => {
    this.setState({
      loggedInUser: user
    })
  }

  render() {
    this.fetchUser()
    return (
    <div className="App container-fluid d-flex h-100 flex-column">
      <div className='row'>
        <NavBar loggedInUser={this.state.loggedInUser} setUser={this.setTheUser}/> 
      </div>
      <div className='row flex-grow-1'>
        <Switch> 
          <Route exact path='/canvas/create' render={(props) => <Canvas {...props} create={true}/>}/>  
          <Route exact path='/canvas/:id' render={(props) => <Canvas {...props}/>}/>
          <Route exact path='/canvas' render={(props) => <Canvas {...props}/>}/>
          <Route exact path='/users/:id' render={(props) => <Members {...props} loggedInUser={this.state.loggedInUser}/>}/>
          <Route exact path='/users' render={(props) => <Members {...props} loggedInUser={this.state.loggedInUser}/>}/>
          <Route exact path='/home-leader' render={() => <HomeLeader/>}/>
          <Route exact path='/my-tasks/:id' render={(props) => <MyTasks {...props} loggedInUser={this.state.loggedInUser}/>}/>
          <Route exact path='/my-tasks' render={(props) => <MyTasks {...props} loggedInUser={this.state.loggedInUser}/>}/>
          <Route exact path='/home-member' render={() => <HomeMember/>}/>
          <Route exact path="/signup" render={() => <Signup setUser={this.setTheUser}/>}/>
          <Route exact path='/login' render={() => <Login setUser={this.setTheUser}/>}/>
          <Route exact path='/' component={Intro}/>
        </Switch>
      </div>
    </div>
    )
  };
}

export default App;
