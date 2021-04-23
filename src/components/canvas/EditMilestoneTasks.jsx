import React, { Component } from 'react';
import TasksService from './task-service';
import TaskCard from './TaskCard';

class EditMilestoneTasks extends Component {

    state = {listTasks: this.props.tasks, allTasks: [], filteredTasks: []}
    tasksService = new TasksService();

    addTaskToMilestone = (task) => {
      const listTasks = [...this.state.listTasks]
      listTasks.push(task)
      this.setState({listTasks: listTasks})
    }

    removeTaskFromMilestone = (task) => {
      const listTasks = [...this.state.listTasks]
      listTasks.splice(listTasks.indexOf(task._id), 1)
      this.setState({listTasks: listTasks})
    }

    saveTasksChanges = () => {
      const promises = [];
      this.state.listTasks.forEach((task) => {
        promises.push(this.tasksService.editTask(task._id, {milestoneID: this.props.match.params.id}))
      })
      Promise.all(promises)
        .then(() => {
        this.props.getMilestoneTasks()
        this.props.setViewMode()
        })
        .catch(err => console.log(err))
    }

    searchQuery = (searchString) => {
      const pattern = new RegExp(searchString, 'i');
      const filteredTasks = this.state.allTasks.filter(task => pattern.test(task.name) );
      if(searchString === '') {
        this.setState({filteredTasks: [...this.state.allTasks]})
      } else {
        this.setState({filteredTasks: filteredTasks})
      }
      }

    handleChange = (e) => {
      const {value} = e.target
      this.searchQuery(value)
    }

    componentDidMount() {
      this.tasksService.tasks()
      .then(tasksFromDB => {
        this.setState({allTasks: tasksFromDB, filteredTasks: tasksFromDB})
      })
      .catch(err => console.log(err))
  }

  componentDidUpdate(prevProps) {
    if(prevProps.match.params.id !== this.props.match.params.id) {
        this.props.getListItem();
        this.props.getMilestoneTasks();
        this.props.setViewMode();
        }
    }

  render() {
    return (
        <div className='rounded-3 bg-blue'>
          <div className='d-flex flex-row justify-content-end'>
            <h4 className='mt-3 flex-grow-1 text-start ps-4'>Edit Tasks</h4>
            <button className='mx-2 mt-3 btn btn-light btn-dark-blue' onClick={() => this.props.setViewMode()}>Cancel</button>
            <button className='mx-2 mt-3 btn btn-danger' onClick={() => this.saveTasksChanges()}>Save Changes</button>
          </div>
          <div className='container-fluid'>
          <div className='row h-100 align-items-start justify-content-evenly m-1 mt-3 pb-3'>
            <div className='col-sm mb-2'>
            {this.state.listTasks.length === 0 && <p className='p-4'>Added tasks will show up here.</p>}
            <ul className="list-group">
              {this.state.listTasks.map(task => {
                return <TaskCard key={task._id} task={task} removeBtn={true} removeTaskFromMilestone={this.removeTaskFromMilestone} selectedTasks={this.state.listTasks.map((task) => task._id)}/>
            })}
            </ul>
            </div>

            <div className='col-sm mb-2'>
              <input className='w-100 mb-3 rounded-3 ps-2' type='text' name='search' onChange={this.handleChange}/>
              {this.state.filteredTasks.length === 0 && <p>No results found!</p>}
              <ul className="list-group">
              {this.state.filteredTasks.map(task => {
                return <TaskCard key={task._id} task={task} removeBtn={false} addTaskToMilestone={this.addTaskToMilestone} selectedTasks={this.state.listTasks.map((task) => task._id)}/>
              })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
 
export default EditMilestoneTasks;