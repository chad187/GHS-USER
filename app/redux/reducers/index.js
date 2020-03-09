/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from '../../utils/history';
import languageProviderReducer from '../../containers/LanguageProvider/reducer';

import apiReducer from './api';
import districtsReducer from './districts';
import districtReducer from './district';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    language: languageProviderReducer,
    router: connectRouter(history),

    api: apiReducer,
    districts: districtsReducer,
    district: districtReducer,
    ...injectedReducers,
  });

  return rootReducer;
}
