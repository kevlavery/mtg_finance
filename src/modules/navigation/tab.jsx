import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';


const Tab = (props) => {
  const { name } = props;

  return (
    <div>
      <li className="nav-item">
        <NavLink
          activeClassName="active"
          className="nav-link"
          to={`${name}`}
        >
          {name.replace(/\b\w/g, (l) => l.toUpperCase())}
        </NavLink>
      </li>
    </div>
  );
};

Tab.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Tab;
