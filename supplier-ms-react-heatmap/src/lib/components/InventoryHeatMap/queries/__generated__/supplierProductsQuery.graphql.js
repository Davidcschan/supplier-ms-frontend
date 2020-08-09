/**
 * @flow
 * @relayHash 82c2b4ea2437b3b4fae78c531e216910
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type inventoryHeatMapFragment$ref = any;
export type SupplierWhereUniqueInput = {|
  id?: ?string
|};
export type supplierProductsQueryVariables = {|
  where: SupplierWhereUniqueInput
|};
export type supplierProductsQueryResponse = {|
  +supplier: ?{|
    +$fragmentRefs: inventoryHeatMapFragment$ref
  |}
|};
export type supplierProductsQuery = {|
  variables: supplierProductsQueryVariables,
  response: supplierProductsQueryResponse,
|};
*/


/*
query supplierProductsQuery(
  $where: SupplierWhereUniqueInput!
) {
  supplier(where: $where) {
    ...inventoryHeatMapFragment
    id
  }
}

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
      id
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
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "where",
    "type": "SupplierWhereUniqueInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "where",
    "variableName": "where"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v4 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "amount",
    "args": null,
    "storageKey": null
  },
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "currency",
    "args": null,
    "storageKey": null
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "supplierProductsQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "supplier",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Supplier",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "inventoryHeatMapFragment",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "supplierProductsQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "supplier",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Supplier",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "products",
            "storageKey": "products(orderBy:\"brand_DESC\")",
            "args": [
              {
                "kind": "Literal",
                "name": "orderBy",
                "value": "brand_DESC"
              }
            ],
            "concreteType": "Product",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "brand",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "sku",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "image",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "warehouse",
                "storageKey": null,
                "args": null,
                "concreteType": "Warehouse",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "code",
                    "args": null,
                    "storageKey": null
                  },
                  (v3/*: any*/),
                  (v2/*: any*/)
                ]
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "price",
                "storageKey": null,
                "args": null,
                "concreteType": "Price",
                "plural": false,
                "selections": (v4/*: any*/)
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "costPrice",
                "storageKey": null,
                "args": null,
                "concreteType": "Price",
                "plural": false,
                "selections": (v4/*: any*/)
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "joinPrice",
                "storageKey": null,
                "args": null,
                "concreteType": "Price",
                "plural": false,
                "selections": (v4/*: any*/)
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "unit",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "quantity",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "inComing",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "shipOut",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "threshold",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "maxQuantity",
                "args": null,
                "storageKey": null
              }
            ]
          },
          (v2/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "supplierProductsQuery",
    "id": null,
    "text": "query supplierProductsQuery(\n  $where: SupplierWhereUniqueInput!\n) {\n  supplier(where: $where) {\n    ...inventoryHeatMapFragment\n    id\n  }\n}\n\nfragment inventoryHeatMapFragment on Supplier {\n  products(orderBy: brand_DESC) {\n    id\n    name\n    brand\n    sku\n    image\n    warehouse {\n      code\n      name\n      id\n    }\n    price {\n      amount\n      currency\n    }\n    costPrice {\n      amount\n      currency\n    }\n    joinPrice {\n      amount\n      currency\n    }\n    unit\n    quantity\n    inComing\n    shipOut\n    threshold\n    maxQuantity\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'e60580e701d49afe4fc6aa23ee8231ab';
module.exports = node;
