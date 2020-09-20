import axios from 'axios';
import { machineIP } from '../shared/constants';

const baseURLServer = 'https://zlotowmsf.pl/wp-json/wp/v2';
const baseURLLocalhost = `http://${machineIP}/msfzlotow/wp-json/wp/v2`;

const instance = axios.create({
  baseURL: baseURLServer,
});

export default instance;
