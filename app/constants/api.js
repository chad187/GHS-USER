// Collections
export const DISTRICTS_COLLECTION = 'districts';
export const SCHOOLS_COLLECTION = 'schools';
export const USERS_COLLECTION = 'users';

export const GET_ALL = 'getAll';
export const GET_ONE = 'getOne';
export const CREATE = 'create';
export const UPDATE = 'update';
export const DELETE = 'DELETE';

export const ALL_COLLECTIONS = [
  DISTRICTS_COLLECTION,
  SCHOOLS_COLLECTION,
  USERS_COLLECTION,
];
// TO DO get production url for ghs api
export const API_HOST =
  process.env.NODE_ENV === 'production' ? '' : 'localhost:4040';
export const PROTOCOL = 'http';
