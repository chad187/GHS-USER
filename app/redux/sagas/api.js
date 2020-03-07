import qs from 'querystring';
import fetch from 'isomorphic-fetch';
import { put, race, call, delay } from 'redux-saga/effects';

import { createEndpointCrudSet } from '../../utils/api';
import { getEndpointActionsForCollection } from '../actions/api';

/**
 * Creates an API saga for a given collection's endpoint
 * @param collection {string} - The collection being requested
 * @param endpint - The "action" being requested on the collection
 */
export const createApiSaga = (collection, endpoint) =>
  // eslint-disable-next-line func-names
  function*({ id, ...args } = {}) {
    // Get actions for start, success, and failure for the given endpoint
    const actions = getEndpointActionsForCollection(collection)[endpoint];
    const { start, success, failure } = actions;
    const { method, uri } = createEndpointCrudSet(collection)[endpoint];

    try {
      // Dispatch the action indicating that the API request is starting
      yield put(start(args));

      // If an id is included with the args, it should replace the placeholder in any endpoint URI
      const requestUri = uri.replace('{id}', id);

      let queryParams = {};
      // If the endpoint uses the GET verb, append args to the URI (e.g. "limit" and "skip")
      if (method === 'GET') {
        queryParams = args;
      }

      const queryString = qs.stringify(queryParams);
      const completeEndpointUri = `${requestUri}?${queryString}`;
      console.log(completeEndpointUri);

      const { response } = yield race({
        response: call(fetch, completeEndpointUri, {
          method,
          headers: {
            Accept: 'application/json',
            ...(method !== 'GET' ? { 'Content-Type': 'application/json' } : {}),
          },
          ...(method !== 'GET' ? { body: JSON.stringify(args || {}) } : {}),
        }),
        // If response has not been received within the allotted time, cancel the request
        timeout: delay(1000),
      });

      console.log('here');

      // If no response was received (e.g. the saga timed out), dispatch the failure action
      if (!response) {
        yield put(failure(args, 'Connection timeout'));
        return null;
      }

      // Parse the json response
      const { message, ...resp } = yield response.json();

      // If an error message was received from the server, dispatch the failure action
      if (message) {
        yield put(failure());
      }

      // Otherwise, dispatch the success action
      yield put(success(args, resp));

      // Return the response to any saga which called this API saga
      return resp;
    } catch (e) {
      yield put(failure(args, e.message));
      return null;
    }
  };
