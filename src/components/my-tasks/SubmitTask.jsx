import React, { Component } from 'react';

class SubmitTask extends Component {

  state = {submitURL: this.props.submitURL};

  
  handleFormSubmit = (event) => {
    event.preventDefault();
    this.props.editTask(this.props.id, {
        end: Date.now(),
        submitURL: this.state.submitURL,
        status: 'Closed'
    })
  }

    handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render(){
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label className='fs-6 pb-2'>Insert here the link to the final deliverable:</label>
          {this.props.status === 'Pending' && <input className='form-control fs-6' type="text" name="submitURL" value={this.state.submitURL} onChange={e => this.handleChange(e)}/>}
          {this.props.status === 'Closed' && <input className='form-control fs-6' type="text" name="submitURL" disabled value={this.state.submitURL} onChange={e => this.handleChange(e)}/>} 
          {this.props.status === 'Pending' && <input className='btn btn-danger mt-2' type="submit" value="Submit" />}
        </form>
      </div>
    )
  }
}

export default SubmitTask;
