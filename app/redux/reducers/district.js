import { handleActions } from 'redux-actions';
import { createApiActionSet } from '../../utils/api';
import { getActionTypes } from '../action-types/api';
import { DISTRICTS_COLLECTION, GET_ONE } from '../../constants/api';

export const initialState = {};

const actionSets = createApiActionSet(DISTRICTS_COLLECTION);
const getAllActionName = actionSets[GET_ONE];
const actionTypes = getActionTypes(getAllActionName);
const getDistrictSuccess = actionTypes.success;

export default handleActions(
  {
    [getDistrictSuccess]: (state, action) => action.payload.resp,
  },
  initialState,
);
