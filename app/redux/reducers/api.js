import extend from 'deep-extend';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import {
  ALL_COLLECTIONS,
  GET_ALL,
  GET_ONE,
  CREATE,
  UPDATE,
  DELETE,
} from '../../constants/api';
import { createApiActionSet } from '../../utils/api';
import { getActionTypes } from '../action-types/api';

export const initialLoadingState = {};
export const loadingReducer = handleActions(
  ALL_COLLECTIONS.reduce((acc, collection) => {
    const {
      [GET_ALL]: getAll,
      [GET_ONE]: getOne,
      [CREATE]: create,
      [UPDATE]: update,
      [DELETE]: deleteEndpoint,
    } = createApiActionSet(collection);
    // Add listeners for all endpoints in the collection
    [getAll, getOne, create, update, deleteEndpoint].forEach(endpoint => {
      // Get the required action-types for each endpoint
      const { start, success, failure } = getActionTypes(endpoint);
      // When an API request is starting, indicate that the endpoint is "loading"
      acc[start] = state => extend({}, state, { [endpoint]: true });

      // Whether a request succeeds or fails, indicate that the endpoint is no longer "loading"
      acc[success] = ({ [endpoint]: endpointNoLongerLoading, ...state }) =>
        extend({}, state);
      acc[failure] = ({ [endpoint]: endpointNoLongerLoading, ...state }) =>
        extend({}, state);
    });
    return acc;
  }, {}),
  initialLoadingState,
);

export const initialErrorState = {};
export const errorReducer = handleActions(
  ALL_COLLECTIONS.reduce((acc, collection) => {
    const {
      [GET_ALL]: getAll,
      [GET_ONE]: getOne,
      [CREATE]: create,
      [UPDATE]: update,
      [DELETE]: deleteEndpoint,
    } = createApiActionSet(collection);
    // Add listeners for all endpoints in the collection
    [getAll, getOne, create, update, deleteEndpoint].forEach(endpoint => {
      // Get the required action-types for each endpoint
      const { start, failure } = getActionTypes(endpoint);
      // When a new request is being made, clear the previous error for the endpoint
      acc[start] = ({ [endpoint]: endpointNoLongerLoading, ...state }) =>
        extend({}, state);

      // If an error occurs while an endpoint is being called, track the error message into this reducer for that specific endpoint
      acc[failure] = (state, { payload }) =>
        extend({}, state, { [endpoint]: payload.message });
    });
    return acc;
  }, {}),
  initialErrorState,
);

/**
 * The apiReducer should be added to the Redux store under the key "api" for all selectors to work properly
 */
export const apiReducer = combineReducers({
  isLoading: loadingReducer,
  error: errorReducer,
});

export default apiReducer;
