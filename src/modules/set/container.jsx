import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { fetchSet, sortCards } from './actions';
import CurrentSet from './component';
import Pagination from './pagination';
import SortDropDown from '../sortDropdown/component';

const SetTitle = styled.h1`
    margin: auto;
    text-align: center;
    padding: 20px 0px 0px;
`;
const DropDown = styled.div`
    margin: auto 0;
`;

class SetContainer extends Component {
  constructor(props) {
    super(props);
    const { fetchSetAction, sortCardsAction, match } = this.props;
    fetchSetAction(match.params.id).then(() => sortCardsAction('asc', 'name'));
  }

  render() {
    const { match } = this.props;
    const setName = match.params.id;
    return (
      <div>
        <SetTitle>{setName}</SetTitle>
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-md-auto">
              <Pagination id={setName} />
            </div>
            <DropDown className="col-md-3">
              <SortDropDown parent="set" />
            </DropDown>
          </div>
        </div>
        <Route
          path={`${match.url}/:position`}
          component={CurrentSet}
        />
        <div className="container">
          <Pagination id={setName} />
        </div>
      </div>
    );
  }
}

SetContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  fetchSetAction: PropTypes.func.isRequired,
  sortCardsAction: PropTypes.func.isRequired,

};

const mapStateToProps = (state) => ({
  set: state.set,
});

const mapDispatchToProps = {
  fetchSetAction: fetchSet,
  sortCardsAction: sortCards,
};

export default connect(mapStateToProps, mapDispatchToProps)(SetContainer);
