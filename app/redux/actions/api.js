import { createAction } from 'redux-actions';

import { GET_ALL, GET_ONE, CREATE, UPDATE, DELETE } from '../../constants/api';
import { createApiActionSet } from '../../utils/api';
import { getActionTypes } from '../action-types/api';

/**
 * This util generates action creators which can be used to dispatch structured, predictable
 * actions into the Redux store for making API requests
 * @param endpoint {string} - Collection endpoint to gerate Redux action-creators for
 */
export const getActionCreatorsForEndpoint = endpoint => {
  const { fetch, start, success, failure } = getActionTypes(endpoint);
  return {
    fetch: createAction(fetch, (args = {}) => ({ ...args })),
    start: createAction(start, (args = {}) => ({ ...args })),
    success: createAction(success, (args, resp) => ({ ...args, resp })),
    failure: createAction(failure, (args, reason) => ({ ...args, reason })),
  };
};

export const getEndpointActionsForCollection = collection => {
  const {
    [GET_ALL]: getAll,
    [GET_ONE]: getOne,
    [CREATE]: create,
    [UPDATE]: update,
    [DELETE]: deleteEndpointAction,
  } = createApiActionSet(collection);
  return {
    [GET_ALL]: getActionCreatorsForEndpoint(getAll),
    [GET_ONE]: getActionCreatorsForEndpoint(getOne),
    [CREATE]: getActionCreatorsForEndpoint(create),
    [UPDATE]: getActionCreatorsForEndpoint(update),
    [DELETE]: getActionCreatorsForEndpoint(deleteEndpointAction),
  };
};
