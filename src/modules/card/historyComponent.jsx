import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { CustomTicks } from './customTicks';

const Title = styled.div`
  padding:  3% 5%;
`;

const TitleText = styled.h2`
  text-align: center;
`;

const CardHistory = styled.div`
  margin: auto 15%;
`;

const CardName = styled.h3`
  text-align: center;
`;

const CardInfo = styled.div`
  white-space:pre-wrap;
  line-height: 1.6;

  background: #24305E;
  color: #FFF;
  border-radius: 15px;

  height: auto;
  width: 100%;
`;

const CardEditions = styled.div`
  background: #F8E9A1;
  text-align: center;
  border-radius: 15px;

  height: auto;
  width: 100%;
`;

const TransformButton = styled.button`
  margin: 10px auto;
`;

const CardImage = styled.img`
  display: block;
  height: auto;
  max-width: 100%;
`;

const CardContainer = styled.div`
  text-align: center;
`;

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardFront: true,
    };
  }

  flipImage = () => {
    this.setState((state) => ({ cardFront: !state.cardFront }));
  }

  getImageName = () => {
    const { info } = this.props;
    const { cardFront } = this.state;
    return cardFront ? info.imageURL : info.faces.back.imageURL;
  }

  render() {
    const { info, currentCard } = this.props;
    const { oracle } = info;
    const productName = info.name;
    const setName = info.set;
    let frontName = productName;
    let backName = '';
    let oracleBack = '';
    if (info.faces) {
      frontName = info.faces.front.name;
      backName = info.faces.back.name;
      oracleBack = info.faces.back.oracle;
    }
    const image = this.getImageName();
    const price = info.price[info.price.length - 1].value;
    const medPrice = (Number.isNaN(parseInt(price)) 
      ? 'N/A' : Number(price).toFixed(2));

    let otherEditions = [];
    if (currentCard.editions.length !== 0) {
      otherEditions = currentCard.editions.map(
        (card) => (
          <div key={card.scryfallId}>
            <Link to={`/card/${card.scryfallId}`}>
              {card.set}
            </Link>
          </div>
        ),
      );
    }

    return (
      <CardHistory>
        <Title className="container">
          <div className="row justify-content-between">
            <TitleText className="col-lg-4">{productName}</TitleText>
            <TitleText className="col-lg-4">
              (
              {setName}
              )
            </TitleText>
            <TitleText className="col-lg-4">
              Today $
              {medPrice}
            </TitleText>
          </div>
        </Title>
        <div className="container py-3">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              width={300}
              height={300}
              data={info.price}
            >
              <Line name="Price" type="monotone" dataKey="value" stroke="#24305E" />
              <XAxis dataKey="date" tick={<CustomTicks />} />
              <YAxis
                domain={[0.00, (dataMax) => (dataMax * 1.25).toFixed(2)]}
                label={{ value: 'USD', angle: -90, position: 'insideLeft' }}
              />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip labelFormatter={(date) => {
                const tempDate = new Date(date);
                return tempDate.toDateString();
              }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="container py-3">
          <div className="row">
            <CardContainer className="col-lg-4 mx-auto my-2">
              <CardImage src={image} alt={productName} />
              {info.faces ? (
                <TransformButton
                  className="btn btn-secondary justify-content-center my-10"
                  onClick={this.flipImage}
                >
                  Transform
                </TransformButton>
              ) : false}
            </CardContainer>
            <div className="col-lg-4 my-2">
              <CardInfo className="px-3 py-4">
                <CardName>{frontName}</CardName>
                <p>{oracle}</p>
                <CardName>{backName}</CardName>
                <p>{oracleBack}</p>
              </CardInfo>
            </div>
            <div className="col-lg-4 my-2">
              <CardEditions className="px-3 py-4">
                <CardName>Prints</CardName>
                {otherEditions}
              </CardEditions>
            </div>
          </div>
        </div>
      </CardHistory>
    );
  }
}

Card.propTypes = {
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
  }).isRequired,
  currentCard: PropTypes.shape({
    editions: PropTypes.arrayOf(PropTypes.shape({
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
    })),
  }).isRequired,
};

const mapStateToProps = (state) => ({
  currentCard: state.cards.current,
});

export default connect(mapStateToProps)(Card);
