import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sortCards } from '../set/actions';
import { sortResults } from '../search/actions';

class SortDropdown extends Component {
  handleSort = (event) => {
    const { sortResultsAction, sortCardsAction } = this.props;
    const { parent } = this.props;
    let direction = '';
    let parameter = event.target.value;
    if (event.target.value[0] === '-') {
      direction = 'desc';
      parameter = event.target.value.slice(1);
    } else {
      direction = 'asc';
    }

    if (parent === 'set') {
      sortCardsAction(direction, parameter);
    } else {
      sortResultsAction(direction, parameter);
    }
  }

  render() {
    return (
      <select
        className="custom-select"
        onChange={this.handleSort}
      >
        <option disabled value="">Sort Cards</option>
        <option value="name">Name (Asc)</option>
        <option value="-name">Name (Desc)</option>
        <option value="price[cardSlice.cards.price.length - 1].value">Price (Asc)</option>
        <option value="-price[cardSlice.cards.price.length - 1].value">Price (Desc)</option>
        <option value="cmc">CMC (Asc)</option>
        <option value="-cmc">CMC (Desc)</option>
      </select>
    );
  }
}

SortDropdown.propTypes = {
  parent: PropTypes.string.isRequired,
  sortCardsAction: PropTypes.func.isRequired,
  sortResultsAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  sortResultsAction: sortResults,
  sortCardsAction: sortCards,
};

export default connect(null, mapDispatchToProps)(SortDropdown);
