import axios from 'axios';

class TaskProgressService {
  constructor() {
    let service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/data`,
      withCredentials: true
    });
    this.service = service;
  }

  tasksProgress = () => {
    return this.service.get('/tasks-progress')
    .then(response => response.data)
  }

  getTaskProgress = (id) => {
    return this.service.get(`/tasks-progress/${id}`)
    .then(response => response.data)
  }

  createTaskProgress = (data) => {
    return this.service.post(`/tasks-progress`, data)
    .then(response => response.data)
  }

  editTaskProgress = (id, data) => {
    return this.service.put(`/tasks-progress/${id}`, data)
    .then(response => response.data)
  }

  deleteTaskProgress = (id) => {
    return this.service.delete(`/tasks-progress/${id}`)
    .then(response => response.data)
  }

}

export default TaskProgressService;
