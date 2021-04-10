import axios from 'axios';

class JourneyDetailsService {
  constructor() {
    let service = axios.create({
      baseURL: 'http://localhost:5000/template',
      withCredentials: true
    });
    this.service = service;
  }

  getJourneyDetails = (id) => {
    return this.service.get(`/journeys/${id}/details`)
    .then(response => response.data)
  }

}

export default JourneyDetailsService;