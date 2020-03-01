import { get } from 'dotty';
import { createSelector } from 'reselect';

import { createApiActionSet } from '../../utils/api';

// This is the path which is used to store the API reducer within the Redux store
const ROOT_REDUCER_STATE_PATH = 'api';
export const getApiState = state => get(state, ROOT_REDUCER_STATE_PATH) || {};

export const getApiLoadingState = createSelector(
  getApiState,
  apiState => get(apiState, 'isLoading'),
);
export const getIsCollectionEndpointLoading = (collection, endpoint) =>
  createSelector(
    getApiLoadingState,
    isLoadingState =>
      get(isLoadingState, createApiActionSet(collection)[endpoint]),
  );

export const getApiErrorState = createSelector(
  getApiState,
  apiState => get(apiState, 'error'),
);
export const getIsCollectionEndpointError = (collection, endpoint) =>
  createSelector(
    getApiErrorState,
    errorState => get(errorState, createApiActionSet(collection)[endpoint]),
  );
