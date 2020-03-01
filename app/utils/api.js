import {
  API_HOST,
  PROTOCOL,
  GET_ALL,
  GET_ONE,
  CREATE,
  UPDATE,
  DELETE,
} from '../constants/api';

/**
 * This util is used to generate unique CRUD constants for a collection
 * @param collectionName {string} - The collection to generate endpoint constants for
 */
export const createApiActionSet = collectionName => ({
  [GET_ALL]: `${collectionName.toUpperCase()}_GET_ALL`,
  [GET_ONE]: `${collectionName.toUpperCase()}_GET_ONE`,
  [CREATE]: `${collectionName.toUpperCase()}_CREATE`,
  [UPDATE]: `${collectionName.toUpperCase()}_UPDATE`,
  [DELETE]: `${collectionName.toUpperCase()}_DELETE`,
});

/**
 * This util will generate CRUD endpoint configs for a given collection
 * @param collection {string} - The collection to create CRUD request configs for
 */
export const createEndpointCrudSet = collection => ({
  [GET_ALL]: {
    method: 'GET',
    uri: `${PROTOCOL}://${API_HOST}/api/${collection}`,
  },
  [GET_ONE]: {
    method: 'GET',
    uri: `${PROTOCOL}://${API_HOST}/api/${collection}/{id}`,
  },
  [CREATE]: {
    method: 'POST',
    uri: `${PROTOCOL}://${API_HOST}/api/${collection}`,
  },
  [UPDATE]: {
    method: 'PUT',
    uri: `${PROTOCOL}://${API_HOST}/api/${collection}/{id}`,
  },
  [DELETE]: {
    method: 'DELETE',
    uri: `${PROTOCOL}://${API_HOST}/api/${collection}/{id}`,
  },
});
