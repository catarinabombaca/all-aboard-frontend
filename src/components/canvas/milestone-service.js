import axios from 'axios';

class MilestoneService {
  constructor() {
    let service = axios.create({
      baseURL: 'http://localhost:5000/template',
      withCredentials: true
    });
    this.service = service;
  }

  milestones = () => {
    return this.service.get('/milestones')
    .then(response => response.data)
  }

  getMilestone = (id) => {
    return this.service.get(`/milestones/${id}`)
    .then(response => response.data)
  }

  getMilestoneTasks = (id) => {
    return this.service.get(`milestones/${id}/tasks`)
    .then(response => response.data)
  }

  editMilestone = (id, data) => {
    return this.service.put(`/milestones/${id}`, data)
    .then(response => response.data)
  }

  deleteMilestone = (id) => {
    return this.service.delete(`/milestones/${id}`)
    .then(response => response.data)
  }
}

export default MilestoneService;
