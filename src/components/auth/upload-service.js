import axios from "axios";

class UploadService {
    constructor() {
      let service = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        withCredentials: true
      });
      this.service = service;
    }

    handleUpload = (file) => {
        return this.service.post('/upload', file)
        .then(response => response.data)
        .catch(err => console.log(err))
      }
};

export default UploadService;