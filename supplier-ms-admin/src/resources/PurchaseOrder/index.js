import React from "react";
import {
  List,
  Datagrid,
  DeleteButton,
  TextField,
  DateField,
  NumberField,
  useTranslate,
  Edit,
  SimpleForm,
  TextInput,
  required,
  DateInput,
  SelectInput,
  FormDataConsumer,
} from "react-admin";
import PurchaseOrderCreate from "./Create";
import { PurchaseOrderShow } from "./Show";
import { useDispatch } from "react-redux";
import { setBreadcrumbs } from "../../redux/breadcrumbs";

const redirect = () => "/PurchaseOrder";

export { PurchaseOrderCreate, PurchaseOrderShow };

export const PurchaseOrderEdit = (props) => {
  const dispatch = useDispatch();
  const translate = useTranslate();
  return (
    <Edit {...props}>
      <SimpleForm variant="standard">
        <TextInput
          source="code"
          validate={required()}
          label="Purchase Order No."
        />
        <DateInput source="expectedDeliveryAt" />
        <SelectInput
          source="state"
          label="Status"
          choices={[
            { id: "DRAFT", name: translate("common.draft") },
            { id: "PENDING", name: translate("common.pending") },
            { id: "CONFIRMED", name: translate("common.confirmed") },
            // { id: 'APPROVED', name: translate('common.approved') },
            // { id: 'SENT', name: translate('common.sent') },
            // { id: 'ACKED', name: translate('common.acked') },
            // { id: 'SHIPPED', name: translate('common.shipped') },
            // { id: 'ARRIVED', name: translate('common.arrived') },
            // { id: 'RECEIVED', name: translate('common.received') },
            // { id: 'DELETED', name: translate('common.deleted') },
          ]}
        />
        <FormDataConsumer>
          {({ formData }) => {
            dispatch(
              setBreadcrumbs([
                { url: "/PurchaseOrder", label: "Purchase Order" },
                {
                  url: `/PurchaseOrder/${formData.id}`,
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

export const PurchaseOrderList = (props) => {
  const dispatch = useDispatch();
  dispatch(
    setBreadcrumbs([{ url: "/PurchaseOrder", label: "Purchase Order" }])
  );
  return (
    <List
      {...props}
      filterDefaultValues={{ state_not: "DELETED" }}
      sort={{ field: "createdAt", order: "DESC" }}
    >
      <Datagrid rowClick="show">
        <TextField source="code" label="Purchase Order No." />
        <NumberField
          source="totalPrice"
          options={{ style: "currency", currency: "HKD" }}
        />
        <DateField source="expectedDeliveryAt" />
        <TextField source="state" label="Status" />
        <DateField source="createdAt" />
        <DateField source="updatedAt" />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};
