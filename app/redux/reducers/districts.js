import { handleActions } from 'redux-actions';
import { createApiActionSet } from '../../utils/api';
import { getActionTypes } from '../action-types/api';
import { DISTRICTS_COLLECTION, GET_ALL } from '../../constants/api';

export const initialState = [];

const actionSets = createApiActionSet(DISTRICTS_COLLECTION);
const getAllActionName = actionSets[GET_ALL];
const actionTypes = getActionTypes(getAllActionName);
const getDistrictsSuccess = actionTypes.success;

export default handleActions(
  {
    [getDistrictsSuccess]: (state, action) => action.payload.resp.list,
  },
  initialState,
);
