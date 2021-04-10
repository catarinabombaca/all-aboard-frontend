import axios from 'axios';

class TaskService {
  constructor() {
    let service = axios.create({
      baseURL: 'http://localhost:5000/template',
      withCredentials: true
    });
    this.service = service;
  }

  tasks = () => {
    return this.service.get('/tasks')
    .then(response => response.data)
  }

  getTask = (id) => {
    return this.service.get(`/tasks/${id}`)
    .then(response => response.data)
  }

}

export default TaskService;
