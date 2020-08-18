import React from "react";
import { useDispatch } from "react-redux";
import {
  Create,
  Edit,
  SimpleForm,
  List,
  Datagrid,
  ShowController,
  ShowView,
  SimpleShowLayout,
  EditButton,
  DeleteButton,
  FunctionField,
  TextField,
  ReferenceField,
  EmailField,
  UrlField,
  DateField,
  SelectField,
  ReferenceInput,
  TextInput,
  SelectInput,
  FormDataConsumer,
  required,
  email,
  CheckboxGroupInput,
  ReferenceArrayField,
  SingleFieldList,
  ChipField,
  usePermissions,
  Loading,
  PasswordInput,
} from "react-admin";
import { setBreadcrumbs } from "../../redux/breadcrumbs";

const redirect = () => "/UserGroup";
const breadcrumbBase = { url: "/UserGroup", label: "UserGroup" };

export const UserGroupCreate = (props) => {
  const dispatch = useDispatch();
  dispatch(
    setBreadcrumbs([
      breadcrumbBase,
      { url: "/UserGroup/create", label: "Create New" },
    ])
  );
  return (
    <Create {...props}>
      <SimpleForm variant="standard" redirect={redirect}>
        <TextInput source="name" />
      </SimpleForm>
    </Create>
  );
};

export const UserGroupEdit = (props) => {
  const dispatch = useDispatch();
  const { loaded, permissions } = usePermissions();
  dispatch(
    setBreadcrumbs([
      breadcrumbBase,
      { url: "/UserGroup/edit", label: "UserGroup Edit" },
    ])
  );

  return (
    <Edit {...props}>
      <SimpleForm variant="standard" redirect={redirect}>
        <TextInput source="name" />
      </SimpleForm>
    </Edit>
  );
};

export const UserGroupShow = (props) => {
  const dispatch = useDispatch();
  const { loaded, permissions } = usePermissions();

  return (
    <ShowController {...props}>
      {(controllerProps) => {
        const id = controllerProps.record ? controllerProps.record.id : "";
        dispatch(
          setBreadcrumbs([
            breadcrumbBase,
            { url: `/UserGroup/${id}/show`, label: `Details` },
          ])
        );
        return (
          <ShowView
            {...props}
            {...controllerProps}
            hasEdit={permissions === "admin" || permissions === "superadmin"}
          >
            <SimpleShowLayout>
              <TextField source="name" />
            </SimpleShowLayout>
          </ShowView>
        );
      }}
    </ShowController>
  );
};

export const UserGroupList = (props) => {
  const dispatch = useDispatch();
  const { loaded, permissions } = usePermissions();
  const group = JSON.parse(localStorage.getItem("group"));
  console.log("group", group.id);
  console.log("permissions", permissions);
  dispatch(setBreadcrumbs([breadcrumbBase]));

  return (
    <List
      {...props}
      exporter={false}
      hasCreate={permissions === "superadmin"}
      sort={{ field: "name", order: "DESC" }}
      filterDefaultValues={
        permissions === "superadmin" ? null : { id: group.id }
      }
    >
      <Datagrid rowClick="show">
        <TextField source="name" />
        {permissions === "admin" || permissions === "superadmin" ? (
          <EditButton />
        ) : null}
        {permissions === "superadmin" ? <DeleteButton /> : null}
      </Datagrid>
    </List>
  );
};
