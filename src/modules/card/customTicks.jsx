import React from 'react';
import PropTypes from 'prop-types';

export const CustomTicks = (props) => {
  const { x, y, payload } = props;
  const tickValue = new Date(payload.value);
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={60} y={0} dy={16} textAnchor="end" fill="#666">
        {tickValue.toDateString()}
      </text>
    </g>
  );
};

CustomTicks.defaultProps = {
  x: 0,
  y: 0,
  payload: { value: '0001-01-01T00:00:00.000Z' },
};

CustomTicks.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  payload: PropTypes.shape({
    value: PropTypes.string,
  }),
};

export default CustomTicks;
