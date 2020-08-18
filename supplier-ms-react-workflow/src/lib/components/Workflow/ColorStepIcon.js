import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core';
import { steps, FLOW } from './constants';
import WorkflowIcons from './WorkflowIcons';
import WorkflowColors from './WorkflowColors';

const useColorStepIconStyles = makeStyles(theme => ({
  icon: {
    zIndex: 1,
    color: '#fff',
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6
  },
  bigButton: {
    width: 48,
    height: 48,
  },
  smallButton: {
    width: 32,
    height: 32,
    marginTop: 8,
    marginBottom: 8,
  },
  bigIcon: {
    fontSize: 24
  },
  smallIcon: {
    fontSize: 16
  },
  active: {
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: theme.palette.common.black,
  },
  // purchase: {
  //   backgroundColor: theme.palette.primary.main,
  // },
}));

const colors = FLOW.map(item => WorkflowColors[item]);

function ColorStepIcon({ active, label, onClick }) {
  const classes = useColorStepIconStyles();
  const index = steps.full.indexOf(label);
  const icons = [
    <WorkflowIcons.Supplier className={classes.bigIcon} />,
    <WorkflowIcons.PurchaseOrder className={classes.smallIcon} />,
    <WorkflowIcons.Shipping className={classes.smallIcon} />,
    <WorkflowIcons.Inventory className={classes.bigIcon} />,
    <WorkflowIcons.SalesOrder className={classes.smallIcon} />,
    <WorkflowIcons.Invoice className={classes.smallIcon} />,
    <WorkflowIcons.DeliveryNote className={classes.smallIcon} />,
    <WorkflowIcons.Customer className={classes.bigIcon} />,
    <WorkflowIcons.ReceivePayment className={classes.smallIcon} />,
    <WorkflowIcons.Report className={classes.smallIcon} />
  ];

  return (
    <IconButton
      aria-label={label}
      className={clsx(classes.icon, steps.locations.includes(label) ? classes.bigButton : classes.smallButton, active && classes.active)}
      style={{ backgroundColor: colors[index] }}
      onClick={onClick}
    >
      {icons[index]}
    </IconButton>
  );
}

ColorStepIcon.propTypes = {
  active: PropTypes.bool,
  badge: PropTypes.number,
  icon: PropTypes.node,
  onClick: PropTypes.func,
};

export default ColorStepIcon;
