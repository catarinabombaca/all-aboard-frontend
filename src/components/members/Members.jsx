import React, { Component } from 'react';
import UserService from '../user-service';
import MemberDetails from './MemberDetails';
import MembersList from './MembersList';
import noUser from './no-user.svg';
 
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
      .then((users) => {
        const usersExceptLogUser = users.filter(user => user._id !== this.props.loggedInUser._id)
        this.setState({allMembers: usersExceptLogUser, filteredMembers: usersExceptLogUser})
      })
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
      const filteredMembers = this.state.allMembers.filter(member => pattern.test(member.username) && member._id !== this.props.loggedInUser._id);
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
      <div className='container-fluid'>
        <div className='row h-100 justify-content-between align-items-start bg-shape mx-3'>
          <h3 className='text-white text-start mx-5 my-5'>Members</h3>
          <div className='col-12 col-lg-4 d-flex flex-column justify-content-start align-items center text-white'>
            <input className='w-100 rounded-3' type='text' name='search' onChange={this.handleChange}/>
            <div>
              <input type='checkbox' name='myTeam' onChange={this.handleChange}/>
              <label className='p-2' htmlFor='myTeam'>Only show my team members</label>
            </div>
            <MembersList members={this.state.filteredMembers} addMemberToTeam={this.addMemberToTeam} {...this.props}/>
         </div>
          {!this.props.match.params.id && <div className="col-12 col-lg-8 d-flex flex-column align-items-center justify-content-evenly">
                    <div className='rounded-3 bg-blue w-100'>
                        <img className='wait-img my-5 ms-5' alt='noUser' src={noUser}/>
                        <p className='w-100 mb-3'>No item selected!</p>
                    </div>
                </div>}
          
          {this.props.match.params.id && <MemberDetails getMembers={this.getMembers} {...this.props}/>}
        </div>
      </div>
    )
  }
}
 
export default Members;