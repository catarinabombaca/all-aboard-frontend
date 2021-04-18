import axios from 'axios';

class JourneyProgressService {
  constructor() {
    let service = axios.create({
      baseURL: 'http://localhost:5000/data',
      withCredentials: true
    });
    this.service = service;
  }

  journeysProgress = () => {
    return this.service.get('/journeys-progress')
    .then(response => response.data)
  }

  getJourneyProgress = (id) => {
    return this.service.get(`/journeys-progress/${id}`)
    .then(response => response.data)
  }

  createJourneyProgress = (data) => {
    return this.service.post(`/journeys-progress`, data)
    .then(response => response.data)
  }

  editJourneyProgress = (id, data) => {
    return this.service.put(`/journeys-progress/${id}`, data)
    .then(response => response.data)
  }

  deleteJourneyProgress = (id) => {
    return this.service.delete(`/journeys-progress/${id}`)
    .then(response => response.data)
  }


}

export default JourneyProgressService;
