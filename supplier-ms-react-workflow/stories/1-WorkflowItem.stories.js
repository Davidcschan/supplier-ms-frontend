import React from 'react';
import { storiesOf } from '@storybook/react';
import { NavLink } from 'react-router-dom';
import StoryRouter from 'storybook-react-router';
import { action } from '@storybook/addon-actions';
import Workflow, { WorkflowItem } from '../src/lib';

const supplierId = '5d95537ab8347400081d1b18';

storiesOf('1-WorkflowItem', module)
  .addDecorator(StoryRouter())
  .add('normal', () => {
    return (
      <React.Fragment>
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
      </React.Fragment>
    );
  })
  .add('iconOnly', () => {
    return (
      <WorkflowItem.Customer iconOnly />
    );
  })
  .add('disabled', () => {
    return (
      <WorkflowItem.Customer component={NavLink} to={'/test'} disabled />
    );
  })
  .add('vertical', () => {
    return (
      <WorkflowItem.Customer component={NavLink} to={'/test'} vertical />
    );
  })
  .add('active', () => {
    return (
      <WorkflowItem.Customer component={NavLink} to={'/test'} active />
    );
  })
  .add('active & vertical', () => {
    return (
      <WorkflowItem.Customer component={NavLink} to={'/test'} active vertical />
    );
  })
  .add('active & vertical & iconOnly', () => {
    return (
      <WorkflowItem.Customer component={NavLink} to={'/test'} active vertical iconOnly />
    );
  })
  .add('onClick event', () => {
    return (
      <WorkflowItem.Customer onClick={action('on-click')} />
    );
  });
