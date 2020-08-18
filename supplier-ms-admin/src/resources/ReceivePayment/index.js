import React from "react";
import {
  Edit,
  SimpleForm,
  List,
  Datagrid,
  Show,
  Create,
  ReferenceInput,
  DeleteButton,
  TextField,
  DateField,
  SelectInput,
  DateTimeInput,
  required,
  ReferenceField,
  DateInput,
  SimpleShowLayout,
  TextInput,
  FormDataConsumer,
  ShowController,
  ShowView,
} from "react-admin";
import { useDispatch } from "react-redux";
import { setBreadcrumbs } from "../../redux/breadcrumbs";

const redirect = () => "/ReceivePayment";
const breadcrumbBase = { url: "/ReceivePayment", label: "Receive Payment" };

export const ReceivePaymentCreate = (props) => {
  const dispatch = useDispatch();
  dispatch(
    setBreadcrumbs([
      breadcrumbBase,
      { url: "/ReceivePayment/create", label: "Create New" },
    ])
  );
  return (
    <Create {...props}>
      <SimpleForm redirect={redirect}>
        <ReferenceInput
          label="Invoice"
          source="invoiceId"
          reference="Invoice"
          filter={{ state: "DELIVERED" }}
          sort={{ field: "createdAt", order: "DESC" }}
        >
          <SelectInput optionText="code" label="Receive Payment No." />
        </ReferenceInput>
        <SelectInput
          source="paymentMethod"
          validate={required()}
          choices={[
            { id: "COD", name: "Cash on Delivery" },
            { id: "CREDIT", name: "Credit" },
            { id: "DEBIT", name: "Debit" },
          ]}
        />
        <DateInput source="paidAt" validate={required()} />
      </SimpleForm>
    </Create>
  );
};

export const ReceivePaymentEdit = (props) => {
  const dispatch = useDispatch();
  return (
    <Edit {...props}>
      <SimpleForm redirect={redirect}>
        <ReferenceInput label="Invoice" source="invoiceId" reference="Invoice">
          <SelectInput optionText="code" label="Receive Payment No." />
        </ReferenceInput>
        <SelectInput
          source="paymentMethod"
          validate={required()}
          choices={[
            { id: "COD", name: "Cash on Delivery" },
            { id: "Credit", name: "Credit" },
            { id: "Debit", name: "Debit" },
          ]}
        />
        <DateTimeInput source="paidAt" validate={required()} />
        <FormDataConsumer>
          {({ formData }) => {
            dispatch(
              setBreadcrumbs([
                breadcrumbBase,
                { url: `/ReceivePayment/${formData.id}`, label: "Edit" },
              ])
            );
            return null;
          }}
        </FormDataConsumer>
      </SimpleForm>
    </Edit>
  );
};

export const ReceivePaymentShow = (props) => {
  const dispatch = useDispatch();
  return (
    <ShowController {...props}>
      {(controllerProps) => {
        const label = "Details";
        const id = controllerProps.record ? controllerProps.record.id : "";
        dispatch(
          setBreadcrumbs([
            breadcrumbBase,
            { url: `/CustomerGroup/${id}/show`, label: `Details: ${label}` },
          ])
        );
        return (
          <ShowView {...props} {...controllerProps}>
            <SimpleShowLayout>
              <ReferenceField
                label="Invoice"
                reference="Invoice"
                source="invoice.id"
              >
                <TextField source="code" label="Receive Payment No." />
              </ReferenceField>
              <DateField source="paidAt" />
              <TextField source="paymentMethod" />
              <DateField source="createdAt" />
              <DateField source="updatedAt" />
            </SimpleShowLayout>
          </ShowView>
        );
      }}
    </ShowController>
  );
};

export const ReceivePaymentList = (props) => {
  const dispatch = useDispatch();
  dispatch(setBreadcrumbs([breadcrumbBase]));
  return (
    <List
      {...props}
      sort={{ field: "createdAt", order: "DESC" }}
      exporter={false}
    >
      <Datagrid rowClick="show">
        <ReferenceField label="Invoice" reference="Invoice" source="invoice.id">
          <TextField source="code" label="Receive Payment No." />
        </ReferenceField>
        <DateField source="paidAt" />
        <TextField source="paymentMethod" />
        <DateField source="createdAt" />
        <DateField source="updatedAt" />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};
