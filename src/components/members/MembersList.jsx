import React, { Component } from 'react';
import MemberCard from './MemberCard';
import {Link} from 'react-router-dom';
 
class MembersList extends Component {

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState) {

    }

  render() {
    return (
        <ul className='list-group'>
        {this.props.members.map(member => {
           return <Link className='text-decoration-none' to={`/users/${member._id}`} key={member._id}><MemberCard member={member} {...this.props}/></Link>
        })}
        </ul>
    )
  }
}
 
export default MembersList;