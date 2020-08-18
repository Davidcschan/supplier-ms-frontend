import React from 'react';
import PropTypes from 'prop-types';

import Square from './Square';

const HeatMap = (props) => {
  const { data } = props;

  const squares = (items) => items.map(
    data => <Square key={data.tooltips} tooltips={data.tooltips} percentage={data.percentage} size={24} />
  );

  return (
    <div>
      {squares(data)}
    </div>
  );
}

HeatMap.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      tooltips: PropTypes.string.isRequired,
      percentage: PropTypes.number.isRequired,
    })
  ).isRequired,
}

export default HeatMap;
