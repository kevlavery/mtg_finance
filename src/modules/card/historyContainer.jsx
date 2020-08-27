import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Card from './historyComponent';
import { fetchCard, findOtherEditions } from './actions';

class HistoryContainer extends Component {
  constructor(props) {
    super(props);
    const { fetchCardAction, match, cards } = this.props;
    if (!cards[match.params.scryfallId]) {
      fetchCardAction(match.params.scryfallId);
    }
  }

  componentDidUpdate(prevProps) {
    const { fetchCardAction, match } = this.props;
    if (match.params.scryfallId !== prevProps.match.params.scryfallId) {
      fetchCardAction(match.params.scryfallId);
    }
  }

  render() {
    const { match, cards, findOtherEditionsAction } = this.props;
    let info = {};
    let card = null;
    if (cards[match.params.scryfallId]) {
      findOtherEditionsAction(cards[match.params.scryfallId].info.name);
      info = cards[match.params.scryfallId].info;
      card = (
        <Card
          info={info}
        />
      );
    }
    return (
      <div>
        {card}
      </div>
    );
  }
}

HistoryContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      scryfallId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  cards: PropTypes.shape({
    info: PropTypes.shape({
      scryfallId: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      cmc: PropTypes.number.isRequired,
      scryfallLink: PropTypes.string.isRequired,
      set: PropTypes.string.isRequired,
      oracle: PropTypes.string.isRequired,
      imageURL: PropTypes.string.isRequired,
      price: PropTypes.arrayOf(PropTypes.shape({
        date: PropTypes.date,
        value: PropTypes.number.isRequired,
      })),
    }),
  }).isRequired,
  fetchCardAction: PropTypes.func.isRequired,
  findOtherEditionsAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cards: state.cards.items,
});

const mapDispatchToProps = {
  fetchCardAction: fetchCard,
  findOtherEditionsAction: findOtherEditions,
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryContainer);
