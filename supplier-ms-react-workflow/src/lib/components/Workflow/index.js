import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import StepConnector from '@material-ui/core/StepConnector';

const Connector = withStyles({
  horizontal: {
    top: 25,
  },
  vertical: {
    padding: 0,
    marginLeft: 25,
    width: 1,
  },
  line: {
    height: 1,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  padLeft: {
    marginLeft: 10,
  },
  adjustHeight: {
    height: 32,
  },
  margin: {
    margin: theme.spacing(2),
  },
  minimize: {
    paddingTop: theme.spacing(2),
    paddingBottom: 0,
  },
}));

function Workflow({ children, vertical, open, ...rest }) {
  const classes = useStyles();
  const childrenWithProps = React.Children.map(
    children,
    child => React.cloneElement(child, { iconOnly: !open }),
  );

  return (
    <div className={classes.root}>
      <Stepper alternativeLabel={!vertical} nonLinear orientation={vertical ? 'vertical' : 'horizontal'} connector={<Connector />} className={open ? classes.minimize : null} {...rest}>
        {childrenWithProps}
      </Stepper>
    </div>
  );
}

Workflow.propTypes = {
  vertical: PropTypes.bool,
  children: PropTypes.node,
  open: PropTypes.bool,
};

Workflow.defaultProps = {
  vertical: false,
  open: true,
};

export default Workflow;
