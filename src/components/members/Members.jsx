import React, { Component } from 'react';
import UserService from '../user-service';
import MemberDetails from './MemberDetails';
import MembersList from './MembersList';
 
class Members extends Component {

    state = {allMembers: [], filteredMembers: []};
    userService = new UserService();

    addMemberToTeam = (id) => {
      this.userService.editUser(id, {teamLeader: this.props.loggedInUser._id})
      .then(() => this.getMembers())
      .catch(err => console.log(err))
    }

    getMembers = () => {
      this.userService.getUsers()
      .then((users) => this.setState({allMembers: users, filteredMembers: users}))
      .catch(err => console.log(err))
    }

    myTeamFilter = (checked) => {
      const myTeam = this.state.filteredMembers.filter(member => {
        if(member.teamLeader) {
          return member.teamLeader._id === this.props.loggedInUser._id
        } else {
          return false
        }})

      if(checked) {
        this.setState({filteredMembers: myTeam})
      } else {
        this.setState({filteredMembers: [...this.state.allMembers]})
      }
    }

    searchQuery = (searchString) => {
      const pattern = new RegExp(searchString, 'i');
      const filteredMembers = this.state.allMembers.filter(member => pattern.test(member.username));
      if(searchString === '') {
        this.setState({filteredMembers: [...this.state.allMembers]})
      } else {
        this.setState({filteredMembers: filteredMembers})
      }
      }

    handleChange = (e) => {
      const {value, name, checked} = e.target
      if(name === 'myTeam') {
        this.myTeamFilter(checked)
      } else {
        this.searchQuery(value)
      }
    }

    componentDidMount() {
      this.getMembers()
    }

    componentDidUpdate(prevProps, prevState) {

    }

  render() {
    return (
      <div>
        <input type='text' name='search' onChange={this.handleChange}/>
        <input type='checkbox' name='myTeam' onChange={this.handleChange}/>
        <label htmlFor='myTeam'>Only show my team members</label>
        <MembersList members={this.state.filteredMembers} addMemberToTeam={this.addMemberToTeam} {...this.props}/>
        {this.props.match.params.id && <MemberDetails {...this.props}/>}
      </div>
    )
  }
}
 
export default Members;