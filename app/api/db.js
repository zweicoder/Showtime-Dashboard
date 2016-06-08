// Mock db queries to localhost server that predicts. Ideally the records are inserted with it's predictions so we don't have to repredict everytime
import axios from 'axios';

export default {
  getData() {
    return axios.get('/predict', { baseURL: 'http://localhost:5000' })
      .then(function (res) {
        return res.data.data
      });
  }
}
