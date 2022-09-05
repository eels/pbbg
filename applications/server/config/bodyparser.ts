import type { BodyParserConfig } from '@ioc:Adonis/Core/BodyParser';

const bodyParserConfig: BodyParserConfig = {
  /*
  |--------------------------------------------------------------------------
  | Form parser settings
  |--------------------------------------------------------------------------
  |
  | The settings for the `application/x-www-form-urlencoded` parser. The types
  | defines the request content types which gets processed by the form parser.
  |
  */

  form: {
    convertEmptyStringsToNull: true,
    encoding: 'utf-8',
    limit: '1mb',
    queryString: {},
    types: ['application/x-www-form-urlencoded'],
  },

  /*
  |--------------------------------------------------------------------------
  | JSON parser settings
  |--------------------------------------------------------------------------
  |
  | The settings for the JSON parser. The types defines the request content
  | types which gets processed by the JSON parser.
  |
  */

  json: {
    encoding: 'utf-8',
    limit: '1mb',
    strict: true,
    types: [
      'application/json',
      'application/json-patch+json',
      'application/vnd.api+json',
      'application/csp-report',
    ],
  },

  /*
  |--------------------------------------------------------------------------
  | Multipart parser settings
  |--------------------------------------------------------------------------
  |
  | The settings for the `multipart/form-data` parser. The types defines the
  | request content types which gets processed by the form parser.
  |
  */

  multipart: {
    autoProcess: true,
    convertEmptyStringsToNull: true,
    encoding: 'utf-8',
    limit: '20mb',
    maxFields: 1000,
    processManually: [],
    types: ['multipart/form-data'],
  },

  /*
  |--------------------------------------------------------------------------
  | Raw body parser settings
  |--------------------------------------------------------------------------
  |
  | Raw body just reads the request body stream as a plain text, which you
  | can process by hand. This must be used when request body type is not
  | supported by the body parser.
  |
  */

  raw: {
    encoding: 'utf-8',
    limit: '1mb',
    queryString: {},
    types: ['text/*'],
  },

  /*
  |--------------------------------------------------------------------------
  | White listed methods
  |--------------------------------------------------------------------------
  |
  | HTTP methods for which body parsing must be performed. It is a good practice
  | to avoid body parsing for `GET` requests.
  |
  */

  whitelistedMethods: ['POST', 'PUT', 'PATCH', 'DELETE'],
};

export default bodyParserConfig;
