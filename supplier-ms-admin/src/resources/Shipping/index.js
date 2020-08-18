import React from "react";
import {
  List,
  Datagrid,
  EditButton,
  DeleteButton,
  TextField,
  DateField,
  Edit,
  SimpleForm,
  TextInput,
  required,
  DateInput,
  SelectInput,
  FormDataConsumer,
} from "react-admin";
import ShippingCreate from "./Create";
import { ShippingShow } from "./Show";
import { useDispatch } from "react-redux";
import { setBreadcrumbs } from "../../redux/breadcrumbs";

// const redirect = () => '/Shipping';

export { ShippingCreate, ShippingShow };

export const ShippingEdit = (props) => {
  const dispatch = useDispatch();
  console.log("Edit props", props);
  return (
    <Edit {...props}>
      <SimpleForm variant="standard">
        <TextInput source="code" validate={required()} label="Shipping No." />
        <DateInput source="expectedDeliveryAt" />
        <SelectInput
          source="state"
          choices={[
            { id: "DRAFT", name: "DRAFT" },
            { id: "APPROVED", name: "APPROVED" },
            { id: "CONFIRMED", name: "CONFIRMED" },
          ]}
        />
        <FormDataConsumer>
          {({ formData }) => {
            dispatch(
              setBreadcrumbs([
                { url: "/Shipping", label: "Shipping" },
                {
                  url: `/Shipping/${formData.id}`,
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

export const ShippingList = (props) => {
  const dispatch = useDispatch();
  dispatch(setBreadcrumbs([{ url: "/Shipping", label: "Shipping" }]));
  return (
    <List
      {...props}
      filterDefaultValues={{ state_not: "DELETE" }}
      sort={{ field: "createdAt", order: "DESC" }}
      exporter={false}
    >
      <Datagrid rowClick="show">
        <TextField source="code" label="Shipping No." />
        <DateField source="deliveryAt" />
        <DateField source="createdAt" />
        <DateField source="updatedAt" />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};
