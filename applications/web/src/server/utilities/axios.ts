import axios from 'axios';
import http from 'http';
import https from 'https';
import type { AgentOptions } from 'http';

const requestAgentOptions: AgentOptions = {
  keepAlive: true,
};

export const axiosInstance = axios.create({
  httpAgent: new http.Agent(requestAgentOptions),
  httpsAgent: new https.Agent(requestAgentOptions),
  timeout: 60000,
});
