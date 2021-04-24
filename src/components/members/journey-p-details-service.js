import axios from 'axios';

class JourneyDetailsProgressService {
  constructor() {
    let service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/data`,
      withCredentials: true
    });
    this.service = service;
  }

  getJourneyDetailsProgress = (id) => {
    return this.service.get(`/journeys-progress/${id}/details`)
    .then(response => response.data)
  }

  deleteJourneyDetailProgress = (journeyID, detailsID) => {
    return this.service.delete(`/journeys-progress/${journeyID}/details/${detailsID}`)
    .then(response => response.data)
  }

  createJourneyDetailsProgress = (id, journeyDetails) => {
    return this.service.post(`/journeys-progress/${id}/details`, journeyDetails)
    .then(response => response.data)
  }
}

export default JourneyDetailsProgressService;