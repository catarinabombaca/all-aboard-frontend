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
      <div className='d-flex flex-column px-md-4'>
      <div className='bg-shape d-flex flex-column'>
        <div className='d-flex flex-column flex-md-row justify-content-between align-items-stretch px-4 py-2 '>
            <h5 className='text-white mt-2'>Members</h5>
            <input className='rounded-3 flex-grow-1 mx-3' type='text' name='search' onChange={this.handleChange}/>
            <div>
              <input type='checkbox' name='myTeam' onChange={this.handleChange}/>
              <label className='p-2 text-white fs-6' htmlFor='myTeam'>Only show my team members</label>
            </div>
        </div>
        <div className='bg-white d-flex box-height container-fluid p-0'>
          <div className='row m-0 flex-grow-1'>
          <div className="col-md-4 p-0">
            <MembersList members={this.state.filteredMembers} addMemberToTeam={this.addMemberToTeam} {...this.props}/>
         </div>
            {!this.props.match.params.id && <div className="bg-blue col-md-8 d-flex flex-column align-items-center justify-content-start">
                <img className='wait-img my-5 ms-5' alt='noUser' src={noUser}/>
                <p className='ps-5'>No item selected!</p>
            </div>}
          {this.props.match.params.id && <MemberDetails getMembers={this.getMembers} {...this.props}/>}
          </div>
        </div>
      </div>
    </div>
    )
  }
}
 
export default Members;