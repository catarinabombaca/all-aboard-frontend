import React, { Component } from 'react';
import TaskService from './task-service';

class CreateTask extends Component {

  state = {name: '', description: '', type: '', course: '', docURL: '', expectedDuration: 0};
  taskService = new TaskService();

  
  handleFormSubmit = (event) => {
    event.preventDefault();

    this.taskService.createTask(this.state)
    .then(() => {
      this.props.history.push('/canvas')
      this.props.getTasks();
    })
    .catch(err => console.log(err))
  }

    handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render(){
    return (
      <div className="bg-blue col-md-8 d-flex flex-column align-items-stretch justify-content-start">
        <form onSubmit={this.handleFormSubmit}>
          <div className='d-flex flex-row justify-content-end'>
            <h4 className='mt-3 flex-grow-1 text-start ps-4'>Create Task</h4>
            <button className='mx-2 mt-3 btn btn-dark-blue' onClick={() => this.props.history.push('/canvas')}>Cancel</button>
            <input className='mx-2 mt-3 btn btn-danger' type="submit" value="Submit" />
          </div>
          <hr></hr>
          <div className='my-3 mx-5 px-lg-5 d-flex flex-column'>
            <label className='form-label'>Name</label>
            <input className='form-control'type="text" name="name" value={this.state.name} onChange={e => this.handleChange(e)}/>
          </div>

        <div className='my-3 mx-5 px-lg-5 d-flex flex-column'>
            <label className='form-label'>Description</label>
            <textarea className='form-control' name="description" value={this.state.description} onChange={e => this.handleChange(e)}/>
        </div>

        <div className='my-3 mx-5 px-lg-5 d-flex flex-column'>
          <label className='form-label'>Type</label>
          <select className='form-control' name="type" value={this.state.type} onChange={ e => this.handleChange(e)}>
                <option value="General">General</option>
                <option value="Course">Course</option>
                <option value="Ramp Up">Ramp Up</option>
          </select>
        </div>
          {this.state.type !== 'Course' && <div className='my-3 mx-5 px-lg-5 d-flex flex-column'>
              <label className='form-label'>URL to complementary documentation</label>
              <input className='form-control' type="text" name="docURL" value={this.state.docURL} onChange={e => this.handleChange(e)}/>
              </div>}
          {this.state.type === 'Course' && <div className='my-3 mx-5 px-lg-5 d-flex flex-column'>
              <label className='form-label'>URL to course</label>
              <input className='form-control' type="text" name="course" value={this.state.course} onChange={e => this.handleChange(e)}/>
              </div>}

          <div className='my-4 mx-5 px-lg-5 pb-4'>
            <label className='form-label'>Expected Duration</label>
            <input className='form-control' type="number" name="expectedDuration" value={this.state.expectedDuration} onChange={e => this.handleChange(e)}/>
          </div>
        </form>
      </div>
    )
  }
}

export default CreateTask;
