import React, { Component } from 'react';
 
class EditMilestoneTasks extends Component {

    state = {listTasks: this.props.tasks}

  render() {
    return (
        <div>
        <ul>
        {this.props.tasks.map(task => {
           return <li key={task._id}>
               <p>{task.name}</p>
               <button>Delete</button>
           </li>
        })}
        </ul>
        </div>
    )
  }
}
 
export default EditMilestoneTasks;