type ErrorStatus = 'ERROR';
type FailStatus = 'FAIL';
type SuccessStatus = 'SUCCESS';

export interface ErrorResponse {
  code?: number;
  message: Lowercase<string>;
  status: ErrorStatus;
}

export interface FailResponse {
  code?: number;
  message: Lowercase<string>;
  status: FailStatus;
}

export interface SuccessResponse<T> {
  code?: number;
  data: T;
  status: SuccessStatus;
}

export type Status = ErrorStatus | FailStatus | SuccessStatus;
export type APIResponse<T> = ErrorResponse | FailResponse | SuccessResponse<T>;
