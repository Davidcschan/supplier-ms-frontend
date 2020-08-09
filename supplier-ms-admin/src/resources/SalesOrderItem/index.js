import React, { useCallback, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  SaveButton,
  Toolbar,
  useCreate,
  useNotify,
  Create,
  SimpleForm,
  AutocompleteInput,
  NumberInput,
  ReferenceInput,
  SelectInput,
  Edit,
  FormDataConsumer,
  ReferenceFieldController,
  TextInput,
  required,
  useTranslate,
} from "react-admin";
import { useFormState } from "react-final-form";
import { useDispatch } from "react-redux";
import { addBreadcrumbs } from "../../redux/breadcrumbs";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import { TextField, Grid } from "@material-ui/core";

const SaveItemButton = (props) => {
  const [create] = useCreate("SalesOrderItem");
  const history = useHistory();

  const redirect = () => {
    return history.go(-1);
  };

  const notify = useNotify();

  const formState = useFormState();
  console.log("formState", formState);
  const handleClick = useCallback(() => {
    if (!formState.valid) {
      return;
    }
    const { product, ...formValues } = formState.values;
    const quantity = parseInt(formValues.quantity, 10);
    const price = parseFloat(formValues.price);

    delete formValues.customer;
    console.log("product: ", product);
    create(
      {
        payload: {
          data: {
            ...formValues,
            productId: product.id,
            discount: product.discount,
            totalPrice: quantity * price,
          },
        },
      },
      {
        onSuccess: ({ data: newRecord }) => {
          notify("ra.notification.created", "info", {
            smart_count: 1,
          });
          redirect();
        },
      }
    );
  }, [formState.valid, formState.values, create, notify, redirect]);

  return <SaveButton {...props} handleSubmitWithRedirect={handleClick} />;
};

const SalesOrderItemCreateToolbar = (props) => (
  <Toolbar {...props}>
    <SaveItemButton label="common.save" submitOnEnter={false} variant="text" />
  </Toolbar>
);

const OptionRenderer = (choice) => (
  <span>
    {choice.record.code} {choice.record.nameChi}
  </span>
);

export function SalesOrderItemCreate(props) {
  const location = useLocation();
  const customerPlan = location.state.record.customer.wholesalePlan;
  const translate = useTranslate();
  const [selectedProduct, setSelectProduct] = useState();
  const [selectBtn, setSelectBtn] = useState(customerPlan);
  let wholeSalePriceList = !selectedProduct
    ? []
    : [
        selectedProduct.wholeSalePrice1,
        selectedProduct.wholeSalePrice2,
        selectedProduct.wholeSalePrice3,
        selectedProduct.wholeSalePrice4,
        selectedProduct.wholeSalePrice5,
      ];
  if (
    selectedProduct &&
    selectedProduct.discount &&
    wholeSalePriceList.length > 0
  ) {
    if (selectedProduct.discount.includes("%")) {
      const percent = 1 - parseFloat(selectedProduct.discount) / 100;
      console.log(percent);
      wholeSalePriceList = wholeSalePriceList.map((price) => price * percent);
      console.log("wholeSalePriceList:", wholeSalePriceList);
    } else if (selectedProduct.discount.includes("HKD")) {
      const discountAmount = parseFloat(
        selectedProduct.discount.replace("HKD", "")
      );
      wholeSalePriceList = wholeSalePriceList.map(
        (price) => price - discountAmount
      );
    }
  }
  let price;

  const dispatch = useDispatch();
  dispatch(
    addBreadcrumbs({
      url: "/SalesOrderItem/create",
      label: "Add New Sales Order Item",
    })
  );
  const searchProduct = (searchText) => ({
    code_contains: searchText,
  });

  const renderBtnGroup = (formData) => {
    return (
      <ButtonGroup>
        {wholeSalePriceList.map((price, index) => (
          <Button
            onClick={() => {
              setSelectBtn(index + 1);
              formData.price = price;
              console.log(price);
            }}
            color={selectBtn == index + 1 ? "secondary" : undefined}
            variant="contained"
          >
            {translate("product.wholeSalePrice")}
            {index + 1}
          </Button>
        ))}
      </ButtonGroup>
    );
  };

  const inputText = (record) => () => {
    setSelectProduct(record);
    console.log("product", selectedProduct);
    return record.code;
  };

  return (
    <Create {...props}>
      <SimpleForm toolbar={<SalesOrderItemCreateToolbar />} variant="standard">
        <ReferenceInput
          label="Sales Order"
          source="salesOrder.id"
          reference="SalesOrder"
        >
          <SelectInput disabled optionText="code" label="Sales Order No." />
        </ReferenceInput>
        <ReferenceInput
          filterToQuery={searchProduct}
          label="Product"
          source="product.id"
          reference="Product"
        >
          <AutocompleteInput
            optionText={<OptionRenderer />}
            label="Sales Order No."
            inputText={inputText}
            matchSuggestion={(filterValue, suggestion) => true}
          />
        </ReferenceInput>

        <NumberInput source="quantity" />
        {/* <NumberInput source="price" /> */}
        <FormDataConsumer>
          {({ formData }) => {
            formData.price = wholeSalePriceList[selectBtn - 1];
            console.log("formproduct: ", formData.product);
            if (selectedProduct) {
              formData.product.discount = selectedProduct.discount;
            }

            return (
              <Grid direction="column" container spacing={3}>
                <Grid item xs={6}>
                  {selectedProduct && (
                    <TextField
                      label="price"
                      type="number"
                      defaultValue={wholeSalePriceList[selectBtn - 1]}
                      onChange={(e) => {
                        const { value } = e.target;
                        formData.price = value;
                      }}
                      value={formData.price}
                    />
                  )}
                </Grid>
                <Grid item xs={6}>
                  {selectedProduct && renderBtnGroup(formData)}
                </Grid>
              </Grid>
            );
          }}
        </FormDataConsumer>
      </SimpleForm>
    </Create>
  );
}

// ########################## Edit Item ##########################################

const UPDATE_SALES_ORDER_ITEM = gql`
  mutation updateSalesOrderItem(
    $data: SalesOrderItemUpdateInput!
    $where: SalesOrderItemWhereUniqueInput!
  ) {
    updateSalesOrderItem(data: $data, where: $where) {
      id
    }
  }
`;

const calculateDiscount = (formData) => {
  // if (formData.discount) {
  //   if (formData.discount.includes("%")) {
  //     const percent = 1 - parseFloat(formData.discount) / 100;
  //     return parseFloat(formData.price) * percent;
  //   } else if (formData.discount.includes("HKD")) {
  //     const discountAmount = parseFloat(formData.discount.replace("HKD", ""));
  //     return parseFloat(formData.price) - discountAmount;
  //   }
  // } else {
  //   return parseFloat(formData.price);
  // }
  return parseFloat(formData.wholeSalePrice) - parseFloat(formData.price);
};

const SaveEditButton = (props) => {
  const history = useHistory();
  const [update] = useMutation(UPDATE_SALES_ORDER_ITEM);

  const redirect = () => {
    return history.go(-1);
  };

  const notify = useNotify();

  const formState = useFormState();
  const { wholeSalePrice, salesOrder, price, quantity, id } = formState.values;

  const handleClick = () => {
    console.log("formState: ", formState.values);
    update({
      variables: {
        data: {
          price,
          quantity,
          discount: `HKD${wholeSalePrice - price}`,
          subPrice: wholeSalePrice,
        },
        where: { id },
      },
    }).then((value) => {
      notify("Edit Success");
      redirect();
    });
  };

  return (
    <SaveButton
      {...props}
      handleSubmitWithRedirect={handleClick}
      disabled={!wholeSalePrice}
    />
  );
};

const SalesOrderItemEditToolBar = (props) => (
  <Toolbar {...props}>
    <SaveEditButton label="common.save" submitOnEnter={false} variant="text" />
  </Toolbar>
);

export const SalesOrderItemEdit = (props) => {
  const dispatch = useDispatch();
  return (
    <Edit {...props}>
      <SimpleForm variant="standard" toolbar={<SalesOrderItemEditToolBar />}>
        <ReferenceInput
          label="Sales Order"
          source="salesOrder.id"
          reference="SalesOrder"
        >
          <SelectInput disabled optionText="code" label="Sales Order No." />
        </ReferenceInput>
        <ReferenceInput label="Product" source="product.id" reference="Product">
          <SelectInput disabled optionText="code" label="Sales Order No." />
        </ReferenceInput>
        <NumberInput source="quantity" />
        <NumberInput source="wholeSalePrice" validate={required()} />
        <NumberInput source="price" inputText={NumberInput} />
        <FormDataConsumer>
          {({ formData }) => {
            dispatch(
              addBreadcrumbs({
                url: `/SalesOrderItem/${formData.id}`,
                label: `Edit`,
              })
            );
            return (
              <h2>
                Discount Amount(HKD): {formData.wholeSalePrice - formData.price}
              </h2>
            );
          }}
        </FormDataConsumer>
      </SimpleForm>
    </Edit>
  );
};
