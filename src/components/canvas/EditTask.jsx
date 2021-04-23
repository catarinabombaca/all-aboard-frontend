import React, { Component } from 'react';
import TaskService from './task-service';

class EditTask extends Component {

  state = {...this.props.task};
  taskService = new TaskService();

  
  handleFormSubmit = (event) => {
    event.preventDefault();
    const {params} = this.props.match

    this.taskService.editTask(params.id, this.state)
    .then(() => {
        this.props.getListItem();
        this.props.setViewMode();
    })
    .catch(err => console.log(err))
  }

    handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  componentDidUpdate(prevProps) {
    if(prevProps.match.params.id !== this.props.match.params.id) {
        this.props.getListItem();
        this.props.setViewMode()
        }
    }

  render(){
    return (
      <div className='rounded-3 bg-blue'>
        <form onSubmit={this.handleFormSubmit}>
          <div className='d-flex flex-row justify-content-end'>
            <h4  className='mt-3 flex-grow-1 text-start ps-4'>Edit Task</h4>
            <button className='mx-2 mt-3 btn btn-dark-blue' onClick={() => this.props.setViewMode()}>Cancel</button>
            <input className='mx-2 mt-3 btn btn-danger' type="submit" value="Submit" />
          </div>

          <div className='my-3 mx-5 px-lg-5'>
            <label className="form-label">Name</label>
            <input className="form-control" type="text" name="name" value={this.state.name} onChange={e => this.handleChange(e)}/>
          </div>
          <div className='my-3 mx-5 px-lg-5'>
            <label className="form-label">Description</label>
            <textarea className="form-control" name="description" value={this.state.description} onChange={e => this.handleChange(e)}/>
          </div>
          <div className='my-3 mx-5 px-lg-5'>
          <label className="form-label">Type</label>
            <select className="form-control" name="type" value={this.state.type} onChange={ e => this.handleChange(e)}>
                <option value="General">General</option>
                <option value="Course">Course</option>
                <option value="Ramp Up">Ramp Up</option>
            </select>
          </div>
          {this.state.type !== 'Course' && <div className='my-3 mx-5 px-lg-5'>
              <label className="form-label">Link to complementary documentation</label>
              <input className="form-control" type="text" name="docURL" value={this.state.docURL} onChange={e => this.handleChange(e)}/>
              </div>}
          {this.state.type === 'Course' && <div className='my-3 mx-5 px-lg-5'>
              <label className="form-label">Link to Course</label>
              <input className="form-control" type="text" name="course" value={this.state.course} onChange={e => this.handleChange(e)}/>
              </div>}
          <div className='my-4 mx-5 px-lg-5 pb-4'>
            <label className="form-label">Expected Duration</label>
            <input className="form-control" type="number" name="expectedDuration" value={this.state.expectedDuration} onChange={e => this.handleChange(e)}/>
          </div>
        </form>
      </div>
    )
  }
}

export default EditTask;
