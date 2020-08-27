import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { fetchSet } from './actions';
import { LoadingSpinner } from '../presentation/loadingSpinner';

const SetTitle = styled.h1`
    margin: auto;
    text-align: center;
    padding: 20px;
`;

const CardSets = styled.div`
    margin: 0px;
`;

const CardLink = styled.div`
    padding: 5px;
`;

class Sets extends Component {
  componentDidMount() {
    const { fetchSetAction } = this.props;
    fetchSetAction();
  }

  render() {
    const { sets, isFetching, error } = this.props;
    const setLinks = sets.map(
      (set) => (
        <CardLink key={uuid.v4()} className="col-12 col-md-3">
          <Link to={`/set/${set}/1`}>
            {set}
          </Link>
        </CardLink>
      ),
    );

    return (
      <CardSets className="container">
        <SetTitle>Card Sets</SetTitle>
        <span className="sets-error">{error}</span>
        {isFetching ? <LoadingSpinner /> : (
          <div className="row">
            { setLinks }
          </div>
        )}
      </CardSets>
    );
  }
}

Sets.defaultProps = {
  sets: [],
  error: '',
};

Sets.propTypes = {
  fetchSetAction: PropTypes.func.isRequired,
  sets: PropTypes.arrayOf(PropTypes.string),
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

const mapStateToProps = (state) => ({
  error: state.sets.error,
  sets: state.sets.names,
  isFetching: state.sets.isFetching,
});

const mapDispatchToProps = {
  fetchSetAction: fetchSet,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sets));
