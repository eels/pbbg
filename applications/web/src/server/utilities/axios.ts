import axios from 'axios';
import http from 'node:http';
import https from 'node:https';
import type { AgentOptions } from 'node:http';

const requestAgentOptions: AgentOptions = {
  keepAlive: true,
};

export const axiosInstance = axios.create({
  httpAgent: new http.Agent(requestAgentOptions),
  httpsAgent: new https.Agent(requestAgentOptions),
  timeout: 60000,
});
