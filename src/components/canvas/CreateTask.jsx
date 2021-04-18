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
      <div>
        <h3>Create Task</h3>
        <form onSubmit={this.handleFormSubmit}>
          <label>Name:</label>
          <input type="text" name="name" value={this.state.name} onChange={e => this.handleChange(e)}/>
          <label>Description:</label>
          <textarea name="description" value={this.state.description} onChange={e => this.handleChange(e)}/>
          <label>Type:</label>
            <select name="type" value={this.state.type} onChange={ e => this.handleChange(e)}>
                <option value="General">General</option>
                <option value="Course">Course</option>
                <option value="Ramp Up">Ramp Up</option>
            </select>
          {this.state.type !== 'Course' && <div>
              <label>Link to complementary documentation:</label>
              <input type="text" name="docURL" value={this.state.docURL} onChange={e => this.handleChange(e)}/>
              </div>}
          {this.state.type === 'Course' && <div>
              <label>Link to course:</label>
              <input type="text" name="course" value={this.state.course} onChange={e => this.handleChange(e)}/>
              </div>}
          <label>Expected duration:</label>
          <input type="number" name="expectedDuration" value={this.state.expectedDuration} onChange={e => this.handleChange(e)}/>
              
          <button onClick={() => this.props.history.push('/canvas')}>Cancel</button>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default CreateTask;
