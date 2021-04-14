import React, { Component } from 'react';
import TasksService from './task-service';
 
class EditMilestoneTasks extends Component {

    state = {listTasks: this.props.tasks, tasksAvailable: [], filterTasks: []}
    tasksService = new TasksService();

    componentDidMount() {
      this.tasksService.tasks()
      .then(tasksFromDB => {
        let tasksAvailable = [];
        this.state.listTasks.forEach(taskFromList => {
          const index = tasksFromDB.indexOf(taskFromList.id)
          tasksAvailable = tasksFromDB.splice(index, 1)
        });
        this.setState({tasksAvailable: tasksAvailable, filterTasks: tasksAvailable})
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
        <div>
        <ul>
        {this.state.listTasks.map(task => {
           return <li key={task._id}>
               <p>{task.name}</p>
               <button>Remove</button>
           </li>
        })}
        </ul>
        <input type='text' value='Search'/>
        <ul>
        {this.state.filterTasks.map(task => {
           return <li key={task._id}>
               <p>{task.name}</p>
               <button>Add</button>
           </li>
        })}
        </ul>
        </div>
    )
  }
}
 
export default EditMilestoneTasks;