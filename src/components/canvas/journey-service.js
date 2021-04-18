import axios from 'axios';

class JourneyService {
  constructor() {
    let service = axios.create({
      baseURL: 'http://localhost:5000/template',
      withCredentials: true
    });
    this.service = service;
  }

  journeys = () => {
    return this.service.get('/journeys')
    .then(response => response.data)
  }

  getJourney = (id) => {
    return this.service.get(`/journeys/${id}`)
    .then(response => response.data)
  }

  createJourney = (data) => {
    return this.service.post(`/journeys`, data)
    .then(response => response.data)
  }

  editJourney = (id, data) => {
    return this.service.put(`/journeys/${id}`, data)
    .then(response => response.data)
  }

  deleteJourney = (id) => {
    return this.service.delete(`/journeys/${id}`)
    .then(response => response.data)
  }


}

export default JourneyService;
