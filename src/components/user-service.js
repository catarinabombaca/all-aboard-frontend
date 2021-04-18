import axios from 'axios';

class UserService {
  constructor() {
    let service = axios.create({
      baseURL: 'http://localhost:5000',
      withCredentials: true
    });
    this.service = service;
  }

  getUsers = () => {
    return this.service.get('/users')
    .then(response => response.data)
  }

  getUser = (id) => {
    return this.service.get(`/users/${id}`)
    .then(response => response.data)
  }

  editUser = (id, data) => {
    return this.service.put(`/users/${id}`, data)
    .then(response => response.data)
  }

}

export default UserService;
