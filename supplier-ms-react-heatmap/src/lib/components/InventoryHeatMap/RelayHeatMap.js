import React from 'react';
import PropTypes from 'prop-types';
import { useFragment } from 'relay-hooks';
import HeatMap from './HeapMap';
import inventoryHeatMapFragment from './fragments/inventoryHeatMapFragment';

const RelayHeatMap = (props) => {
  const supplier = useFragment(inventoryHeatMapFragment, props.supplier);
  const reformatData = () => {
    const { products } = supplier;
    return products.map(product => {
      const { brand, name, quantity, threshold } = product;
      const percentage = quantity / (threshold * 2);
      return {
        tooltips: `${brand} - ${name} (${Math.round(percentage * 100)}%)`,
        percentage,
      };
    });
  };

  return (
    <HeatMap data={reformatData()} />
  );
};

RelayHeatMap.propTypes = {
  supplier: PropTypes.object.isRequired,
};

export default RelayHeatMap;
