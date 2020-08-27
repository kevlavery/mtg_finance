import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CardHolder = styled.div`
    margin: auto;
`;

const Text = styled.p`
    text-align: center;
    margin: 0px auto;
`;

export const CardSummary = (props) => {
  const { productId, cards, parent } = props;
  let medPrice = 'N/A';
  const currentCard = cards.filter(
    (obj) => obj.scryfallId === productId,
  )[0];
  let price = 'N/A';
  if (typeof currentCard.price[currentCard.price.length - 1] !== 'undefined') {
    price = currentCard.price[currentCard.price.length - 1].value;
  }

  // add feature to show set name for query resurts
  medPrice = (Number.isNaN(price)
    ? 'N/A' : Number(price).toFixed(2));

  return (
    <CardHolder>
      <Link to={`/card/${currentCard.scryfallId}`}>
        <img
          className="img-fluid"
          src={currentCard.imageURL}
          alt={currentCard.name}
        />
        <Text><strong>{currentCard.name}</strong></Text>
        { parent === 'query'
          && (
          <Text>
            {currentCard.set}
          </Text>
          )}
        <Text>
          Price: $
          {medPrice}
        </Text>
      </Link>
    </CardHolder>
  );
};

CardSummary.propTypes = {
  productId: PropTypes.string.isRequired,
  parent: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(PropTypes.shape({
    filter: PropTypes.func,
    info: PropTypes.shape({
      faces: PropTypes.shape({
        front: PropTypes.shape({
          name: PropTypes.string.isRequired,
        }).isRequired,
        back: PropTypes.shape({
          name: PropTypes.string.isRequired,
          oracle: PropTypes.string.isRequired,
          imageURL: PropTypes.string.isRequired,
        }).isRequired,
      }),
      name: PropTypes.string.isRequired,
      cmc: PropTypes.number.isRequired,
      set: PropTypes.string.isRequired,
      oracle: PropTypes.string.isRequired,
      imageURL: PropTypes.string.isRequired,
      price: PropTypes.arrayOf(PropTypes.shape({
        date: PropTypes.date,
        value: PropTypes.number,
      })),
    }),
  })).isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  cards: state[ownProps.parent].cards,
});
export default connect(mapStateToProps)(CardSummary);
