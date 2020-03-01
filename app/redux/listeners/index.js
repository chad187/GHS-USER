import { all, fork } from 'redux-saga/effects';

import { collectionListeners as apilisteners } from './api';

const allListeners = [apilisteners];

// eslint-disable-next-line func-names
export const masterListenerSaga = function*() {
  yield all(allListeners.map(listener => fork(listener)));
};

export default masterListenerSaga;
