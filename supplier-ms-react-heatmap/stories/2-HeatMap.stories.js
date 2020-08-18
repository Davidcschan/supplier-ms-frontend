import React from 'react';
import { storiesOf } from '@storybook/react';
import { HeatMap } from '../src/lib';

const genData = (count) => {
  return [...Array(count).keys()].map(i => {
    const percentage = Math.random();
    return ({
      tooltips: `testing-${i}-${Math.round(percentage * 100)}%`,
      percentage,
    })
  })
}

storiesOf('2-HeatMap', module)
  .add('50 squares', () => (
    <HeatMap data={genData(50)} />
  ))
  .add('100 squares', () => (
    <HeatMap data={genData(100)} />
  ))
  .add('200 squares', () => (
    <HeatMap data={genData(200)} />
  ))
  .add('500 squares', () => (
    <HeatMap data={genData(500)} />
  ))
  .add('1000 squares', () => (
    <HeatMap data={genData(1000)} />
  ));
