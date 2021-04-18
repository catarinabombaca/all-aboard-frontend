import axios from 'axios';

class MilestoneProgressService {
  constructor() {
    let service = axios.create({
      baseURL: 'http://localhost:5000/data',
      withCredentials: true
    });
    this.service = service;
  }

  milestonesProgress = () => {
    return this.service.get('/milestones-progress')
    .then(response => response.data)
  }

  getMilestoneProgress = (id) => {
    return this.service.get(`/milestones-progress/${id}`)
    .then(response => response.data)
  }

  getMilestoneTasksProgress = (id) => {
    return this.service.get(`milestones-progress/${id}/tasks`)
    .then(response => response.data)
  }

  createMilestoneProgress = (data) => {
    return this.service.post(`/milestones-progress`, data)
    .then(response => response.data)
  }

  editMilestoneProgress = (id, data) => {
    return this.service.put(`/milestones-progress/${id}`, data)
    .then(response => response.data)
  }

  deleteMilestoneProgress = (id) => {
    return this.service.delete(`/milestones-progress/${id}`)
    .then(response => response.data)
  }
}

export default MilestoneProgressService;
