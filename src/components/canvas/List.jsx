import React, { Component } from 'react';
import {Link} from 'react-router-dom';
 
class List extends Component {

  render() {
    return (
        <ul>
        {this.props.data.map(item => {
           return <li key={item._id}><Link to={`/canvas/${item._id}`}><h5>{item.name}</h5></Link></li>
        })}
        </ul>
    )
  }
}
 
export default List;