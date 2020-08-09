import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import {
  Edit,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
  useTranslate,
  SaveButton,
  Toolbar,
  useUpdate,
  useNotify,
  FormDataConsumer,
} from "react-admin";
import { useFormState } from "react-final-form";
import { useDispatch } from "react-redux";
import { setBreadcrumbs } from "../../redux/breadcrumbs";

const redirect = () => "/SalesOrder";

const MySaveButton = (props) => {
  const { record } = props;
  const [edit] = useUpdate("SalesOrder", record.id);
  const history = useHistory();

  const redirect = () => {
    return history.go(-1);
  };

  const notify = useNotify();

  const formState = useFormState();
  const handleClick = useCallback(() => {
    if (!formState.valid) {
      return;
    }
    const { customer, ...formValues } = formState.values;
    const onSuccess = ({ data: newRecord }) => {
      notify("ra.notification.updated", "info", { smart_count: 1 }, true);
      redirect();
    };

    // if (customer.id === record.customer.id) {
    //   edit(
    //     {
    //       payload: {
    //         data: formState.values,
    //         previousData: record,
    //       },
    //     },
    //     { undoable: true, onSuccess }
    //   );
    // } else {
    //   edit(
    //     {
    //       payload: {
    //         data: { ...formValues, customerId: customer.id },
    //         previousData: record,
    //       },
    //     },
    //     { undoable: true, onSuccess }
    //   );
    // }
    edit(
      {
        payload: {
          data: { ...formValues },
          previousData: record,
        },
      },
      { undoable: true, onSuccess }
    );
  }, [formState.valid, formState.values, record, notify, redirect, edit]);

  return <SaveButton {...props} handleSubmitWithRedirect={handleClick} />;
};

const MyToolbar = (props) => (
  <Toolbar {...props}>
    <MySaveButton label="common.save" submitOnEnter={false} variant="text" />
  </Toolbar>
);

export const SalesOrderEdit = (props) => {
  const dispatch = useDispatch();
  const translate = useTranslate();
  const optionRenderer = (customer) => `${customer.code} ${customer.nameChi}`;
  return (
    <Edit {...props}>
      <SimpleForm toolbar={<MyToolbar />} redirect={redirect}>
        {/* <ReferenceInput label="Customer" source="customer.id" reference="Customer">
          <SelectInput optionText={optionRenderer} />
        </ReferenceInput> */}
        <TextInput
          source="code"
          validate={required()}
          label="Sales Order No."
        />
        <SelectInput
          source="state"
          choices={[
            { id: "RECEIVED", name: translate("common.received") },
            { id: "CONFIRMED", name: translate("common.confirmed") },
            { id: "PACKED", name: translate("common.packed") },
            { id: "SHIPPED", name: translate("common.shipped") },
            { id: "DELIVERED", name: translate("common.delivered") },
            { id: "PAID", name: translate("common.paid") },
            { id: "DELETED", name: translate("common.deleted") },
          ]}
        />
        <FormDataConsumer>
          {({ formData }) => {
            dispatch(
              setBreadcrumbs([
                { url: "/SalesOrder", label: "Sales Order" },
                {
                  url: `/SalesOrder/${formData.id}`,
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
