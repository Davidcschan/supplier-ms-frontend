import React from 'react';
import { storiesOf } from '@storybook/react';
import { Legend } from '../src/lib';

const genData = (count) => {
  return [...Array(count).keys()].map(i => {
    const percentage = Math.random();
    return ({
      tooltips: `testing-${i}-${Math.round(percentage * 100)}%`,
      percentage,
    })
  })
}

storiesOf('3-Legend', module)
  .add('50 squares', () => (
    <Legend data={genData(50)} />
  ))
  .add('100 squares', () => (
    <Legend data={genData(100)} />
  ))
  .add('200 squares', () => (
    <Legend data={genData(200)} />
  ))
  .add('500 squares', () => (
    <Legend data={genData(500)} />
  ))
  .add('1000 squares', () => (
    <Legend data={genData(1000)} />
  ));
