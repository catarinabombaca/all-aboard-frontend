import React, { Component } from 'react';
 
class ErrorMessage extends Component {
 
  render(){
    return (
      <div>
      {this.props.error}
      </div>
    )
  }
}
 
export default ErrorMessage;