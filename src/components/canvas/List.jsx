import React, { Component } from 'react';
import {Link} from 'react-router-dom';
 
class List extends Component {

  render() {
    return (
        <ul className='list-group'>
        {this.props.data.map(item => {
           return <li key={item._id} 
           class={this.props.match.params.id === item._id ? "list-group-item list-group-item-info": "list-group-item"} 
           aria-current={this.props.match.params.id === item._id ? 'true' : 'false'}>
             <Link className='text-decoration-none text-dark' to={`/canvas/${item._id}`}>
               <h5>{item.name}</h5>
             </Link>
            </li>
        })}
        </ul>
    )
  }
}
 
export default List;