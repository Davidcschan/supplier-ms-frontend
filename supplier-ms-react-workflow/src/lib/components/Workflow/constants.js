export const FLOW = [
  'Supplier',
  'PurchaseOrder',
  'Shipping',
  'Inventory',
  'SalesOrder',
  'Invoice',
  'DeliveryNote',
  'Customer',
  'ReceivePayment',
  'Report',
];

export const WORKFLOW = {
  SUPPLIER: 'Supplier',
  PURCHASE_ORDER: 'Purchase Order',
  SHIPPING: 'Shipping',
  INVENTORY: 'Inventory',
  SALES_ORDER: 'Sales Order',
  INVOICE: 'Invoice',
  DELIVERY_NOTE: 'Delivery Note',
  CUSTOMER: 'Customer',
  RECEIVE_PAYMENT: 'Receive Payment',
  REPORT: 'Report',
}

export const steps = {
  full: [
    WORKFLOW.SUPPLIER,
    WORKFLOW.PURCHASE_ORDER,
    WORKFLOW.SHIPPING,
    WORKFLOW.INVENTORY,
    WORKFLOW.SALES_ORDER,
    WORKFLOW.INVOICE,
    WORKFLOW.DELIVERY_NOTE,
    WORKFLOW.CUSTOMER,
    WORKFLOW.RECEIVE_PAYMENT,
    WORKFLOW.REPORT,
  ],
  purchase: [
    WORKFLOW.SUPPLIER,
    WORKFLOW.PURCHASE_ORDER,
    WORKFLOW.SHIPPING,
    WORKFLOW.INVENTORY,
  ],
  sales: [
    WORKFLOW.SALES_ORDER,
    WORKFLOW.INVOICE,
    WORKFLOW.DELIVERY_NOTE,
    WORKFLOW.CUSTOMER,
    WORKFLOW.RECEIVE_PAYMENT,
  ],
  locations: [
    WORKFLOW.SUPPLIER,
    WORKFLOW.INVENTORY,
    WORKFLOW.CUSTOMER,
  ]
};

export const WorkflowType = {
  PURCHASE: 'purchase',
  SALES: 'sales',
  FULL: 'full'
}

export default {
  steps,
  WorkflowType
}
