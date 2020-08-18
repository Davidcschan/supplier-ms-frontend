import React from 'react';
import snakeCase from 'lodash/snakeCase';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import WorkflowIcons from './WorkflowIcons';
import Folder from '@material-ui/icons/Folder';
import { FLOW, WORKFLOW } from './constants';
import ColorStepIcon from './ColorStepIcon';

const useStyles = makeStyles(theme => ({
  padLeft: {
    marginLeft: 10,
  },
  adjustHeight: {
    height: 32,
  },
}));

function WorkflowItem({ vertical, iconOnly, active, disabled, type, label, onClick, ...rest }) {
  const classes = useStyles();
  const Icon = WorkflowIcons[type] || Folder;
  const StepIcon = () => <Icon />;
  const text = label || WORKFLOW[snakeCase(type).toUpperCase()];

  return (
    <Step onClick={onClick} active={active} disabled={disabled} className={vertical && classes.padLeft} {...rest}>
      <StepLabel StepIconComponent={ColorStepIcon} StepIconProps={{ label: text, iconOnly }} className={vertical && classes.adjustHeight}>{!iconOnly && text}</StepLabel>
    </Step>
  );
};

WorkflowItem.propTypes = {
  vertical: PropTypes.bool,
  iconOnly: PropTypes.bool,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  component: PropTypes.elementType,
  onClick: PropTypes.func,
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
};

WorkflowItem.Supplier = props => <WorkflowItem type={'Supplier'} {...props} />;
WorkflowItem.PurchaseOrder = props => <WorkflowItem type={'PurchaseOrder'} {...props} />;
WorkflowItem.Shipping = props => <WorkflowItem type={'Shipping'} {...props} />;
WorkflowItem.Inventory = props => <WorkflowItem type={'Inventory'} {...props} />;
WorkflowItem.SalesOrder = props => <WorkflowItem type={'SalesOrder'} {...props} />;
WorkflowItem.Invoice = props => <WorkflowItem type={'Invoice'} {...props} />;
WorkflowItem.DeliveryNote = props => <WorkflowItem type={'DeliveryNote'} {...props} />;
WorkflowItem.Customer = props => <WorkflowItem type={'Customer'} {...props} />;
WorkflowItem.ReceivePayment = props => <WorkflowItem type={'ReceivePayment'} {...props} />;
WorkflowItem.Report = props => <WorkflowItem type={'Report'} {...props} />;

export default WorkflowItem;
