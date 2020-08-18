import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Workflow, { WorkflowItem, WorkflowType } from '../src/lib';
import { NavLink } from 'react-router-dom';

const supplierId = '5d95537ab8347400081d1b18';

storiesOf('1-Workflow', module)
  .add('normal and all', () => {
    return (
      <Workflow>
        <WorkflowItem.Supplier component={NavLink} to={'/test'} />
        <WorkflowItem.PurchaseOrder component={NavLink} to={'/test'} />
        <WorkflowItem.Shipping component={NavLink} to={'/test'} />
        <WorkflowItem.Warehouse component={NavLink} to={'/test'} />
        <WorkflowItem.SalesOrder component={NavLink} to={'/test'} />
        <WorkflowItem.Invoice component={NavLink} to={'/test'} />
        <WorkflowItem.Delivery component={NavLink} to={'/test'} />
        <WorkflowItem.Customer component={NavLink} to={'/test'} />
        <WorkflowItem.ReceivePayment component={NavLink} to={'/test'} />
        <WorkflowItem.Report component={NavLink} to={'/test'} />
      </Workflow>
    );
  })
  .add('iconOnly', () => {
    return (
      <Workflow open={false}>
        <WorkflowItem.Supplier component={NavLink} to={'/test'} />
        <WorkflowItem.PurchaseOrder component={NavLink} to={'/test'} />
        <WorkflowItem.Shipping component={NavLink} to={'/test'} />
        <WorkflowItem.Warehouse component={NavLink} to={'/test'} />
        <WorkflowItem.SalesOrder component={NavLink} to={'/test'} />
        <WorkflowItem.Invoice component={NavLink} to={'/test'} />
        <WorkflowItem.Delivery component={NavLink} to={'/test'} />
        <WorkflowItem.Customer component={NavLink} to={'/test'} />
        <WorkflowItem.ReceivePayment component={NavLink} to={'/test'} />
        <WorkflowItem.Report component={NavLink} to={'/test'} />
      </Workflow>
    );
  })
  .add('normal and some', () => {
    return (
      <Workflow>
        <WorkflowItem.Warehouse component={NavLink} to={'/test'} />
        <WorkflowItem.SalesOrder component={NavLink} to={'/test'} />
        <WorkflowItem.Customer component={NavLink} to={'/test'} />
        <WorkflowItem.ReceivePayment component={NavLink} to={'/test'} />
      </Workflow>
    );
  })
  .add('vertical purchase', () => {
    return (
      <Workflow vertical />
    );
  });
