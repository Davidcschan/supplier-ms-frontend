import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Square from './Square';

const useStyles = makeStyles(theme => ({
  container: {}
}));

const threshold = [0, 0.2, 0.4, 0.6, 0.8, 1];
const midPoints = [...threshold].slice(1).map((t, i) => (t + threshold[i]) / 2);

function HeatMap(props) {
  const classes = useStyles();
  const { data } = props;

  const counts = data.reduce((results, { percentage }) => {
    for (let i = 1; i < threshold.length; i++) {
      if (percentage < threshold[i]) {
        results[i - 1]++;
        return results;
      }
    }
    return results;
  }, [0, 0, 0, 0, 0]);

  const squares = midPoints.map((p, i) => (
    <Square key={`square-${p}`} tooltips={''} text={counts[i]} percentage={p} size={36} />
  ))

  return (
    <div className={classes.container}>
      {squares}
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
