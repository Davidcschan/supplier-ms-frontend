/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type inventoryHeatMapFragment$ref: FragmentReference;
declare export opaque type inventoryHeatMapFragment$fragmentType: inventoryHeatMapFragment$ref;
export type inventoryHeatMapFragment = {|
  +products: ?$ReadOnlyArray<{|
    +id: string,
    +name: string,
    +brand: string,
    +sku: string,
    +image: ?string,
    +warehouse: {|
      +code: string,
      +name: string,
    |},
    +price: ?{|
      +amount: number,
      +currency: string,
    |},
    +costPrice: ?{|
      +amount: number,
      +currency: string,
    |},
    +joinPrice: ?{|
      +amount: number,
      +currency: string,
    |},
    +unit: string,
    +quantity: number,
    +inComing: number,
    +shipOut: number,
    +threshold: number,
    +maxQuantity: ?number,
  |}>,
  +$refType: inventoryHeatMapFragment$ref,
|};
export type inventoryHeatMapFragment$data = inventoryHeatMapFragment;
export type inventoryHeatMapFragment$key = {
  +$data?: inventoryHeatMapFragment$data,
  +$fragmentRefs: inventoryHeatMapFragment$ref,
};
*/


const node/*: ReaderFragment*/ = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v1 = [
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
  "kind": "Fragment",
  "name": "inventoryHeatMapFragment",
  "type": "Supplier",
  "metadata": null,
  "argumentDefinitions": [],
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
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "id",
          "args": null,
          "storageKey": null
        },
        (v0/*: any*/),
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
            (v0/*: any*/)
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
          "selections": (v1/*: any*/)
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "costPrice",
          "storageKey": null,
          "args": null,
          "concreteType": "Price",
          "plural": false,
          "selections": (v1/*: any*/)
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "joinPrice",
          "storageKey": null,
          "args": null,
          "concreteType": "Price",
          "plural": false,
          "selections": (v1/*: any*/)
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
    }
  ]
};
})();
// prettier-ignore
(node/*: any*/).hash = '6c0592ac5d00f46e0c56df4516762cf3';
module.exports = node;
