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
    case 'RATE-LIMITED':
      return 429;
    case 'SUCCESS':
      return 200;
    case 'UNAUTHORISED':
      return 401;
  }
}

export function constructHttpResponseObject(status: Status, options?: HTTPResponseOptions) {
  const responseObject: HTTPResponseObject = {
    CODE: getHttpStatusCode(status),
    DATA: options?.data,
    MESSAGE: options?.message?.toLowerCase(),
    STATUS: status,
  };

  if (!options?.data) {
    delete responseObject.DATA;
  }

  if (!options?.message) {
    delete responseObject.MESSAGE;
  }

  return responseObject;
}

export function buildHttpResponse(response: Response) {
  return function (status: Status, options?: HTTPResponseOptions) {
    const statusCode = getHttpStatusCode(status);
    const responseObject = constructHttpResponseObject(status, options);

    response.status(statusCode).json(responseObject);
  };
}
