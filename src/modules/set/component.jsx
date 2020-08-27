import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ConnectedCardSummary from '../card/summaryComponent';
import { LoadingSpinner } from '../presentation/loadingSpinner';
import { setPosition } from './actions';

const CardArray = styled.div`
    padding: 20px 0px;
`;

class CurrentSet extends Component {
  constructor(props) {
    super(props);
    const { setPositionAction, match } = this.props;
    setPositionAction(Number(match.params.position));
  }

  render() {
    const cards = [];
    const { set, match } = this.props;
    if (!set.isFetching) {
      // the array starts at 0, but having the user interface start at 1 is more intuitive
      const start = match.params.position * 20 - 20;
      const end = Math.min(set.total, start + 20);
      for (let index = start; index < end; index += 1) {
        cards.push(
          <div
            key={set.cards[index].scryfallId}
            className="col-sm-12 col-md-6 col-lg-3 py-2"
          >
            <ConnectedCardSummary
              productId={set.cards[index].scryfallId}
              parent="set"
            />
          </div>,
        );
      }
    } else {
      return (
        <LoadingSpinner />
      );
    }
    return (
      <CardArray className="container">
        <div className="row">
          {cards}
        </div>
      </CardArray>
    );
  }
}

CurrentSet.propTypes = {
  setPositionAction: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      position: PropTypes.string.isRequired,
    }).isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  set: PropTypes.shape(
    PropTypes.bool.isRequired,
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.number.isRequired,
    PropTypes.string.isRequired,
  ).isRequired,
};

const mapStateToProps = (state) => ({
  set: state.set,
});

const mapDispatchToProps = {
  setPositionAction: setPosition,
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentSet);
