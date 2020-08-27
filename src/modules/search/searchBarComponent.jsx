import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { submitQuery, setQuery } from './actions';

class SearchBar extends Component {
    handleSubmit = (event) => {
      const { history, submitQueryAction } = this.props;
      event.preventDefault();
      submitQueryAction();
      event.target.reset();
      history.push('/search');
    }

    handleChange = (event) => {
      const { setQueryAction } = this.props;
      setQueryAction(event.target.value);
    }

    render() {
      const { inputWidth } = this.props;

      return (
        <form
          className=" my-2 my-lg-0"
          onSubmit={(event) => { this.handleSubmit(event); }}
        >
          <div className="form-row ">
            <div className={`col-${inputWidth}`}>
              <label htmlFor="search" className="sr-only">
                    Search
              </label>
              <input
                type="text"
                className="form-control mr-sm-2"
                id="search"
                placeholder="Card Name"
                onChange={this.handleChange}
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary my-2 my-sm-0">
                  Search
              </button>
            </div>
          </div>
        </form>
      );
    }
}

SearchBar.defaultProps = {
  inputWidth: '8',
};

SearchBar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  inputWidth: PropTypes.string,
  setQueryAction: PropTypes.func.isRequired,
  submitQueryAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  toResults: state.query.toResults,
});

const mapDispatchToProps = {
  submitQueryAction: submitQuery,
  setQueryAction: setQuery,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchBar));
