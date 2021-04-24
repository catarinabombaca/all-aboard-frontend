import axios from 'axios';

class JourneyDetailsService {
  constructor() {
    let service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/template`,
      withCredentials: true
    });
    this.service = service;
  }

  getJourneyDetails = (id) => {
    return this.service.get(`/journeys/${id}/details`)
    .then(response => response.data)
  }

  deleteJourneyDetail = (journeyID, detailsID) => {
    return this.service.delete(`/journeys/${journeyID}/details/${detailsID}`)
    .then(response => response.data)
  }

  createJourneyDetails = (id, journeyDetails) => {
    return this.service.post(`/journeys/${id}/details`, journeyDetails)
    .then(response => response.data)
  }
}

export default JourneyDetailsService;