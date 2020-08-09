/* eslint-disable no-script-url */

import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import NumberFormat from "react-number-format";

import Title from "./Title";

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function SalesOrdersDetail({ salesOrders = [] }) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Sales Order Number</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Customer Shop</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Grand total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {salesOrders.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.code}</TableCell>
              <TableCell>{row.shop.customer.nameEn}</TableCell>
              <TableCell>{row.shop.nameEn}</TableCell>
              <TableCell>{row.state}</TableCell>
              <TableCell align="right">
                <NumberFormat
                  value={row.grandTotal}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
