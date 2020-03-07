const PREFIX = 'API';
/**
 * This util is used to generate action-types for all stages of making a request to the server
 * @param endpoint {string} - The endpoint to generate actions for
 */
export const getActionTypes = endpoint => ({
  // This action can be used to initiate a request to the endpoint
  fetch: `${PREFIX}_${endpoint}_FETCH`,

  // This action is used to signify the beginning of a request to the API
  start: `${PREFIX}_${endpoint}_START`,
  // This action signifies that the server responded with success
  success: `${PREFIX}_${endpoint}_SUCCESS`,
  // This action signifies that the server responded with an error
  failure: `${PREFIX}_${endpoint}_FAILURE`,
});
