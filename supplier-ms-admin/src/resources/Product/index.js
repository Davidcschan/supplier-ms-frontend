import React from "react";
import {
  Create,
  Edit,
  SimpleForm,
  List,
  Datagrid,
  EditButton,
  DeleteButton,
  TextField,
  ImageField,
  SingleFieldList,
  ChipField,
  TextInput,
  NumberInput,
  ImageInput,
  DateInput,
  ReferenceArrayField,
  ReferenceArrayInput,
  SelectArrayInput,
  required,
  SelectInput,
  FormDataConsumer,
} from "react-admin";
import BilingualField from "../../components/BilingualField";
import { ProductShow } from "./Show";
import { useDispatch } from "react-redux";
import { setBreadcrumbs } from "../../redux/breadcrumbs";

const redirect = () => "/Product";

export { ProductShow };

const breadcrumbBase = { url: "/Product", label: "Product" };

export const ProductCreate = (props) => {
  const dispatch = useDispatch();
  dispatch(
    setBreadcrumbs([
      breadcrumbBase,
      { url: "/Product/create", label: "Create New" },
    ])
  );
  return (
    <Create {...props}>
      <SimpleForm variant="standard" redirect={redirect}>
        <TextInput source="code" validate={required()} label="Product No." />
        <TextInput source="brandEn" validate={required()} fullWidth />
        <TextInput source="brandChi" validate={required()} fullWidth />
        <TextInput source="nameEn" validate={required()} fullWidth />
        <TextInput source="nameChi" validate={required()} fullWidth />
        <NumberInput source="package" validate={required()} />
        <TextInput source="discount" />
        <TextInput source="weight" validate={required()} />
        <TextInput source="shortDescription" />
        <TextInput source="longDescription" />
        <ImageInput source="images" accept="image/*" multiple>
          <ImageField source="src" title="title" />
        </ImageInput>
        <TextInput source="sku" />
        <TextInput source="upc" validate={required()} />
        <NumberInput source="cost" validate={required()} />
        <NumberInput source="wholeSalePrice1" validate={required()} />
        <NumberInput source="wholeSalePrice2" validate={required()} />
        <NumberInput source="wholeSalePrice3" validate={required()} />
        <NumberInput source="wholeSalePrice4" validate={required()} />
        <NumberInput source="wholeSalePrice5" validate={required()} />
        <NumberInput source="retailPrice1" validate={required()} />
        <NumberInput source="retailPrice2" validate={required()} />
        <NumberInput source="retailPrice3" validate={required()} />
        <NumberInput source="retailPrice4" validate={required()} />
        <NumberInput source="retailPrice5" validate={required()} />
        <NumberInput source="minOrderQuantity" defaultValue={10} />
        <NumberInput source="minStockLevel" defaultValue={0} />
        <DateInput source="onlineDate" />
        <DateInput source="offlineDate" />
        {/* <ReferenceArrayInput
          label="Category"
          source="categoriesIds"
          reference="ProductCategory"
        >
          <SelectArrayInput optionText="nameEn" />
        </ReferenceArrayInput> */}
      </SimpleForm>
    </Create>
  );
};

export const ProductEdit = (props) => {
  const dispatch = useDispatch();
  return (
    <Edit {...props}>
      <SimpleForm variant="standard" redirect={redirect}>
        <TextInput source="code" validate={required()} label="Product No." />
        <TextInput source="brandEn" validate={required()} fullWidth />
        <TextInput source="brandChi" validate={required()} fullWidth />
        <TextInput source="nameEn" validate={required()} fullWidth />
        <TextInput source="nameChi" validate={required()} fullWidth />
        <NumberInput source="package" validate={required()} />
        <TextInput source="discount" />
        <TextInput source="weight" validate={required()} />
        <TextInput source="shortDescription" />
        <TextInput source="longDescription" />
        <ImageInput source="images" accept="image/*" multiple>
          <ImageField source="src" title="title" />
        </ImageInput>
        <TextInput source="sku" />
        <TextInput source="upc" />
        <NumberInput source="cost" validate={required()} />
        <NumberInput source="wholeSalePrice1" validate={required()} />
        <NumberInput source="wholeSalePrice2" validate={required()} />
        <NumberInput source="wholeSalePrice3" validate={required()} />
        <NumberInput source="wholeSalePrice4" validate={required()} />
        <NumberInput source="wholeSalePrice5" validate={required()} />
        <NumberInput source="minOrderQuantity" />
        <NumberInput source="minStockLevel" />
        <DateInput source="onlineDate" />
        <DateInput source="offlineDate" />
        <ReferenceArrayInput
          label="Category"
          source="categoriesIds"
          reference="ProductCategory"
        >
          <SelectArrayInput optionText="nameEn" />
        </ReferenceArrayInput>
        <FormDataConsumer>
          {({ formData }) => {
            dispatch(
              setBreadcrumbs([
                breadcrumbBase,
                {
                  url: `/Product/${formData.id}`,
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

export const ProductList = (props) => {
  const dispatch = useDispatch();
  dispatch(setBreadcrumbs([breadcrumbBase]));
  return (
    <List {...props} exporter={false}>
      <Datagrid rowClick="show">
        <TextField source="code" label="Product No." />
        <BilingualField source="name" />
        <ReferenceArrayField
          label="Categories"
          reference="ProductCategory"
          source="categoriesIds"
        >
          <SingleFieldList>
            <ChipField source="nameChi" />
          </SingleFieldList>
        </ReferenceArrayField>
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};
