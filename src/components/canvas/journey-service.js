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

}

export default JourneyService;
