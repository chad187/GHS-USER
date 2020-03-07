import { all, fork, take } from 'redux-saga/effects';

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
import { createApiSaga } from '../sagas/api';

// eslint-disable-next-line func-names
export const collectionListeners = function*() {
  yield all(
    ALL_COLLECTIONS.reduce((acc, collection) => {
      [GET_ALL, GET_ONE, CREATE, UPDATE, DELETE].forEach(endpoint => {
        const apiEndpointAction = createApiActionSet(collection)[endpoint];
        const apiRequestSaga = createApiSaga(collection, endpoint);
        const { fetch } = getActionTypes(apiEndpointAction);

        // For each endpoint, listen for the "fetch" action, upon receiving the action, initiate
        // the api request using the payload from the fetch action
        acc.push(
          // eslint-disable-next-line func-names
          fork(function*() {
            while (true) {
              // eslint-disable-next-line no-undef
              const { payload } = yield take(fetch);
              // eslint-disable-next-line no-undef
              yield fork(apiRequestSaga, payload);
            }
          }),
        );
      });

      return acc;
    }, []),
  );
};
