import type { HTTPResponseOptions, Response, Status, StatusCode } from 'types/http';

interface HTTPResponseObject {
  CODE: StatusCode;
  DATA?: Record<string, any>;
  MESSAGE?: string;
  STATUS: Status;
}

function getHttpStatusCode(status: Status): StatusCode {
  switch (status) {
    case 'ERROR':
      return 500;
    case 'FORBIDDEN':
      return 403;
    case 'SUCCESS':
      return 200;
    case 'UNAUTHORISED':
      return 401;
  }
}

export function buildHttpResponse(response: Response) {
  return function (status: Status, options?: HTTPResponseOptions) {
    const responseObject: HTTPResponseObject = {
      CODE: getHttpStatusCode(status),
      DATA: options?.data,
      MESSAGE: options?.message,
      STATUS: status,
    };

    if (!options?.data) {
      delete responseObject.DATA;
    }

    if (!options?.message) {
      delete responseObject.MESSAGE;
    }

    response.status(getHttpStatusCode(status));
    response.json(responseObject);
  };
}