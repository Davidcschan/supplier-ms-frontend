/**
 *
 * MonthlyReportPage
 *
 */

import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Chart from "./Chart";
import Orders from "./Orders";
import Card from "./Card";
import Title from "../Layout/Title";
import FilterCard from "./Filter";
import SalesOrderCountingCard from "./SalesOrderCountingCard";
import SalesOrdersDetail from "./salesOrderDetail";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(16),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    height: 340,
  },
}));

export function MonthlyReportPage() {
  const classes = useStyles();
  const [salesOrders, setSalesOrders] = useState();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {/* <Title>MonthlyReport</Title> */}
        <Title>Sales Orders Report</Title>
      </Grid>
      {/* Chart */}
      {/* <Grid item xs={12} md={8} lg={9}>
        <Paper className={classes.paper}>
          <Chart />
        </Paper>
      </Grid> */}

      {/* Filter Date Card */}
      <Grid item xs={12} md={4} lg={3}>
        <Paper className={classes.paper}>
          <FilterCard setSalesOrders={setSalesOrders} />
        </Paper>
      </Grid>

      <Grid item xs={12} md={4} lg={3}>
        <Paper className={classes.paper}>
          <SalesOrderCountingCard salesOrders={salesOrders} />
        </Paper>
      </Grid>

      {/* Sales Order Detail */}
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <SalesOrdersDetail salesOrders={salesOrders} />
        </Paper>
      </Grid>

      {/* Recent Deposits */}
      {/* <Grid item xs={12} md={4} lg={3}>
        <Paper className={classes.paper}>
          <Card />
        </Paper>
      </Grid> */}

      {/* Recent Orders */}
      {/* <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Orders />
        </Paper>
      </Grid> */}
    </Grid>
  );
}

MonthlyReportPage.propTypes = {};

export default MonthlyReportPage;
