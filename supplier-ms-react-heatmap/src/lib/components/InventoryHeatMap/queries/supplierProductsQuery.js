import graphql from 'babel-plugin-relay/macro';
// import { graphql } from 'relay-hooks';

export default graphql`
  query supplierProductsQuery( $where: SupplierWhereUniqueInput! ) {
    supplier(where: $where) {
      ...inventoryHeatMapFragment
    }
  }
`;
