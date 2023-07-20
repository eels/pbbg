export interface FormError {
  field?: string;
  message?: string;
}

export interface FormErrors {
  [key: string]: FormError;
}
