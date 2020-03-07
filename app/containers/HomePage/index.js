/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';

import { compose } from 'redux';
import { connect } from 'react-redux';

import messages from './messages';

import { DISTRICTS_COLLECTION, GET_ALL } from '../../constants/api';
import { getEndpointActionsForCollection } from '../../redux/actions/api';
import { getIsCollectionEndpointLoading } from '../../redux/selectors/api';

// eslint-disable-next-line react/prop-types
export const HomePage = ({ isLoading, getAllDistricts }) => {
  // eslint-disable-next-line no-unused-vars
  const [limit, setLimit] = React.useState(10);
  // eslint-disable-next-line no-unused-vars
  const [page, setPage] = React.useState(0);

  // Anytime `limit` or `page` is changed (by the user interacting with the UI), the districts will be fetched from the server
  React.useEffect(() => {
    // Only make a new call if the endpoint is not already being queried
    if (!isLoading) {
      // Fetch the specified "page" of districts from the server
      getAllDistricts({ limit, skip: page * limit });
    }
  }, [page, limit]);

  return (
    <h1>
      <FormattedMessage {...messages.header} />
    </h1>
  );
};

// Crete outside of mapStateToProps to leverage memoization
const isLoadingSelector = getIsCollectionEndpointLoading(
  DISTRICTS_COLLECTION,
  GET_ALL,
);
const mapStateToProps = state => ({
  isLoading: isLoadingSelector(state),
});

// Get the "fetch" action for the "gat all" behavior on the districts collection
const { fetch } = getEndpointActionsForCollection(DISTRICTS_COLLECTION)[
  GET_ALL
];
const mapDispatchToProps = {
  getAllDistricts: fetch,
};

const hoc = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
);

export default hoc(HomePage);
