/**
 * @class ExampleMaterialUIComponent
 */

import React from 'react';
import { RelayEnvironmentProvider, useQuery } from 'relay-hooks';

import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import supplierProductsQuery from './queries/supplierProductsQuery';
import RelayHeatMap from './RelayHeatMap';
import environment from '../../../config/environment';

function HeatMapLoader(appProps) {
  const { supplierId: id } = appProps;
  const { props, error } = useQuery({
    query: supplierProductsQuery,
    variables: { where: { id } },
  });
  if (props && props.supplier) {
    return <RelayHeatMap supplier={props.supplier} />;
  } else if (error) {
    return <div>{error.message}</div>;
  }
  return <CircularProgress disableShrink />;
}

HeatMapLoader.propTypes = {
  supplierId: PropTypes.string.isRequired,
};

function InventoryHeatMap(props) {
  return (
    <RelayEnvironmentProvider environment={environment}>
      <HeatMapLoader {...props} />
    </RelayEnvironmentProvider>
  )
}

export default InventoryHeatMap;
