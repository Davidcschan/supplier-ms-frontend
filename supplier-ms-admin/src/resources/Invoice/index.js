import React from "react";
import {
  Edit,
  SimpleForm,
  List,
  Datagrid,
  EditButton,
  DeleteButton,
  TextField,
  NumberField,
  DateField,
  TextInput,
  ReferenceField,
  required,
  DateInput,
  SelectInput,
  FormDataConsumer,
  FunctionField,
  useGetOne,
} from "react-admin";
import InvoiceCreate from "./Create";
import { InvoiceShow } from "./Show";
import { useDispatch } from "react-redux";
import { setBreadcrumbs } from "../../redux/breadcrumbs";

const redirect = () => "/Invoice";

export { InvoiceCreate, InvoiceShow };
const breadcrumbBase = { url: "/Invoice", label: "Invoice" };

export const InvoiceEdit = (props) => {
  const dispatch = useDispatch();
  return (
    <Edit {...props}>
      <SimpleForm redirect={redirect}>
        <TextInput source="code" validate={required()} label="Invoice No." />
        <DateInput source="shipmentDate" />
        <FormDataConsumer>
          {({ formData }) => {
            dispatch(
              setBreadcrumbs([
                breadcrumbBase,
                {
                  url: `/Invoice/${formData.id}`,
                  label: `Edit: ${formData.code}`,
                },
              ])
            );
            return null;
          }}
        </FormDataConsumer>
      </SimpleForm>
    </Edit>
  );
};

const StatusButton = ({ record, props, permissions }) => {
  const { data, loaded } = useGetOne("SalesOrder", record.salesOrder.id);
  let isPaid = true;
  if (data) {
    isPaid = data.state === "PAID";
  }
  return !isPaid ? (
    <div>
      <EditButton basePath={props.basePath} record={record} />
      <DeleteButton
        basePath={props.basePath}
        record={record}
        resource={props.resource}
      />
    </div>
  ) : null;
};

export const InvoiceList = (props) => {
  const dispatch = useDispatch();
  dispatch(setBreadcrumbs([breadcrumbBase]));
  return (
    <List
      {...props}
      exporter={false}
      filterDefaultValues={{ state_not: "DELETED" }}
      sort={{ field: "createdAt", order: "DESC" }}
    >
      <Datagrid rowClick="show">
        <TextField source="code" label="Invoice No." />
        <DateField source="shipmentDate" />
        <NumberField
          source="totalPrice"
          options={{ style: "currency", currency: "HKD" }}
        />
        <DateField source="createdAt" />
        <DateField source="updatedAt" />
        <FunctionField
          render={(record) => (
            <StatusButton
              record={record}
              props={props}
              // permissions={permissions}
            />
          )}
        />
      </Datagrid>
    </List>
  );
};
