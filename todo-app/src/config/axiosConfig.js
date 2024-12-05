import axios from 'axios';

export const BASE_URL = 'http://localhost:8000';

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

export default instance;