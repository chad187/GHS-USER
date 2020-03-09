import { get } from 'dotty';
import { createSelector } from 'reselect';

export const getDistricts = state => get(state, 'districts') || [];
export const getDistrict = createSelector(
  getDistricts,
  (_, id) => id,
  (districts, id) => districts.find(district => district._id === id) || null,
);
export const getDistrictListLength = createSelector(
  getDistricts,
  districts => districts.length,
);
