import React, { Component } from 'react';

class SubmitTask extends Component {

  state = {submitURL: ''};

  
  handleFormSubmit = (event) => {
    event.preventDefault();

    this.props.editTask({
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
          <label>Insert here the link to the final deliverable</label>
          {this.props.status === 'Pending' && <input className='form-control' type="text" name="submitURL" value={this.state.submitURL} onChange={e => this.handleChange(e)}/>}
          {this.props.status === 'Closed' && <input className='form-control' type="text" name="submitURL" disabled value={this.state.submitURL} onChange={e => this.handleChange(e)}/>} 
          {this.props.status === 'Pending' && <input type="submit" value="Submit" />}
        </form>
      </div>
    )
  }
}

export default SubmitTask;
