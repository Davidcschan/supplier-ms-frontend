import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import { getColorForPercentage } from '../../../helpers/heatColor';

const Button = styled('button')(({ theme }) => {
  return {
    margin: 1,
    boxSizing: 'border-box',
    borderRadius: 0,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'transparent',
    color: theme.palette.text.primary,
    '&:hover': {
      borderColor: theme.palette.primary.main,
    }
  };
});

function Square(props) {
  const { tooltips, percentage, onClick, size, text } = props;
  const buttonStyle = {
    minWidth: size,
    lineHeight: `${size - 5}px`,
    backgroundColor: getColorForPercentage(percentage),
  }

  return (
    <Tooltip title={tooltips} placement="top-end">
      <Button style={buttonStyle} onClick={onClick}>{text}</Button>
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
