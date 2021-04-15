import React, { Component } from 'react';
import TasksService from './task-service';
import TaskCard from './TaskCard';
 
class EditMilestoneTasks extends Component {

    state = {listTasks: this.props.tasks, allTasks: [], filteredTasks: []}
    tasksService = new TasksService();

    addTaskToMilestone = (task) => {
      const listTasks = [...this.state.listTasks]
      const tasksAvailable = [...this.state.tasksAvailable]
      listTasks.push(task)
      tasksAvailable.splice(tasksAvailable.indexOf(task.id), 1)
      this.setState({listTasks: listTasks, tasksAvailable: tasksAvailable, filterTasks: tasksAvailable})
    }

    removeTaskFromMilestone = (task) => {
      const listTasks = [...this.state.listTasks]
      const tasksAvailable = [...this.state.tasksAvailable]
      listTasks.splice(listTasks.indexOf(task.id), 1)
      tasksAvailable.push(task)
      console.log(tasksAvailable)
      this.setState({listTasks: listTasks, tasksAvailable: tasksAvailable, filterTasks: tasksAvailable})
    }

    componentDidMount() {
      this.tasksService.tasks()
      .then(tasksFromDB => {
        

        this.setState({allTasks: tasksFromDB, filteredTasks: tasksFromDB})
      })
      .catch(err => console.log(err))
  }

  render() {
    console.log(this.props.tasks)
    return (
        <div>
        <ul>
        {this.state.listTasks.map(task => {
           return <li key={task._id}>
               <p>{task.name}</p>
               <button onClick={() => this.removeTaskFromMilestone(task)}>Remove</button>
           </li>
        })}
        </ul>
        <input type='text'/>
        <ul>
        {this.state.filteredTasks.map(task => {
           return <TaskCard key={task._id} name={task.name} id={task._id} selectedTasks={this.state.listTasks.map((task) => task._id)}/>
        })}
        </ul>
        </div>
    )
  }
}
 
export default EditMilestoneTasks;