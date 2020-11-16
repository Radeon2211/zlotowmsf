import axios from 'axios';
import { machineIP } from '../shared/constants';

const baseURLs = {
  server: 'https://zlotowmsf.pl/wp-json',
  localhost: `http://${machineIP}/msfzlotow/wp-json`,
};

const instance = axios.create({
  baseURL: baseURLs.server,
  headers: {
    'Cache-Control': 'no-cache',
  },
});

export default instance;
