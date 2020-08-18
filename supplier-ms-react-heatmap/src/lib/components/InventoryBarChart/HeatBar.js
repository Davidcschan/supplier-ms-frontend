import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import { percentColors } from '../../../helpers/heatColor';
// import Button from '@material-ui/core/Button';

const gradientColor = percentColors.map(({ pct, color }) => `rgb(${[color.r, color.g, color.b].join(',')}) ${pct * 100}%`).join(', ');
const useStyles = makeStyles(theme => ({
  tooltips: {},
  heatBar: {
    position: 'relative',
    width: '100%',
    height: 40,
    background: `linear-gradient(to right, ${gradientColor})`
  },
  inner: {
    position: 'absolute',
    right: 0,
    height: 40,
    backgroundColor: theme.palette.text.primary
  }
}));


function Square(props) {
  const classes = useStyles();
  const { tooltips, percentage, onClick } = props;

  const width = `${99 - (percentage * 100)}%`;

  return (
    <Tooltip className={classes.tooltips} title={tooltips} placement="top-end">
      <div className={classes.heatBar} onClick={onClick}>
        <div className={classes.inner} style={{ width }} />
      </div>
    </Tooltip>
  );
}

Square.propTypes = {
  tooltips: PropTypes.string,
  size: PropTypes.number,
  text: PropTypes.string,
  percentage: PropTypes.number.isRequired,  // [0-1] as percentage
  onClick: PropTypes.func,
};

Square.defaultProps = {
  size: 24,
  text: '\u00A0',
}

export default Square;
