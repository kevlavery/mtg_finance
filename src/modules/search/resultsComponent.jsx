import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ConnectedCardSummary from '../card/summaryComponent';
import SortDropDown from '../sortDropdown/component';
import { LoadingSpinner } from '../presentation/loadingSpinner';

const SetTitle = styled.h1`
    margin: auto;
    text-align: center;
    padding: 20px 0px 0px;
`;
const BadResults = styled.h3`
    padding: 10%;
    margin: auto;
    text-align: center;
`;
const DropDown = styled.div`
    margin: auto 0;
    padding 20px;
`;

// sorting not working on search results
class SearchResults extends Component {
  // Stops no cards found message from re-rendering when new query is input
  shouldComponentUpdate(nextProps) {
    const { query } = this.props;
    return nextProps.query === query;
  }

  render() {
    const {
      query, fetching, error, results,
    } = this.props;
    let output = '';

    if (fetching) {
      return (
        <div className="container">
          <SetTitle>Search Results</SetTitle>
          <LoadingSpinner />
        </div>
      );
    }

    if (error) {
      output = (
        <BadResults>
          Error with search, please try a different query.
        </BadResults>
      );
    }

    if (results.length > 100) {
      output = (
        <BadResults>
          Your search &quot;
          {query}
          &quot; resulted in over 100 cards, please refine your search or try browsing the sets.
        </BadResults>
      );
    } else if (results.length !== 0) {
      const cards = results.map(
        (card) => (
          <div key={card.scryfallId} className="col-sm-12 col-md-6 col-lg-3 py-2">
            <ConnectedCardSummary
              productId={card.scryfallId}
              parent="query"
            />
          </div>
        ),
      );

      output = (
        <div className="container">
          <div className="row justify-content-md-center">
            <DropDown className="col-md-3">
              <SortDropDown parent="query" />
            </DropDown>
          </div>
          <div className="row">{cards}</div>
        </div>
      );
    } else {
      output = (
        <BadResults>
          No cards found containing: &quot;
          {query}
          &quot;
        </BadResults>
      );
    }

    return (
      <div className="container">
        <SetTitle>Search Results</SetTitle>
        {output}
      </div>
    );
  }
}

SearchResults.defaultProps = {
  error: '',
};

SearchResults.propTypes = {
  query: PropTypes.string.isRequired,
  fetching: PropTypes.bool.isRequired,
  error: PropTypes.string,
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  results: state.query.cards,
  query: state.query.content,
  submitCount: state.query.submits,
  fetching: state.query.isFetching,
  hasErrored: state.query.hasErrored,
});

export default connect(mapStateToProps)(SearchResults);
