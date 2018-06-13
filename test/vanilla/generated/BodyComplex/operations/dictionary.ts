/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import * as msRest from "ms-rest-js";
import * as Models from "../models";
import * as Mappers from "../models/dictionaryMappers";
import { AutoRestComplexTestServiceContext } from "../autoRestComplexTestServiceContext";

const WebResource = msRest.WebResource;

/** Class representing a Dictionary. */
export class Dictionary {
  private readonly client: AutoRestComplexTestServiceContext;
  private readonly serializer = new msRest.Serializer(Mappers);
  /**
   * Create a Dictionary.
   * @param {AutoRestComplexTestServiceContext} client Reference to the service client.
   */
  constructor(client: AutoRestComplexTestServiceContext) {
    this.client = client;
  }

  /**
   * Get complex types with dictionary property
   *
   * @param {RequestOptionsBase} [options] Optional Parameters.
   *
   * @returns {Promise} A promise is returned
   *
   * @resolve {HttpOperationResponse} - The deserialized result object.
   *
   * @reject {Error|ServiceError} - The error object.
   */
  async getValidWithHttpOperationResponse(options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.DictionaryWrapper>> {
    let client = this.client;

    // Create HTTP transport objects
    const httpRequest = new WebResource();
    let operationRes: msRest.HttpOperationResponse;
    try {
      const operationArguments: msRest.OperationArguments = msRest.createOperationArguments({}, options);
      operationRes = await client.sendOperationRequest(
        httpRequest,
        operationArguments,
        {
          httpMethod: "GET",
          baseUrl: this.client.baseUri,
          path: "complex/dictionary/typed/valid",
          serializer: this.serializer
        });
      let statusCode = operationRes.status;
      if (statusCode !== 200) {
        let error = new msRest.RestError(operationRes.bodyAsText as string);
        error.statusCode = operationRes.status;
        error.request = msRest.stripRequest(httpRequest);
        error.response = msRest.stripResponse(operationRes);
        let parsedErrorResponse = operationRes.parsedBody as { [key: string]: any };
        try {
          if (parsedErrorResponse) {
            let internalError = null;
            if (parsedErrorResponse.error) internalError = parsedErrorResponse.error;
            error.code = internalError ? internalError.code : parsedErrorResponse.code;
            error.message = internalError ? internalError.message : parsedErrorResponse.message;
          }
          if (parsedErrorResponse !== null && parsedErrorResponse !== undefined) {
            const resultMapper = Mappers.ErrorModel;
            error.body = this.serializer.deserialize(resultMapper, parsedErrorResponse, 'error.body');
          }
        } catch (defaultError) {
          error.message = `Error "${defaultError.message}" occurred in deserializing the responseBody ` +
                           `- "${operationRes.bodyAsText}" for the default response.`;
          return Promise.reject(error);
        }
        return Promise.reject(error);
      }
      // Deserialize Response
      if (statusCode === 200) {
        let parsedResponse = operationRes.parsedBody as { [key: string]: any };
        try {
          if (parsedResponse !== null && parsedResponse !== undefined) {
            const resultMapper = Mappers.DictionaryWrapper;
            operationRes.parsedBody = this.serializer.deserialize(resultMapper, parsedResponse, 'operationRes.parsedBody');
          }
        } catch (error) {
          let deserializationError = new msRest.RestError(`Error ${error} occurred in deserializing the responseBody - ${operationRes.bodyAsText}`);
          deserializationError.request = msRest.stripRequest(httpRequest);
          deserializationError.response = msRest.stripResponse(operationRes);
          return Promise.reject(deserializationError);
        }
      }

    } catch(err) {
      return Promise.reject(err);
    }

    return Promise.resolve(operationRes);
  }

  /**
   * Put complex types with dictionary property
   *
   * @param {DictionaryPutValidOptionalParams} [options] Optional Parameters.
   *
   * @returns {Promise} A promise is returned
   *
   * @resolve {HttpOperationResponse} - The deserialized result object.
   *
   * @reject {Error|ServiceError} - The error object.
   */
  async putValidWithHttpOperationResponse(options?: Models.DictionaryPutValidOptionalParams): Promise<msRest.HttpOperationResponse<void>> {
    let client = this.client;
    let defaultProgram = (options && options.defaultProgram !== undefined) ? options.defaultProgram : undefined;
    // Validate
    try {
      if (defaultProgram && typeof defaultProgram === 'object') {
        for(let valueElement in defaultProgram) {
          if (defaultProgram[valueElement] !== null && defaultProgram[valueElement] !== undefined && typeof defaultProgram[valueElement].valueOf() !== 'string') {
            throw new Error('defaultProgram[valueElement] must be of type string.');
          }
        }
      }
    } catch (error) {
      return Promise.reject(error);
    }

    // Create HTTP transport objects
    const httpRequest = new WebResource();
    let operationRes: msRest.HttpOperationResponse;
    try {
      const operationArguments: msRest.OperationArguments = msRest.createOperationArguments(
        {
          defaultProgram
        },
        options);
      operationRes = await client.sendOperationRequest(
        httpRequest,
        operationArguments,
        {
          httpMethod: "PUT",
          baseUrl: this.client.baseUri,
          path: "complex/dictionary/typed/valid",
          requestBody: {
            parameterPath: {
              defaultProgram: "defaultProgram"
            },
            mapper: Mappers.DictionaryWrapper
          },
          contentType: "application/json; charset=utf-8",
          serializer: this.serializer
        });
      let statusCode = operationRes.status;
      if (statusCode !== 200) {
        let error = new msRest.RestError(operationRes.bodyAsText as string);
        error.statusCode = operationRes.status;
        error.request = msRest.stripRequest(httpRequest);
        error.response = msRest.stripResponse(operationRes);
        let parsedErrorResponse = operationRes.parsedBody as { [key: string]: any };
        try {
          if (parsedErrorResponse) {
            let internalError = null;
            if (parsedErrorResponse.error) internalError = parsedErrorResponse.error;
            error.code = internalError ? internalError.code : parsedErrorResponse.code;
            error.message = internalError ? internalError.message : parsedErrorResponse.message;
          }
          if (parsedErrorResponse !== null && parsedErrorResponse !== undefined) {
            const resultMapper = Mappers.ErrorModel;
            error.body = this.serializer.deserialize(resultMapper, parsedErrorResponse, 'error.body');
          }
        } catch (defaultError) {
          error.message = `Error "${defaultError.message}" occurred in deserializing the responseBody ` +
                           `- "${operationRes.bodyAsText}" for the default response.`;
          return Promise.reject(error);
        }
        return Promise.reject(error);
      }

    } catch(err) {
      return Promise.reject(err);
    }

    return Promise.resolve(operationRes);
  }

  /**
   * Get complex types with dictionary property which is empty
   *
   * @param {RequestOptionsBase} [options] Optional Parameters.
   *
   * @returns {Promise} A promise is returned
   *
   * @resolve {HttpOperationResponse} - The deserialized result object.
   *
   * @reject {Error|ServiceError} - The error object.
   */
  async getEmptyWithHttpOperationResponse(options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.DictionaryWrapper>> {
    let client = this.client;

    // Create HTTP transport objects
    const httpRequest = new WebResource();
    let operationRes: msRest.HttpOperationResponse;
    try {
      const operationArguments: msRest.OperationArguments = msRest.createOperationArguments({}, options);
      operationRes = await client.sendOperationRequest(
        httpRequest,
        operationArguments,
        {
          httpMethod: "GET",
          baseUrl: this.client.baseUri,
          path: "complex/dictionary/typed/empty",
          serializer: this.serializer
        });
      let statusCode = operationRes.status;
      if (statusCode !== 200) {
        let error = new msRest.RestError(operationRes.bodyAsText as string);
        error.statusCode = operationRes.status;
        error.request = msRest.stripRequest(httpRequest);
        error.response = msRest.stripResponse(operationRes);
        let parsedErrorResponse = operationRes.parsedBody as { [key: string]: any };
        try {
          if (parsedErrorResponse) {
            let internalError = null;
            if (parsedErrorResponse.error) internalError = parsedErrorResponse.error;
            error.code = internalError ? internalError.code : parsedErrorResponse.code;
            error.message = internalError ? internalError.message : parsedErrorResponse.message;
          }
          if (parsedErrorResponse !== null && parsedErrorResponse !== undefined) {
            const resultMapper = Mappers.ErrorModel;
            error.body = this.serializer.deserialize(resultMapper, parsedErrorResponse, 'error.body');
          }
        } catch (defaultError) {
          error.message = `Error "${defaultError.message}" occurred in deserializing the responseBody ` +
                           `- "${operationRes.bodyAsText}" for the default response.`;
          return Promise.reject(error);
        }
        return Promise.reject(error);
      }
      // Deserialize Response
      if (statusCode === 200) {
        let parsedResponse = operationRes.parsedBody as { [key: string]: any };
        try {
          if (parsedResponse !== null && parsedResponse !== undefined) {
            const resultMapper = Mappers.DictionaryWrapper;
            operationRes.parsedBody = this.serializer.deserialize(resultMapper, parsedResponse, 'operationRes.parsedBody');
          }
        } catch (error) {
          let deserializationError = new msRest.RestError(`Error ${error} occurred in deserializing the responseBody - ${operationRes.bodyAsText}`);
          deserializationError.request = msRest.stripRequest(httpRequest);
          deserializationError.response = msRest.stripResponse(operationRes);
          return Promise.reject(deserializationError);
        }
      }

    } catch(err) {
      return Promise.reject(err);
    }

    return Promise.resolve(operationRes);
  }

  /**
   * Put complex types with dictionary property which is empty
   *
   * @param {DictionaryPutEmptyOptionalParams} [options] Optional Parameters.
   *
   * @returns {Promise} A promise is returned
   *
   * @resolve {HttpOperationResponse} - The deserialized result object.
   *
   * @reject {Error|ServiceError} - The error object.
   */
  async putEmptyWithHttpOperationResponse(options?: Models.DictionaryPutEmptyOptionalParams): Promise<msRest.HttpOperationResponse<void>> {
    let client = this.client;
    let defaultProgram = (options && options.defaultProgram !== undefined) ? options.defaultProgram : undefined;
    // Validate
    try {
      if (defaultProgram && typeof defaultProgram === 'object') {
        for(let valueElement in defaultProgram) {
          if (defaultProgram[valueElement] !== null && defaultProgram[valueElement] !== undefined && typeof defaultProgram[valueElement].valueOf() !== 'string') {
            throw new Error('defaultProgram[valueElement] must be of type string.');
          }
        }
      }
    } catch (error) {
      return Promise.reject(error);
    }

    // Create HTTP transport objects
    const httpRequest = new WebResource();
    let operationRes: msRest.HttpOperationResponse;
    try {
      const operationArguments: msRest.OperationArguments = msRest.createOperationArguments(
        {
          defaultProgram
        },
        options);
      operationRes = await client.sendOperationRequest(
        httpRequest,
        operationArguments,
        {
          httpMethod: "PUT",
          baseUrl: this.client.baseUri,
          path: "complex/dictionary/typed/empty",
          requestBody: {
            parameterPath: {
              defaultProgram: "defaultProgram"
            },
            mapper: Mappers.DictionaryWrapper
          },
          contentType: "application/json; charset=utf-8",
          serializer: this.serializer
        });
      let statusCode = operationRes.status;
      if (statusCode !== 200) {
        let error = new msRest.RestError(operationRes.bodyAsText as string);
        error.statusCode = operationRes.status;
        error.request = msRest.stripRequest(httpRequest);
        error.response = msRest.stripResponse(operationRes);
        let parsedErrorResponse = operationRes.parsedBody as { [key: string]: any };
        try {
          if (parsedErrorResponse) {
            let internalError = null;
            if (parsedErrorResponse.error) internalError = parsedErrorResponse.error;
            error.code = internalError ? internalError.code : parsedErrorResponse.code;
            error.message = internalError ? internalError.message : parsedErrorResponse.message;
          }
          if (parsedErrorResponse !== null && parsedErrorResponse !== undefined) {
            const resultMapper = Mappers.ErrorModel;
            error.body = this.serializer.deserialize(resultMapper, parsedErrorResponse, 'error.body');
          }
        } catch (defaultError) {
          error.message = `Error "${defaultError.message}" occurred in deserializing the responseBody ` +
                           `- "${operationRes.bodyAsText}" for the default response.`;
          return Promise.reject(error);
        }
        return Promise.reject(error);
      }

    } catch(err) {
      return Promise.reject(err);
    }

    return Promise.resolve(operationRes);
  }

  /**
   * Get complex types with dictionary property which is null
   *
   * @param {RequestOptionsBase} [options] Optional Parameters.
   *
   * @returns {Promise} A promise is returned
   *
   * @resolve {HttpOperationResponse} - The deserialized result object.
   *
   * @reject {Error|ServiceError} - The error object.
   */
  async getNullWithHttpOperationResponse(options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.DictionaryWrapper>> {
    let client = this.client;

    // Create HTTP transport objects
    const httpRequest = new WebResource();
    let operationRes: msRest.HttpOperationResponse;
    try {
      const operationArguments: msRest.OperationArguments = msRest.createOperationArguments({}, options);
      operationRes = await client.sendOperationRequest(
        httpRequest,
        operationArguments,
        {
          httpMethod: "GET",
          baseUrl: this.client.baseUri,
          path: "complex/dictionary/typed/null",
          serializer: this.serializer
        });
      let statusCode = operationRes.status;
      if (statusCode !== 200) {
        let error = new msRest.RestError(operationRes.bodyAsText as string);
        error.statusCode = operationRes.status;
        error.request = msRest.stripRequest(httpRequest);
        error.response = msRest.stripResponse(operationRes);
        let parsedErrorResponse = operationRes.parsedBody as { [key: string]: any };
        try {
          if (parsedErrorResponse) {
            let internalError = null;
            if (parsedErrorResponse.error) internalError = parsedErrorResponse.error;
            error.code = internalError ? internalError.code : parsedErrorResponse.code;
            error.message = internalError ? internalError.message : parsedErrorResponse.message;
          }
          if (parsedErrorResponse !== null && parsedErrorResponse !== undefined) {
            const resultMapper = Mappers.ErrorModel;
            error.body = this.serializer.deserialize(resultMapper, parsedErrorResponse, 'error.body');
          }
        } catch (defaultError) {
          error.message = `Error "${defaultError.message}" occurred in deserializing the responseBody ` +
                           `- "${operationRes.bodyAsText}" for the default response.`;
          return Promise.reject(error);
        }
        return Promise.reject(error);
      }
      // Deserialize Response
      if (statusCode === 200) {
        let parsedResponse = operationRes.parsedBody as { [key: string]: any };
        try {
          if (parsedResponse !== null && parsedResponse !== undefined) {
            const resultMapper = Mappers.DictionaryWrapper;
            operationRes.parsedBody = this.serializer.deserialize(resultMapper, parsedResponse, 'operationRes.parsedBody');
          }
        } catch (error) {
          let deserializationError = new msRest.RestError(`Error ${error} occurred in deserializing the responseBody - ${operationRes.bodyAsText}`);
          deserializationError.request = msRest.stripRequest(httpRequest);
          deserializationError.response = msRest.stripResponse(operationRes);
          return Promise.reject(deserializationError);
        }
      }

    } catch(err) {
      return Promise.reject(err);
    }

    return Promise.resolve(operationRes);
  }

  /**
   * Get complex types with dictionary property while server doesn't provide a
   * response payload
   *
   * @param {RequestOptionsBase} [options] Optional Parameters.
   *
   * @returns {Promise} A promise is returned
   *
   * @resolve {HttpOperationResponse} - The deserialized result object.
   *
   * @reject {Error|ServiceError} - The error object.
   */
  async getNotProvidedWithHttpOperationResponse(options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<Models.DictionaryWrapper>> {
    let client = this.client;

    // Create HTTP transport objects
    const httpRequest = new WebResource();
    let operationRes: msRest.HttpOperationResponse;
    try {
      const operationArguments: msRest.OperationArguments = msRest.createOperationArguments({}, options);
      operationRes = await client.sendOperationRequest(
        httpRequest,
        operationArguments,
        {
          httpMethod: "GET",
          baseUrl: this.client.baseUri,
          path: "complex/dictionary/typed/notprovided",
          serializer: this.serializer
        });
      let statusCode = operationRes.status;
      if (statusCode !== 200) {
        let error = new msRest.RestError(operationRes.bodyAsText as string);
        error.statusCode = operationRes.status;
        error.request = msRest.stripRequest(httpRequest);
        error.response = msRest.stripResponse(operationRes);
        let parsedErrorResponse = operationRes.parsedBody as { [key: string]: any };
        try {
          if (parsedErrorResponse) {
            let internalError = null;
            if (parsedErrorResponse.error) internalError = parsedErrorResponse.error;
            error.code = internalError ? internalError.code : parsedErrorResponse.code;
            error.message = internalError ? internalError.message : parsedErrorResponse.message;
          }
          if (parsedErrorResponse !== null && parsedErrorResponse !== undefined) {
            const resultMapper = Mappers.ErrorModel;
            error.body = this.serializer.deserialize(resultMapper, parsedErrorResponse, 'error.body');
          }
        } catch (defaultError) {
          error.message = `Error "${defaultError.message}" occurred in deserializing the responseBody ` +
                           `- "${operationRes.bodyAsText}" for the default response.`;
          return Promise.reject(error);
        }
        return Promise.reject(error);
      }
      // Deserialize Response
      if (statusCode === 200) {
        let parsedResponse = operationRes.parsedBody as { [key: string]: any };
        try {
          if (parsedResponse !== null && parsedResponse !== undefined) {
            const resultMapper = Mappers.DictionaryWrapper;
            operationRes.parsedBody = this.serializer.deserialize(resultMapper, parsedResponse, 'operationRes.parsedBody');
          }
        } catch (error) {
          let deserializationError = new msRest.RestError(`Error ${error} occurred in deserializing the responseBody - ${operationRes.bodyAsText}`);
          deserializationError.request = msRest.stripRequest(httpRequest);
          deserializationError.response = msRest.stripResponse(operationRes);
          return Promise.reject(deserializationError);
        }
      }

    } catch(err) {
      return Promise.reject(err);
    }

    return Promise.resolve(operationRes);
  }

  /**
   * Get complex types with dictionary property
   *
   * @param {RequestOptionsBase} [options] Optional Parameters.
   *
   * @param {ServiceCallback} callback - The callback.
   *
   * @returns {ServiceCallback} callback(err, result, request, operationRes)
   *
   *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
   *
   *                      {Models.DictionaryWrapper} [result]   - The deserialized result object if an error did not occur.
   *                      See {@link Models.DictionaryWrapper} for more
   *                      information.
   *
   *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
   *
   *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
   */
  getValid(): Promise<Models.DictionaryWrapper>;
  getValid(options: msRest.RequestOptionsBase): Promise<Models.DictionaryWrapper>;
  getValid(callback: msRest.ServiceCallback<Models.DictionaryWrapper>): void;
  getValid(options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.DictionaryWrapper>): void;
  getValid(options?: msRest.RequestOptionsBase, callback?: msRest.ServiceCallback<Models.DictionaryWrapper>): any {
    if (!callback && typeof options === 'function') {
      callback = options;
      options = undefined;
    }
    let cb = callback as msRest.ServiceCallback<Models.DictionaryWrapper>;
    if (!callback) {
      return this.getValidWithHttpOperationResponse(options).then((operationRes: msRest.HttpOperationResponse) => {
        return Promise.resolve(operationRes.parsedBody as Models.DictionaryWrapper);
      }).catch((err: Error) => {
        return Promise.reject(err);
      });
    } else {
      msRest.promiseToCallback(this.getValidWithHttpOperationResponse(options))((err: Error, data: msRest.HttpOperationResponse) => {
        if (err) {
          return cb(err);
        }
        let result = data.parsedBody as Models.DictionaryWrapper;
        return cb(err, result, data.request, data);
      });
    }
  }

  /**
   * Put complex types with dictionary property
   *
   * @param {DictionaryPutValidOptionalParams} [options] Optional Parameters.
   *
   * @param {ServiceCallback} callback - The callback.
   *
   * @returns {ServiceCallback} callback(err, result, request, operationRes)
   *
   *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
   *
   *                      {void} [result]   - The deserialized result object if an error did not occur.
   *
   *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
   *
   *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
   */
  putValid(): Promise<void>;
  putValid(options: Models.DictionaryPutValidOptionalParams): Promise<void>;
  putValid(callback: msRest.ServiceCallback<void>): void;
  putValid(options: Models.DictionaryPutValidOptionalParams, callback: msRest.ServiceCallback<void>): void;
  putValid(options?: Models.DictionaryPutValidOptionalParams, callback?: msRest.ServiceCallback<void>): any {
    if (!callback && typeof options === 'function') {
      callback = options;
      options = undefined;
    }
    let cb = callback as msRest.ServiceCallback<void>;
    if (!callback) {
      return this.putValidWithHttpOperationResponse(options).then((operationRes: msRest.HttpOperationResponse) => {
        return Promise.resolve(operationRes.parsedBody as void);
      }).catch((err: Error) => {
        return Promise.reject(err);
      });
    } else {
      msRest.promiseToCallback(this.putValidWithHttpOperationResponse(options))((err: Error, data: msRest.HttpOperationResponse) => {
        if (err) {
          return cb(err);
        }
        let result = data.parsedBody as void;
        return cb(err, result, data.request, data);
      });
    }
  }

  /**
   * Get complex types with dictionary property which is empty
   *
   * @param {RequestOptionsBase} [options] Optional Parameters.
   *
   * @param {ServiceCallback} callback - The callback.
   *
   * @returns {ServiceCallback} callback(err, result, request, operationRes)
   *
   *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
   *
   *                      {Models.DictionaryWrapper} [result]   - The deserialized result object if an error did not occur.
   *                      See {@link Models.DictionaryWrapper} for more
   *                      information.
   *
   *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
   *
   *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
   */
  getEmpty(): Promise<Models.DictionaryWrapper>;
  getEmpty(options: msRest.RequestOptionsBase): Promise<Models.DictionaryWrapper>;
  getEmpty(callback: msRest.ServiceCallback<Models.DictionaryWrapper>): void;
  getEmpty(options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.DictionaryWrapper>): void;
  getEmpty(options?: msRest.RequestOptionsBase, callback?: msRest.ServiceCallback<Models.DictionaryWrapper>): any {
    if (!callback && typeof options === 'function') {
      callback = options;
      options = undefined;
    }
    let cb = callback as msRest.ServiceCallback<Models.DictionaryWrapper>;
    if (!callback) {
      return this.getEmptyWithHttpOperationResponse(options).then((operationRes: msRest.HttpOperationResponse) => {
        return Promise.resolve(operationRes.parsedBody as Models.DictionaryWrapper);
      }).catch((err: Error) => {
        return Promise.reject(err);
      });
    } else {
      msRest.promiseToCallback(this.getEmptyWithHttpOperationResponse(options))((err: Error, data: msRest.HttpOperationResponse) => {
        if (err) {
          return cb(err);
        }
        let result = data.parsedBody as Models.DictionaryWrapper;
        return cb(err, result, data.request, data);
      });
    }
  }

  /**
   * Put complex types with dictionary property which is empty
   *
   * @param {DictionaryPutEmptyOptionalParams} [options] Optional Parameters.
   *
   * @param {ServiceCallback} callback - The callback.
   *
   * @returns {ServiceCallback} callback(err, result, request, operationRes)
   *
   *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
   *
   *                      {void} [result]   - The deserialized result object if an error did not occur.
   *
   *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
   *
   *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
   */
  putEmpty(): Promise<void>;
  putEmpty(options: Models.DictionaryPutEmptyOptionalParams): Promise<void>;
  putEmpty(callback: msRest.ServiceCallback<void>): void;
  putEmpty(options: Models.DictionaryPutEmptyOptionalParams, callback: msRest.ServiceCallback<void>): void;
  putEmpty(options?: Models.DictionaryPutEmptyOptionalParams, callback?: msRest.ServiceCallback<void>): any {
    if (!callback && typeof options === 'function') {
      callback = options;
      options = undefined;
    }
    let cb = callback as msRest.ServiceCallback<void>;
    if (!callback) {
      return this.putEmptyWithHttpOperationResponse(options).then((operationRes: msRest.HttpOperationResponse) => {
        return Promise.resolve(operationRes.parsedBody as void);
      }).catch((err: Error) => {
        return Promise.reject(err);
      });
    } else {
      msRest.promiseToCallback(this.putEmptyWithHttpOperationResponse(options))((err: Error, data: msRest.HttpOperationResponse) => {
        if (err) {
          return cb(err);
        }
        let result = data.parsedBody as void;
        return cb(err, result, data.request, data);
      });
    }
  }

  /**
   * Get complex types with dictionary property which is null
   *
   * @param {RequestOptionsBase} [options] Optional Parameters.
   *
   * @param {ServiceCallback} callback - The callback.
   *
   * @returns {ServiceCallback} callback(err, result, request, operationRes)
   *
   *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
   *
   *                      {Models.DictionaryWrapper} [result]   - The deserialized result object if an error did not occur.
   *                      See {@link Models.DictionaryWrapper} for more
   *                      information.
   *
   *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
   *
   *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
   */
  getNull(): Promise<Models.DictionaryWrapper>;
  getNull(options: msRest.RequestOptionsBase): Promise<Models.DictionaryWrapper>;
  getNull(callback: msRest.ServiceCallback<Models.DictionaryWrapper>): void;
  getNull(options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.DictionaryWrapper>): void;
  getNull(options?: msRest.RequestOptionsBase, callback?: msRest.ServiceCallback<Models.DictionaryWrapper>): any {
    if (!callback && typeof options === 'function') {
      callback = options;
      options = undefined;
    }
    let cb = callback as msRest.ServiceCallback<Models.DictionaryWrapper>;
    if (!callback) {
      return this.getNullWithHttpOperationResponse(options).then((operationRes: msRest.HttpOperationResponse) => {
        return Promise.resolve(operationRes.parsedBody as Models.DictionaryWrapper);
      }).catch((err: Error) => {
        return Promise.reject(err);
      });
    } else {
      msRest.promiseToCallback(this.getNullWithHttpOperationResponse(options))((err: Error, data: msRest.HttpOperationResponse) => {
        if (err) {
          return cb(err);
        }
        let result = data.parsedBody as Models.DictionaryWrapper;
        return cb(err, result, data.request, data);
      });
    }
  }

  /**
   * Get complex types with dictionary property while server doesn't provide a
   * response payload
   *
   * @param {RequestOptionsBase} [options] Optional Parameters.
   *
   * @param {ServiceCallback} callback - The callback.
   *
   * @returns {ServiceCallback} callback(err, result, request, operationRes)
   *
   *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
   *
   *                      {Models.DictionaryWrapper} [result]   - The deserialized result object if an error did not occur.
   *                      See {@link Models.DictionaryWrapper} for more
   *                      information.
   *
   *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
   *
   *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
   */
  getNotProvided(): Promise<Models.DictionaryWrapper>;
  getNotProvided(options: msRest.RequestOptionsBase): Promise<Models.DictionaryWrapper>;
  getNotProvided(callback: msRest.ServiceCallback<Models.DictionaryWrapper>): void;
  getNotProvided(options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.DictionaryWrapper>): void;
  getNotProvided(options?: msRest.RequestOptionsBase, callback?: msRest.ServiceCallback<Models.DictionaryWrapper>): any {
    if (!callback && typeof options === 'function') {
      callback = options;
      options = undefined;
    }
    let cb = callback as msRest.ServiceCallback<Models.DictionaryWrapper>;
    if (!callback) {
      return this.getNotProvidedWithHttpOperationResponse(options).then((operationRes: msRest.HttpOperationResponse) => {
        return Promise.resolve(operationRes.parsedBody as Models.DictionaryWrapper);
      }).catch((err: Error) => {
        return Promise.reject(err);
      });
    } else {
      msRest.promiseToCallback(this.getNotProvidedWithHttpOperationResponse(options))((err: Error, data: msRest.HttpOperationResponse) => {
        if (err) {
          return cb(err);
        }
        let result = data.parsedBody as Models.DictionaryWrapper;
        return cb(err, result, data.request, data);
      });
    }
  }

}
