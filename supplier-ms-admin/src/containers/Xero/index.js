import React, { useState } from "react";
import Fab from "@material-ui/core/Fab";
import Dns from "@material-ui/icons/Dns";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const CREATE_REDIRECT = gql`
  mutation CreateRedirect {
    createRedirect(data: {}) {
      id
      redirectUrl
    }
  }
`;

const CHECKING = gql`
  query Check {
    checking
  }
`;

const DISCONNECT = gql`
  mutation Disconnect {
    disconnect
  }
`;
function Xero() {
  return (
    <div>
      <h1>ERP-system</h1>
    </div>
  );
}

export default Xero;
