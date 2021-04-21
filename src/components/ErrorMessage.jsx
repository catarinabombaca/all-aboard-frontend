import React, { Component } from 'react';
 
class ErrorMessage extends Component {
 
  render(){
    return (
      <div class="alert alert-danger" role="alert">
      {this.props.error}
      </div>
    )
  }
}
 
export default ErrorMessage;