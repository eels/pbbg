import type { Status, StatusCode } from 'types/http';

export function getStatusCode(status: Status): StatusCode {
  switch (status) {
    case 'ERROR':
      return 500;
    case 'FORBIDDEN':
      return 403;
    case 'RATE-LIMITED':
      return 429;
    case 'SUCCESS':
      return 200;
    case 'UNAUTHORISED':
      return 401;
  }
}

export function getStatus(statusCode: StatusCode): Status {
  switch (statusCode) {
    case 200:
      return 'SUCCESS';
    case 401:
      return 'UNAUTHORISED';
    case 403:
      return 'FORBIDDEN';
    case 429:
      return 'RATE-LIMITED';
    case 500:
      return 'ERROR';
  }
}
