import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Square } from '../src/lib';

storiesOf('4-Square', module)
  .add('all together', () => (
    <div>
      <Square tooltips={'testing'} onClick={action('login-button-click')} percentage={0} />
      <Square tooltips={'testing'} onClick={action('login-button-click')} percentage={0.1} />
      <Square tooltips={'testing'} onClick={action('login-button-click')} percentage={0.2} />
      <Square tooltips={'testing'} onClick={action('login-button-click')} percentage={0.3} />
      <Square tooltips={'testing'} onClick={action('login-button-click')} percentage={0.4} />
      <Square tooltips={'testing'} onClick={action('login-button-click')} percentage={0.5} />
      <Square tooltips={'testing'} onClick={action('login-button-click')} percentage={0.6} />
      <Square tooltips={'testing'} onClick={action('login-button-click')} percentage={0.7} />
      <Square tooltips={'testing'} onClick={action('login-button-click')} percentage={0.8} />
      <Square tooltips={'testing'} onClick={action('login-button-click')} percentage={0.9} />
      <Square tooltips={'testing'} onClick={action('login-button-click')} percentage={1} />
    </div>
  ))
  .add('all together w/ text', () => (
    <div>
      <Square tooltips={'testing'} text='0' onClick={action('login-button-click')} percentage={0} size={36} />
      <Square tooltips={'testing'} text='10' onClick={action('login-button-click')} percentage={0.1} size={36} />
      <Square tooltips={'testing'} text='20' onClick={action('login-button-click')} percentage={0.2} size={36} />
      <Square tooltips={'testing'} text='30' onClick={action('login-button-click')} percentage={0.3} size={36} />
      <Square tooltips={'testing'} text='40' onClick={action('login-button-click')} percentage={0.4} size={36} />
      <Square tooltips={'testing'} text='50' onClick={action('login-button-click')} percentage={0.5} size={36} />
      <Square tooltips={'testing'} text='60' onClick={action('login-button-click')} percentage={0.6} size={36} />
      <Square tooltips={'testing'} text='70' onClick={action('login-button-click')} percentage={0.7} size={36} />
      <Square tooltips={'testing'} text='80' onClick={action('login-button-click')} percentage={0.8} size={36} />
      <Square tooltips={'testing'} text='90' onClick={action('login-button-click')} percentage={0.9} size={36} />
      <Square tooltips={'testing'} text='100' onClick={action('login-button-click')} percentage={1} size={36} />
    </div>
  ))
  .add('0%', () => (
    <Square tooltips={'testing'} onClick={action('login-button-click')} percentage={0} />
  ))
  .add('10%', () => (
    <Square tooltips={'testing'} onClick={action('login-button-click')} percentage={0.1} />
  ))
  .add('20%', () => (
    <Square tooltips={'testing'} onClick={action('login-button-click')} percentage={0.2} />
  ))
  .add('30%', () => (
    <Square tooltips={'testing'} onClick={action('login-button-click')} percentage={0.3} />
  ))
  .add('40%', () => (
    <Square tooltips={'testing'} onClick={action('login-button-click')} percentage={0.4} />
  ))
  .add('50%', () => (
    <Square tooltips={'testing'} onClick={action('login-button-click')} percentage={0.5} />
  ))
  .add('60%', () => (
    <Square tooltips={'testing'} onClick={action('login-button-click')} percentage={0.6} />
  ))
  .add('70%', () => (
    <Square tooltips={'testing'} onClick={action('login-button-click')} percentage={0.7} />
  ))
  .add('80%', () => (
    <Square tooltips={'testing'} onClick={action('login-button-click')} percentage={0.8} />
  ))
  .add('90%', () => (
    <Square tooltips={'testing'} onClick={action('login-button-click')} percentage={0.9} />
  ))
  .add('100%', () => (
    <Square tooltips={'testing'} onClick={action('login-button-click')} percentage={1} />
  ));
