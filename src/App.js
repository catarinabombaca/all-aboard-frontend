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

  getTheUser= (user) => {
    this.setState({
      loggedInUser: user
    })
  }

  render() {
    this.fetchUser()
    return (
    <div className="App">
        <NavBar loggedInUser={this.state.loggedInUser} getUser={this.getTheUser}/> 
        <Switch>
          <Route exact path='/home-leader' render={() => <HomeLeader/>}/>
          <Route exact path='/home-member' render={() => <HomeMember/>}/>
          <Route exact path="/signup" render={() => <Signup getUser={this.getTheUser}/>}/>
          <Route exact path='/login' render={() => <Login getUser={this.getTheUser}/>}/>
          <Route exact path='/' component={Intro}/>
        </Switch>
    </div>
    )
  };
}

export default App;
