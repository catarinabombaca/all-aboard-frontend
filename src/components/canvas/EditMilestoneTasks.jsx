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

  render() {
    return (
        <div>
        <ul>
        {this.state.listTasks.map(task => {
            return <TaskCard key={task._id} task={task} removeBtn={true} removeTaskFromMilestone={this.removeTaskFromMilestone} selectedTasks={this.state.listTasks.map((task) => task._id)}/>
        })}
        </ul>
        <input type='text' name='search' onChange={this.handleChange}/>
        <ul>
        {this.state.filteredTasks.map(task => {
           return <TaskCard key={task._id} task={task} removeBtn={false} addTaskToMilestone={this.addTaskToMilestone} selectedTasks={this.state.listTasks.map((task) => task._id)}/>
        })}
        </ul>
        <button onClick={() => this.props.setViewMode()}>Cancel</button>
        <button onClick={() => this.saveTasksChanges()}>Save Changes</button>
        </div>
    )
  }
}
 
export default EditMilestoneTasks;