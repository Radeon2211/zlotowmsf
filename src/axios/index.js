import axios from 'axios';
import { machineIP } from '../shared/constants';

const baseURLServer = 'https://zlotowmsf.pl/wp-json';
const baseURLLocalhost = `http://${machineIP}/msfzlotow/wp-json`;

const instance = axios.create({
  baseURL: baseURLServer,
});

export default instance;
