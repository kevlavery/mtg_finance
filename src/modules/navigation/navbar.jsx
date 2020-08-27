import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import SearchBar from '../search/searchBarComponent';

class MTGNav extends Component {
  constructor(props) {
    super(props);
    this.state = { navCollapsed: true };
  }

  onToggleNav = () => {
    const { navCollapsed } = this.state;
    this.setState({ navCollapsed: !navCollapsed });
  }

  render() {
    const { navCollapsed } = this.state;

    const isSet = (match, location) => {
      const re = /^\/sets?\//i;
      return re.exec(location.pathname);
    };

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/home">MTG Finance</a>
          <button
            className="navbar-toggler collapsed"
            type="button"
            data-toggle="collapse"
            aria-expanded="false"
            onClick={this.onToggleNav}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className={`${navCollapsed ? 'collapse' : ''} navbar-collapse`}
            id="navbarNav"
          >
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink
                  activeClassName="active"
                  className="nav-link"
                  to="/home"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  activeClassName="active"
                  className="nav-link"
                  isActive={isSet}
                  to="/sets"
                >
                  Sets
                </NavLink>
              </li>
            </ul>
            <SearchBar
              inputWidth="8"
            />
          </div>
        </nav>
      </div>
    );
  }
}

export default MTGNav;
