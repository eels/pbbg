import axios from 'axios';
import { SERVER_DOMAIN } from 'config/constants';

export default axios.create({ baseURL: SERVER_DOMAIN, withCredentials: true });
