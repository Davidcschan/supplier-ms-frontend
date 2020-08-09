import React from 'react';
import InventoryHeatMap from '../lib';
import { HeatMap } from '../lib';

const genData = count =>
  [...Array(count).keys()].map(i => {
    const percentage = Math.random();
    return {
      tooltips: `testing-${i}-${Math.round(percentage * 100)}%`,
      percentage,
    };
  });

const supplierId = '5d95537ab8347400081d1b18';

const App = () => (
  <div>
    <HeatMap data={genData(100)} />
    <InventoryHeatMap supplierId={supplierId} />
  </div>
);

export default App;
