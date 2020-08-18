import graphql from 'babel-plugin-relay/macro';
// import { graphql } from 'relay-hooks';

export default graphql`
  fragment inventoryHeatMapFragment on Supplier {
    products(orderBy: brand_DESC) {
      id
      name
      brand
      sku
      image
      warehouse {
        code
        name
      }
      price {
        amount
        currency
      }
      costPrice {
        amount
        currency
      }
      joinPrice {
        amount
        currency
      }
      unit
      quantity
      inComing
      shipOut
      threshold
      maxQuantity
    }
  }
`;
