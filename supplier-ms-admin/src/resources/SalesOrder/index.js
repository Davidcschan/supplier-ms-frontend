import React from "react";
import {
  List,
  Datagrid,
  DeleteButton,
  EditButton,
  FunctionField,
  TextField,
  DateField,
  NumberField,
  ReferenceField,
} from "react-admin";
import SalesOrderCreate from "./Create";
import { SalesOrderShow } from "./Show";
import { SalesOrderEdit } from "./Edit";
import BilingualField from "../../components/BilingualField";
import { useDispatch } from "react-redux";
import { setBreadcrumbs } from "../../redux/breadcrumbs";
import PropTypes from "prop-types";

export { SalesOrderCreate, SalesOrderShow, SalesOrderEdit };

const StatusEditButton = ({ record, props, permissions }) =>
  record.state !== "PAID" ? (
    <EditButton basePath={props.basePath} record={record} />
  ) : null;
const StatusDeleteButton = ({ record, props, permissions }) =>
  record.state !== "PAID" ? (
    <DeleteButton
      basePath={props.basePath}
      record={record}
      resource={props.resource}
    />
  ) : null;
// const StatusEditButton = ({ record, props, permissions }) => (record.state !== "PAID" || permissions === "admin" ? <EditButton basePath={props.basePath} record={record} /> : null);
// const StatusDeleteButton = ({ record, props, permissions }) => (record.state !== "PAID" || permissions === "admin" ? <DeleteButton basePath={props.basePath} record={record} resource={props.resource} /> : null);
export const SalesOrderList = ({ permissions, ...props }) => {
  console.log(props);
  const dispatch = useDispatch();
  dispatch(setBreadcrumbs([{ url: "/SalesOrder", label: "Sales Order" }]));
  var state;
  return (
    <List
      {...props}
      exporter={false}
      filterDefaultValues={{ state_not: "DELETED" }}
      sort={{ field: "createdAt", order: "DESC" }}
    >
      <Datagrid rowClick="show">
        <TextField source="code" label="Sales Order No." />
        <ReferenceField
          label="Customer"
          source="shop.id"
          reference="CustomerShop"
        >
          <ReferenceField
            label="Customer"
            source="customer.id"
            reference="Customer"
            link={(shop, referece) => `/Customer/${shop.customer.id}/show`}
          >
            <BilingualField source="name" />
          </ReferenceField>
        </ReferenceField>
        <ReferenceField
          label="Shop"
          source="shop.id"
          reference="CustomerShop"
          link="show"
        >
          <BilingualField source="name" />
        </ReferenceField>
        <NumberField
          label="Grand total price"
          source="grandTotal"
          options={{ style: "currency", currency: "HKD" }}
        />
        <TextField source="state" />
        <DateField source="createdAt" />
        <DateField source="updatedAt" />
        <FunctionField
          render={(record) => (
            <StatusEditButton
              record={record}
              props={props}
              permissions={permissions}
            />
          )}
        />
        <FunctionField
          render={(record) => (
            <StatusDeleteButton
              record={record}
              props={props}
              permissions={permissions}
            />
          )}
        />
      </Datagrid>
    </List>
  );
};
