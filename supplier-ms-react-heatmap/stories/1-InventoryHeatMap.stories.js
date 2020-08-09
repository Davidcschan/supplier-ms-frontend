import React from 'react';
import { storiesOf } from '@storybook/react';
import InventoryHeatMap from '../src/lib';

const supplierId = '5d95537ab8347400081d1b18';

storiesOf('1-InventoryHeatMap', module)
  .add('normal', () => {
    return (
      <InventoryHeatMap supplierId={supplierId} />
    );
  })
  .add('id not found', () => {
    return (
      <InventoryHeatMap supplierId={'5d95537ab8347400081d1b10'} />
    );
  })
  .add('invalid id', () => {
    return (
      <InventoryHeatMap supplierId={''} />
    );
  });
