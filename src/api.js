import axios from 'axios';

axios.defaults.baseURL = 'https://api.github.com/';
axios.defaults.auth = {
  username: 'brandonhall'
};
axios.defaults.headers = {
  'Accept': 'application/vnd.github.v3+json'
};
axios.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
);

export default axios;
