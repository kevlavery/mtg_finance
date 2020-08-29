import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { setPosition } from './actions';

const PageNav = styled.nav`
    margin: 20px;
`;

class Pagination extends Component {
    handleClick = (position) => () => {
      const { setPositionAction } = this.props;
      setPositionAction(Number(position));
    }

    render() {
      const { set } = this.props;
      const pagesCount = Math.ceil(set.total / 20);
      const position = Number(set.position);
      const { id } = this.props;

      const links = [];
      for (let index = 1; index <= pagesCount; index += 1) {
        links.push(
          <li key={index} className={`page-item ${index === position ? 'active' : ''}`}>
            <NavLink onClick={this.handleClick(index)} className="page-link" to={`/set/${id}/${index}`}>
              {index}
            </NavLink>
          </li>,
        );
      }

      return (
        <PageNav aria-label="Pageination">
          <ul className="pagination flex-wrap justify-content-center">
            <li className={`page-item ${position === 1 ? 'disabled' : ''}`}>
              <NavLink
                onClick={this.handleClick(position - 1)}
                className="page-link"
                to={`/set/${id.toString()}/${(position - 1).toString()}`}
              >
                Previous
              </NavLink>
            </li>
            {links}
            <li className={`page-item ${position >= (pagesCount) ? 'disabled' : ''}`}>
              <NavLink
                onClick={this.handleClick(position + 1)}
                className="page-link"
                to={`/set/${id.toString()}/${(position + 1).toString()}`}
              >
                Next
              </NavLink>
            </li>
          </ul>
        </PageNav>
      );
    }
}

Pagination.propTypes = {
  setPositionAction: PropTypes.func.isRequired,
  set: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    cards: PropTypes.PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      scryfallId: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      cmc: PropTypes.number.isRequired,
      scryfallLink: PropTypes.string.isRequired,
      set: PropTypes.string.isRequired,
      oracle: PropTypes.string.isRequired,
      imageURL: PropTypes.string.isRequired,
    })),
    total: PropTypes.number.isRequired,
    position: PropTypes.number.isRequired,
  }).isRequired,
  id: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  set: state.set,
});

const mapDispatchToProps = {
  setPositionAction: setPosition,
};


export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
