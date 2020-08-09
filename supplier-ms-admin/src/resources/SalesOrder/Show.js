import { useHistory } from "react-router-dom";
import {
  DateField,
  NumberField,
  EditButton,
  Datagrid,
  ReferenceField,
  ReferenceArrayField,
  Show,
  SimpleShowLayout,
  TextField,
  useTranslate,
  ShowController,
  ShowView,
} from "react-admin";
import Button from "@material-ui/core/Button";
import { Add, Edit, Print } from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import React from "react";
import Grid from "@material-ui/core/Grid";
import BilingualField from "../../components/BilingualField";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import SCGenerator from "../../utils/generateSC";
import { useDispatch } from "react-redux";
import { setBreadcrumbs } from "../../redux/breadcrumbs";

const GET_SC = gql`
  query salesOrder($where: SalesOrderWhereUniqueInput!) {
    salesOrder(where: $where) {
      id
      code
      subtotal
      grandTotal
      discountAmount
      state
      shippingDate
      shop {
        phone
        nameEn
        deliverAddress
        customer {
          code
          billingAddress
          mobile
          nameEn
          paymentMethod
          wholesalePlan
        }
      }
      products {
        id
        totalPrice
        product {
          nameEn
          id
          code
        }
        price
        quantity
      }
    }
  }
`;

export const SalesOrderShow = ({ permissions, ...props }) => {
  const dispatch = useDispatch();
  const translate = useTranslate();
  const history = useHistory();
  console.log("SalesOrder Show", props);
  const toEdit = () => {
    const { id } = props;
    history.push(`/SalesOrder/${id}/edit`);
  };
  const { loading, data } = useQuery(GET_SC, {
    variables: { where: { id: props.id } },
  });
  const onEditItem = (po) => (e) => {
    console.log(po);
    console.log(e);
  };

  const toCreateItem = () => {
    const { id } = props;
    history.push("/SalesOrderItem/create", {
      record: { salesOrder: { id }, customer: data.salesOrder.shop.customer },
    });
  };

  // const isPaid =
  //   (data && data.salesOrder.state !== "PAID") || permissions === "admin";
  let isPaid = true;
  isPaid = data && data.salesOrder.state === "PAID";
  return (
    <Grid container spacing={2}>
      <Grid item xs={9}>
        <Typography variant="h6">
          {translate("common.information")}&nbsp;
          {!isPaid ? (
            <Button color="primary" size="small" onClick={toEdit}>
              <Edit />
              &nbsp;{translate("common.edit")}
            </Button>
          ) : null}
          {!isPaid ? (
            <Button
              color="primary"
              size="small"
              onClick={SCGenerator(data)}
              disabled={loading}
            >
              <Print />
              &nbsp;{translate("common.print")}
            </Button>
          ) : null}
        </Typography>
        <ShowController title="Sales Order Details" {...props}>
          {(controllerProps) => {
            const label = controllerProps.record
              ? controllerProps.record.code
              : "";
            const id = controllerProps.record ? controllerProps.record.id : "";
            dispatch(
              setBreadcrumbs([
                { url: "/SalesOrder", label: "Sales Order" },
                { url: `/SalesOrder/${id}/show`, label: `Details: ${label}` },
              ])
            );
            return (
              <ShowView {...controllerProps}>
                <SimpleShowLayout>
                  <ReferenceField
                    label="Customer"
                    source="shop.id"
                    reference="CustomerShop"
                  >
                    <ReferenceField
                      label="Customer"
                      source="customer.id"
                      reference="Customer"
                      link={(shop, referece) =>
                        `/Customer/${shop.customer.id}/show`
                      }
                    >
                      <BilingualField source="name" />
                    </ReferenceField>
                  </ReferenceField>
                  <ReferenceField
                    label="Wholesale plan"
                    source="shop.id"
                    reference="CustomerShop"
                    link={false}
                  >
                    <ReferenceField
                      label="Customer"
                      source="customer.id"
                      reference="Customer"
                      link={false}
                    >
                      <TextField source="wholesalePlan" />
                    </ReferenceField>
                  </ReferenceField>
                  <ReferenceField
                    label="Shop"
                    source="shop.id"
                    reference="CustomerShop"
                    link="show"
                  >
                    <TextField source="code" />
                  </ReferenceField>
                  <TextField source="code" label="Sales Order No." />
                  <TextField
                    source="shippingDate"
                    label="Sales Order Shipping Date"
                  />
                  <DateField source="createdAt" />
                  <DateField source="updatedAt" />
                </SimpleShowLayout>
              </ShowView>
            );
          }}
        </ShowController>
      </Grid>
      <Grid item container xs={3} direction="column" spacing={2}>
        <Grid item>
          <Typography variant="h6">Status</Typography>
          <Show actions={<React.Fragment />} {...props}>
            <SimpleShowLayout>
              <TextField
                source="state"
                addLabel={false}
                label={translate("common.status")}
              />
            </SimpleShowLayout>
          </Show>
        </Grid>
        <Grid item>
          <Typography variant="h6">Subtotal Price</Typography>
          <Show actions={<React.Fragment />} {...props}>
            <SimpleShowLayout>
              <NumberField
                source="subtotal"
                addLabel={false}
                options={{ style: "currency", currency: "HKD" }}
              />
            </SimpleShowLayout>
          </Show>
        </Grid>
        <Grid item>
          <Typography variant="h6">Discount Amount</Typography>
          <Show actions={<React.Fragment />} {...props}>
            <SimpleShowLayout>
              <NumberField
                source="discountAmount"
                addLabel={false}
                options={{ style: "currency", currency: "HKD" }}
              />
            </SimpleShowLayout>
          </Show>
        </Grid>
        <Grid item>
          <Typography variant="h6">Grand Total Price</Typography>
          <Show actions={<React.Fragment />} {...props}>
            <SimpleShowLayout>
              <NumberField
                source="grandTotal"
                addLabel={false}
                options={{ style: "currency", currency: "HKD" }}
              />
            </SimpleShowLayout>
          </Show>
        </Grid>
        <Grid item>
          <Typography variant="h6">Invoice</Typography>
          <Show actions={<React.Fragment />} {...props}>
            <SimpleShowLayout>
              <ReferenceField
                label="Invoice No."
                reference="Invoice"
                source="invoice.id"
                link="show"
              >
                <TextField source="code" label="Invoice No." />
              </ReferenceField>
            </SimpleShowLayout>
          </Show>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">
          {translate("salesOrder.products")}&nbsp;
          {/* {!isPaid ? (
            <Button color="primary" size="small" onClick={toCreateItem}>
              <Add />
              &nbsp;{translate("common.create")}
            </Button>
          ) : null} */}
        </Typography>
        <Show actions={<React.Fragment />} {...props}>
          <ReferenceArrayField
            reference="SalesOrderItem"
            source="productsIds"
            addLabel={false}
          >
            <Datagrid {...props}>
              <ReferenceField
                label="#"
                source="product.id"
                reference="Product"
                link="show"
              >
                <TextField source="code" label="Product No." />
              </ReferenceField>
              <ReferenceField
                label="Product Name"
                source="product.id"
                reference="Product"
                link="show"
              >
                <BilingualField source="name" />
              </ReferenceField>
              <NumberField
                source="price"
                options={{ style: "currency", currency: "HKD" }}
              />
              <TextField source="quantity" />
              <NumberField
                source="totalPrice"
                options={{ style: "currency", currency: "HKD" }}
              />
              {/* {!isPaid ? (
                <EditButton />
              ) : null} */}
            </Datagrid>
          </ReferenceArrayField>
        </Show>
      </Grid>
    </Grid>
  );
};
